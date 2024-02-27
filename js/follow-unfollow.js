import { authFetch } from "./auth";
document.addEventListener("DOMContentLoaded", function () {
  const followBtn = document.getElementById("followBtn");
  const profileName = "kristakz"; // Replace with actual profile name

  followBtn.addEventListener("click", function () {
    const isFollowing = followBtn.textContent.trim() === "Follow";
    const apiUrl = isFollowing
      ? `https://v2.api.noroff.dev/social/profiles/${profileName}/follow`
      : `https://v2.api.noroff.dev/social/profiles/${profileName}/unfollow`;
    const method = isFollowing ? "PUT" : "DELETE";

    authFetch(apiUrl, {
      method: method,
      body: JSON.stringify({}), // Request body should be empty
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to perform action");
        }
      })
      .then((data) => {
        // Update UI or show success message
        if (isFollowing) {
          followBtn.textContent = "Unfollow";
        } else {
          followBtn.textContent = "Follow";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error or show error message
      });
  });
});
