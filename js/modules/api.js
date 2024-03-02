// Import necessary modules and variables
import { getToken, apiKey } from "../modules/auth.js";

// Define constants
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Exported functions
export { getAllPosts };
export { fetchUserProfile };
export { fetchPostsByUserName };
export { getPostSpecific };
export { updateBio };
export { updateProfileImage };
export { getPostsFromFollowing };
export { getPostsFromSearch };

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

// Get posts only from following people
async function getPostsFromFollowing(newestFirst = true) {
  const sortOrder = newestFirst ? "desc" : "asc";
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/following/?_author=true&_comments=true&_reactions=true&sortOrder=${sortOrder}&sort=created`,
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

// Get posts only from following people
async function getPostsFromSearch(query) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/search?q=${query}`,
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

// Get posts only from following people
async function getPostsFromFollowing(newestFirst = true) {
  const sortOrder = newestFirst ? "desc" : "asc";
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
    throw new Error("Could not load posts");
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

// Function to update user's bio
async function updateBio(userName, bioText) {
  try {
    const response = await fetch(
      `${NOROFF_API_URL}/social/profiles/${userName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          bio: bioText,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update bio");
    }

    // Bio updated successfully
    console.log("Bio updated successfully");
  } catch (error) {
    console.error("Error updating bio:", error.message);
    // Handle error (e.g., display an error message to the user)
  }
}

// Function to update user's profile image
async function updateProfileImage(userName, profileImgUrl) {
  try {
    const response = await fetch(
      `${NOROFF_API_URL}/social/profiles/${userName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          avatar: {
            url: profileImgUrl,
            alt: "Profile Image",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update profile image");
    }

    // Profile image updated successfully
    console.log("Profile image updated successfully");
  } catch (error) {
    console.error("Error updating profile image:", error.message);
    // Handle error (e.g., display an error message to the user)
  }
}
