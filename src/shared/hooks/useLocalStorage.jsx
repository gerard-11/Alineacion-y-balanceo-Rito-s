import { useCallback } from 'react'

/**
 * Custom hook for standardized localStorage operations
 * Provides get, set, and remove methods for localStorage management
 *
 * @param {string} key - The localStorage key
 * @returns {Object} Object containing get, set, and remove methods
 */
export const useLocalStorage = (key) => {
  /**
   * Retrieves a value from localStorage by key
   * Safely parses JSON data and handles errors
   *
   * @returns {*} Parsed value or null if not found or parsing fails
   */
  const get = useCallback(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting item from localStorage with key "${key}":`, error)
      return null
    }
  }, [key])

  /**
   * Sets a value in localStorage
   * Automatically stringifies objects to JSON
   *
   * @param {*} value - The value to store (can be object, string, number, etc.)
   */
  const set = useCallback((value) => {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error(`Error setting item in localStorage with key "${key}":`, error)
    }
  }, [key])

  /**
   * Removes a value from localStorage by key
   */
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item from localStorage with key "${key}":`, error)
    }
  }, [key])

  return {
    get,
    set,
    remove
  }
}
