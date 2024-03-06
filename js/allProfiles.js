import { searchProfilesByUsername } from "../js/modules/api.js";

const userProfilesContainer = document.getElementById("userProfile");
const searchInput = document.getElementById("searchInput");
const userCardTemplate = document.getElementById("userCardTemplate");

// Function to render user profiles
function renderUserProfiles(users) {
  userProfilesContainer.innerHTML = "";
  users.forEach((user) => {
    const card = userCardTemplate.content.cloneNode(true);
    card.querySelector("[data-name]").textContent = user.name;
    card.querySelector("[data-email]").textContent = user.email;
    userProfilesContainer.appendChild(card);
  });
}
// Function to handle search input
async function handleSearchInput() {
  const searchValue = searchInput.value.trim().toLowerCase();
  try {
    const profile = await searchProfilesByUsername(searchValue);
    console.log("Profile:", profile);

    // Render user profiles
    renderUserProfiles(profile);

    // Display the searched username
    const searchedUsername = document.getElementById("searchedUsername");
    searchedUsername.textContent = searchValue;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    // Handle the error (e.g., display an error message to the user)
  }
}

// Event listener for search input
searchInput.addEventListener("input", handleSearchInput);

// Event listener for clicked username
userProfilesContainer.addEventListener("click", function (event) {
  const clickedElement = event.target.closest(".user-card");
  if (clickedElement) {
    const profileUsername =
      clickedElement.querySelector("[data-name]").textContent;
    if (profileUsername) {
      // Navigate to the profile page with the username
      window.location.href = `/html/profile/index.html?username=${profileUsername}`;
    }
  }
});
