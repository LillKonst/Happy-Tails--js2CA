import { updateProfileImage } from "../modules/api.js";
import { displayUserProfile } from "../my-profile.js";

document.addEventListener("DOMContentLoaded", () => {
  // Display user profile
  displayUserProfile();

  // Get references to the elements
  const applyBtn = document.getElementById("applyBtn");
  const profileImageInput = document.getElementById("profileImageInput");

  // Add event listener to the apply button
  applyBtn.addEventListener("click", async () => {
    try {
      // Get the new profile image URL from the input field
      const newProfileImgUrl = profileImageInput.value;

      // Retrieve the username from local storage or URL parameters
      const loggedInUser = JSON.parse(localStorage.getItem("profile"));
      const userName = loggedInUser.name;

      // Update the profile image
      await updateProfileImage(userName, newProfileImgUrl);

      // Update the profile image displayed on the page
      const profileImage = document.getElementById("profileImage");
      profileImage.src = newProfileImgUrl;
      profileImage.alt = "New Profile Image";

      // Clear the input field
      profileImageInput.value = "";

    } catch (error) {
      console.error("Error updating profile image:", error);
      // Display error message or perform any other necessary actions
    }
  });

  // Add event listener to the cancel button
  cancelBtn.addEventListener("click", () => {
    // Redirect the user to their own profile page
    window.location.href = "/html/my-profile/index.html";
  });
});