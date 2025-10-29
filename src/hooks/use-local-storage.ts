interface Result {
  getItem: <T>(key: string) => T | null
  setItem: <T>(key: string, value: T) => void
}

const useLocalStorage = (): Result => {
  const getItem = <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error)
      return null
    }
  }

  const setItem = <T>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error)
    }
  }

  return {
    getItem,
    setItem,
  }
}

export default useLocalStorage
