// Import necessary modules and variables
import { getToken, apiKey } from "../modules/auth.js";

// Define constants
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

export {
  getAllPosts,
  fetchUserProfile,
  fetchPostsByUserName,
  getPostSpecific,
  //  updateBio,
  updateProfileImage,
  getPostsFromFollowing,
  getPostsFromSearch,
  getAllProfiles,
  getProfilesFromSearch,
  searchProfilesByUsername,
  followUser,
  unfollowUser,
};

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

// Get all posts
async function getAllPosts(newestFirst = true) {
  const sortOrder = newestFirst ? "desc" : "asc";
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/?_author=true&_comments=true&_reactions=true&sortOrder=${sortOrder}&sort=created`,
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

// Get all profiles
async function getAllProfiles() {
  const response = await fetch(`${NOROFF_API_URL}/social/profiles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Could not load posts");
  }
  const result = await response.json();
  return result.data;
}
// Follow API
async function followUser(userName) {
  try {
    const response = await fetch(
      `${NOROFF_API_URL}/social/profiles/${userName}/follow`,
      {
        method: "PUT", // Use PUT method for following
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Could not follow user: ${errorMessage}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error following user:", error);
  }
}

// Unfollow API
async function unfollowUser(userName) {
  try {
    const response = await fetch(
      `${NOROFF_API_URL}/social/profiles/${userName}/unfollow`,
      {
        method: "PUT", // Use PUT method for unfollowing
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Could not unfollow user: ${errorMessage}`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error; // re-throw the error to propagate it to the caller
  }
}

// Function to fetch profiles by username search query
async function searchProfilesByUsername(query) {
  try {
    const response = await fetch(
      `${NOROFF_API_URL}/social/profiles/search?q=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Search profiles
async function getProfilesFromSearch(query) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/profiles/search?q=${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Could not load profiles");
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

/* // Function to update user's bio
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
  }
} */

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
  }
}
