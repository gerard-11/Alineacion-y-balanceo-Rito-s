# useLocalStorage Hook - Usage Examples

## Overview
The `useLocalStorage` hook provides a standardized way to interact with localStorage across the entire application. It handles JSON parsing/stringifying automatically and includes error handling.

## Basic Usage

### Simple Get/Set/Remove
```jsx
import { useLocalStorage } from '../shared/hooks'

function MyComponent() {
  const userPreferences = useLocalStorage('userPreferences')

  const handleSavePreferences = () => {
    userPreferences.set({ theme: 'dark', language: 'es' })
  }

  const handleLoadPreferences = () => {
    const prefs = userPreferences.get()
    console.log(prefs) // { theme: 'dark', language: 'es' }
  }

  const handleClear = () => {
    userPreferences.remove()
  }

  return (
    <div>
      <button onClick={handleSavePreferences}>Save</button>
      <button onClick={handleLoadPreferences}>Load</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}
```

## Using in Context with useMemo (IMPORTANT)

Always wrap the context value with `useMemo` to prevent unnecessary re-renders:

```jsx
import { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../shared/hooks'

const MyContext = createContext()

export const MyProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const storage = useLocalStorage('myData')

  const handleSave = (newData) => {
    setData(newData)
    storage.set(newData)
  }

  const handleLoad = () => {
    const loaded = storage.get()
    setData(loaded)
  }

  // ✓ CORRECT: Use useMemo to memoize the value
  const value = useMemo(
    () => ({ data, handleSave, handleLoad }),
    [data]
  )

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

// ✗ INCORRECT: Without useMemo, creates new object on every render
// This causes all consumers to re-render unnecessarily and can cause infinite loops
export const BadProvider = ({ children }) => {
  const [data, setData] = useState(null)

  // This creates a new object every render!
  return (
    <MyContext.Provider value={{ data }}>
      {children}
    </MyContext.Provider>
  )
}
```

## Storing Objects/Arrays
```jsx
function UserProfile() {
  const userStorage = useLocalStorage('userProfile')

  const saveUserData = () => {
    const userData = {
      id: 123,
      name: 'John Doe',
      roles: ['admin', 'user'],
      settings: {
        notifications: true,
        theme: 'dark'
      }
    }
    userStorage.set(userData)
  }

  const loadUserData = () => {
    const user = userStorage.get()
    if (user) {
      console.log(user.name) // 'John Doe'
      console.log(user.roles) // ['admin', 'user']
    }
  }

  return (
    <div>
      <button onClick={saveUserData}>Save Profile</button>
      <button onClick={loadUserData}>Load Profile</button>
    </div>
  )
}
```

## Storage Key Naming Convention
Use descriptive keys in camelCase with domain prefix:
- `authUser` - User authentication data
- `userPreferences` - User preferences
- `themeMode` - Theme selection
- `cartItems` - Shopping cart
- `sessionToken` - Session/token data

## Notes
- The hook automatically handles JSON serialization/deserialization
- Error handling is built-in; errors are logged to console
- Safe to use with null/undefined values
- Always use `useMemo` when creating context providers to avoid performance issues
