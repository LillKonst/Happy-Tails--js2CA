export const NOROFF_API_URL = "https://v2.api.noroff.dev";
/*
export async function login(email, password) {
    if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
      return false;
    }
    if (!isRegistered(email)) {
      return false;
    }
    if (isLoggedIn(email)) {
      return true;
    }
    const loginResponse = await fetch(`${NOROFF_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!loginResponse.ok) {
      return false;
    }
    const loginResponseJson = await loginResponse.json();
    const { accessToken, ...profile } = loginResponseJson.data;
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("access-token", accessToken);
  
    const apiKeyResponse = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: "User api key",
      }),
    });
    const apiKeyResponseJson = await apiKeyResponse.json();
    const apiKey = apiKeyResponseJson.data.key;
    localStorage.setItem("api-key", apiKey);
    localStorage.setItem("logged-in-email", email);
    return true;
  }

*/


//import {apiKey} from "../js/auth";

//import { accessToken } from "../js/auth";

//import { storeToken } from "../js/auth";

import { getToken } from "../js/auth.js";

//import { clearToken } from "../js/auth";

import { apiKey } from "../js/auth.js";
//export {headers};

export {getAllPosts};

// export {accessToken};
/*
function headers (includeContentType = true) {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": apiKey,
    };
  
    if (includeContentType) {
      headers["Content-Type"] = "application/json";
    }
  
    return headers;
  }*/

//const apiKey = localStorage.setItem("apiKey");
//console.log(apiKey);


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