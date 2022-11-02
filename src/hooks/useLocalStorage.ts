interface Result {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: any) => void;
}

const useLocalStorage = (): Result => {
  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    getItem,
    setItem,
  };
};

export default useLocalStorage;
