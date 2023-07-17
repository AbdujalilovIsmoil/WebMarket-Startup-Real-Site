export const storage = {
  set: (key, value) => {
    if (!value || value.length <= 0) return;

    if (key && value) {
      if (typeof value === "string") {
        return window.localStorage.setItem(key, value);
      } else {
        return window.localStorage.setItem(key, JSON.stringify(value));
      }
    }
  },
  get: (key) => {
    if (key) {
      return window.localStorage.getItem(key);
    }
  },
  remove: (key) => {
    if (key) {
      return window.localStorage.removeItem(key);
    }
  },
  key: (index) => {
    if (typeof index !== "number") {
      return window.localStorage.key(Number(index));
    }

    if (typeof index === "number") {
      return window.localStorage.key(index);
    }
  },
  length: () => {
    return window.localStorage.length;
  },
  clear: () => {
    return window.localStorage.clear();
  },
};
