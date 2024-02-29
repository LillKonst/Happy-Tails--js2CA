import { NOROFF_API_URL } from "./login-function.js";

const accessToken = localStorage.getItem("access-token");
let apiKey = localStorage.getItem("api-key");

// Check if access token is valid
if (!accessToken) {
  console.error("Access token is missing.");
  // Handle the error appropriately, e.g., redirect to login page
}

// Function to retrieve or create API key
async function retrieveOrCreateApiKey() {
  if (!apiKey) {
    // If API key is not present, create one
    apiKey = await createApiKey();
    // Store the API key in local storage for future use
    localStorage.setItem("api-key", apiKey);
  }
}

// Function to create API key
async function createApiKey() {
  try {
    const response = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to create API key");
    }

    const data = await response.json();
    console.log("API Key created successfully:", data.data.key);
    return data.data.key;
  } catch (error) {
    console.error("Error creating API key:", error.message);
    throw error; // Propagate the error further
  }
}

// Call the function to retrieve or create API key
retrieveOrCreateApiKey()
  .then(() => {
    // Once the API key is retrieved or created, proceed with follow and unfollow actions
    const profileName = "kristakz"; // Replace with the desired profile name

    // Function to follow a user profile
    async function followUser(name) {
      const url = `${NOROFF_API_URL}/social/profiles/${name}/follow`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      return response.json();
    }

    // Function to unfollow a user profile
    async function unfollowUser(name) {
      const url = `${NOROFF_API_URL}/social/profiles/${name}/unfollow`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      return response.json();
    }

    // Access the follow button
    const followBtn = document.getElementById("followBtn");

    // Add event listener to follow button
    followBtn.addEventListener("click", async function () {
      try {
        // Check if the user is currently followed or not
        const isFollowing = followBtn.textContent.trim() === "Follow";

        // Determine whether to follow or unfollow based on the current state
        if (isFollowing) {
          await followUser(profileName);
          followBtn.textContent = "Unfollow";
        } else {
          await unfollowUser(profileName);
          followBtn.textContent = "Follow";
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error message presentation to the user, e.g., show an alert
      }
    });
  })
  .catch((error) => {
    console.error("Error retrieving or creating API key:", error);
    // Handle the error appropriately, e.g., display error message to the user
  });
