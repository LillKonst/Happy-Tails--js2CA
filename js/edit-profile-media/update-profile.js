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

      // Display success message or perform any other necessary actions
      console.log("Profile image updated successfully");
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

/* // Function to create bio textarea
function createBioTextArea() {
  const bioTextAreaContainer = document.getElementById("bioTextAreaContainer");

  const bioLabel = document.createElement("label");
  bioLabel.setAttribute("for", "bioText");
  bioLabel.textContent = "Your Bio";

  const bioTextarea = document.createElement("textarea");
  bioTextarea.classList.add("form-control");
  bioTextarea.setAttribute("id", "bioText");
  bioTextarea.setAttribute("rows", "5");
  bioTextarea.setAttribute("placeholder", "Write something about you!");
  bioTextarea.setAttribute(
    "title",
    "Your bio must be less than 160 characters"
  );

  bioTextAreaContainer.appendChild(bioLabel);
  bioTextAreaContainer.appendChild(bioTextarea);
}

// Call function to create bio textarea
createBioTextArea();
 */
/* // Event listener for Apply Changes button
document
  .getElementById("applyBtn")
  .addEventListener("click", async function () {
    const userName = "";
    const bioText = document.getElementById("userBio").textContent;
    const profileImgUrl = document.getElementById("profileImageInput").value;

    let bioUpdated = false;
    let profileImageUpdated = false;

    if (bioText.trim() !== "") {
      await updateBio(userName, bioText);
      bioUpdated = true;
    }

    if (profileImgUrl.trim() !== "") {
      await updateProfileImage(userName, profileImgUrl);
      profileImageUpdated = true;
    }

    // Check if both bio and profile image are updated successfully before redirecting
    if (bioUpdated || profileImageUpdated) {
      window.location.href = "/html/my-profile/index.html";
    }
  });

// Event listener for Cancel button (optional)
document.getElementById("cancelBtn").addEventListener("click", function () {
  // Logic to cancel changes and reset form fields if needed
  document.getElementById("bioText").value = "";
  document.getElementById("profileImageInput").value = "";
});
 */
