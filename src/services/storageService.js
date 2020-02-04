export default {
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key, defaultValue) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
}