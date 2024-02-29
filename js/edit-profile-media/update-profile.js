import { NOROFF_API_URL } from "../modules/api.js";
import { getToken, apiKey } from "../modules/auth.js";

// Fixing error handling in fetch
function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
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
  window.location.href = "/html/my-profile/index.html";
});

document.getElementById("applyBtn").addEventListener("click", function () {
  // Pass the profile ID and profile data to the updateProfile function
  var profileId = "name"; // Replace with the actual profile ID
  var profileData = {}; // Replace with the actual profile data
  updateProfile(profileId, profileData);
});
