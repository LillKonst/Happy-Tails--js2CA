// Import necessary modules and variables
import { getToken, apiKey } from "../modules/auth.js";

// Define constants
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Exported functions
export { getAllPosts };
export { fetchUserProfile };
export { fetchPostsByUserName };
export { getPostSpecific };

// Get all posts
async function getAllPosts() {
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not load posts");
  }
  const result = await response.json();
  return result.data;
}

// Get post specific
async function getPostSpecific(postId) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/${postId}?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not load post");
  }
  const result = await response.json();
  return result.data;
}

// Fetch user profile
async function fetchUserProfile(userName) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/profiles/${userName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not fetch profile information");
  }
  const result = await response.json();
  return result.data;
}

// Fetch posts by user name
async function fetchPostsByUserName(userName) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/profiles/${userName}/posts`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const result = await response.json();
  return result.data;
}
