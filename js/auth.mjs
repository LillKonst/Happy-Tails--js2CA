import {load} from "../index.mjs";

export function headers() {
    const token = load("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export async function authFetch(url, options) {
    return fetch(url, {
        ...options,
        header: headers()

    })
}

