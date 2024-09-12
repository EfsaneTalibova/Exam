// utils/storage.ts
export const saveToLocalStorage = (key: string, value: any) => {
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    existingData.push(value);
    localStorage.setItem(key, JSON.stringify(existingData));
  };
  
  export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };
  