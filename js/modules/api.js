// Import necessary modules and variables
import { getToken, apiKey } from "../modules/auth.js";
import { getPostIdFromQuery } from "../posts/display.js";

// Define constants
export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Exported functions
export { getAllPosts };
export { fetchUserProfile };
export { fetchPostsByUserName };
export { getPostSpecific };
// export { updateBio };
export { updateProfileImage };
export { getPostsFromFollowing };
export { getPostsFromSearch };
export { likePost };
export { commentPost };
export { updatePost };
export { deletePost };

export {
  getAllProfiles,
  getProfilesFromSearch,
  searchProfilesByUsername,
  followUser,
  unfollowUser,
};

const postId = getPostIdFromQuery();

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
  const response = await fetch(
    `${NOROFF_API_URL}/social/profiles/${userName}/follow`,
    {
      method: "PUT", // Specify the request method as PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Could not follow user`);
  }
  const result = await response.json();
  return result.data;
}

// Unfollow API
async function unfollowUser(userName) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/profiles/${userName}/unfollow`,
    {
      method: "PUT", // Specify the request method as PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Could not unfollow user`);
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
async function getPostSpecific() {
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

// Function to react to post
/**
 * Reacto to a post
 * @param {number|string} postId
 * @param {string} symbol
 */

async function likePost(postId, symbol) {
  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/${postId}/react/${encodeURIComponent(
      symbol
    )}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Could not like post: ${errorData.message}`);
  }
  return await response.json();
}

////////////////////// Add Comment

/**
 * @param {number|string} postId
 * @param {string} body
 * @param {number|string|null} replyToId
 * @returns {Promise<Object>}
 */

async function commentPost(postId, body, replyToId = null) {
  const payload = { body };
  if (replyToId) payload.replyToId = replyToId;

  const response = await fetch(
    `${NOROFF_API_URL}/social/posts/${postId}/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Could not post comment: ${errorData.message}`);
  }

  return await response.json();
}

// edit post
async function updatePost(postId, newData) {
  console.log (postId);
  const response = await fetch(`${NOROFF_API_URL}/social/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Failed to edit post: ${errorData.message}");
  }
  const result = await response.json();
  return result.data;
}

// delete post
async function deletePost(postId) {
  const response = await fetch(`${NOROFF_API_URL}/social/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "X-Noroff-API-Key": apiKey,
      }
    });


  if (!response.ok) {
    throw new Error("Failed to delete the post");
  }
}
