export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    return localStorage.getItem(key);
}

export function remove(key) {
    localStorage.removeItem(key);
}