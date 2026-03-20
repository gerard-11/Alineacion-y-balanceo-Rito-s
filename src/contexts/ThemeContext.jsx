import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

const THEMES = {
  dark: {
    bg: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      tertiary: 'bg-slate-800',
    },
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500',
    },
    border: 'border-slate-800',
    accent: 'bg-indigo-600',
    accentHover: 'hover:bg-indigo-700',
  },
  light: {
    bg: {
      primary: 'bg-white',
      secondary: 'bg-slate-50',
      tertiary: 'bg-slate-100',
    },
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-700',
      tertiary: 'text-slate-600',
      muted: 'text-slate-500',
    },
    border: 'border-slate-200',
    accent: 'bg-indigo-600',
    accentHover: 'hover:bg-indigo-700',
  },
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const [isLoading, setIsLoading] = useState(true)

  // Cargar tema del localStorage al montar
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(storedTheme)
    applyTheme(storedTheme)
    setIsLoading(false)
  }, [])

  const applyTheme = (themeName) => {
    const root = document.documentElement
    if (themeName === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
      document.body.style.backgroundColor = '#020617'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
      document.body.style.backgroundColor = '#ffffff'
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const currentTheme = THEMES[theme]

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ...currentTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider')
  }
  return context
}
