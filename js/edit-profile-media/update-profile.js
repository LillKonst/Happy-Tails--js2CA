import { NOROFF_API_URL } from "../modules/api.js";
import { getToken, apiKey } from "../modules/auth.js";

function getApiKey() {
  return apiKey;
}

// Function to retrieve profile information
function getProfile(name) {
  const token = getToken();
  const apiKey = getApiKey();

  fetch(`${NOROFF_API_URL}/social/profiles/${name}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Profile Data:", data);
      // Update the profile information on the page
      displayProfile(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}

// Fixing error handling in fetch
function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Function to update profile information
function updateProfile(name, profileData) {
  const token = getToken();
  const apiKey = getApiKey();

  fetch(`${NOROFF_API_URL}/social/profiles/${name}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  })
    .then(handleResponse) // Handle response status
    .then((data) => {
      console.log("Profile Updated:", data);
      // Optionally, you can display a success message or update the profile data on the page
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}

// Example function to display profile information on the page
function displayProfile(profileData) {
  // Update the HTML elements with the profile data
  document.getElementById("name").innerText = profileData.name;
  document.getElementById("userEmail").innerText = profileData.email;
  document.getElementById("userBio").innerText = profileData.bio;
}

// Event listener for cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "/html/profile/index.html";
});

document.getElementById("applyBtn").addEventListener("click", function () {
  // Pass the profile ID and profile data to the updateProfile function
  var profileId = "name"; // Replace with the actual profile ID
  var profileData = {}; // Replace with the actual profile data
  updateProfile(profileId, profileData);
});
