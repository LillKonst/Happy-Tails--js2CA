export const NOROFF_API_URL = "https://v2.api.noroff.dev";

//import {apiKey} from "../js/auth";

//import { accessToken } from "../js/auth";

//import { storeToken } from "../js/auth";

import { getToken } from "../modules/auth.js";

//import { clearToken } from "../js/auth";

import { apiKey } from "../modules/auth.js";
//export {headers};

export {getAllPosts};

//Get all posts
async function getAllPosts() {
    const response = await fetch(
        `${NOROFF_API_URL}/social/posts/?_author=true_comments=true&_reactions=true`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            "X-Noroff-API-Key": apiKey,
        },
        
    }
);
    if (!response.ok) {
        throw new Error("Could not load posts from following");
    }
    const result = await response.json();
    return result.data;
}

//Get posts from following 
async function getPostsFromFollowing() {
    const response = await fetch(
        `${NOROFF_API_URL}/social/posts/following?_author=true&_reactions=true&_comments=true`,
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey
        },
    }
);
    if (!response.ok) {
        throw new Error("Could not load posts from following");
    }
    const result = await response.json();
    return result.data;
}

// Get post specific 
async function getPostSpecific(postid) {
    const response = await fetch(
        `${NOROFF_API_URL}/social/posts/${postId}?_author=true&_reactions=true&_comments=true`,
        {
            headers: headers(),
        }
    );
    if (!response.ok) {
        throw new Error("Could not load post");
    }
    const result = await response.json();
    return result.data;
}