export function useLocalStorage(key, value) {
  try {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }
  } catch (error) {
    console.error(error);
  }
}
