export function getLocalStorageValue(key, defaultValue) {
    return localStorage.getItem(key) == null
        ? defaultValue
        : localStorage.getItem(key)
}

export function setLocalStorageValue(key, value, autoremove = true) {
    if (autoremove && (!value || value === ""))
        localStorage.removeItem(key);
    else
        localStorage.setItem(key, value);
    return value;
}