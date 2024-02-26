import {load} from "../js/storage/index.mjs";

export function headers() {
    const token = load("access-token");
    console.log("Using token:", token);
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export async function authFetch(url, options) {
    return fetch(url, {
        ...options,
        headers: headers()

    })
}

