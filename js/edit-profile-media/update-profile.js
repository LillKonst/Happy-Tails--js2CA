// update-profile.js
import { updateBio, updateProfileImage } from "../modules/api.js";

// Function to create bio textarea
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

// Event listener for Apply Changes button
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
