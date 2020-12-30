export function getLocalStorageValue(key, defaultValue) {
    return localStorage.getItem(key) == null
        ? defaultValue
        : localStorage.getItem(key)
}

export function setLocalStorageValue(key, value) {
    localStorage.setItem(key, value);
    return value;
}