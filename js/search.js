import { authFetch } from "./auth.mjs";

const NOROFF_API_URL = "https://v2.api.noroff.dev";

// Function to perform search
async function performSearch(query) {
  try {
    const response = await authFetch(
      `https://v2.api.noroff.dev/social/profiles/search?q=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      displayResults(data);
    } else {
      throw new Error(`Unexpected response format!`);
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

function displayResults(results) {
  const searchResultsElement = document.getElementById("searchResults");
  searchResultsElement.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    searchResultsElement.textContent = "No results found";
    return;
  }

  // Display each result
  results.forEach((profile) => {
    const profileElement = document.createElement("div");
    const profileLink = document.createElement("a");
    profileLink.href = `profile.html?id=${profile.id}`; // Assuming the profile ID is used in the URL
    profileLink.innerHTML = `
            <h3>${profile.name}</h3>
            <p>${profile.bio}</p>
        `;
    profileElement.appendChild(profileLink);
    searchResultsElement.appendChild(profileElement);

    // Add event listener to handle click event
    profileLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      navigateToProfile(profile.id); // Function to navigate to the profile page
    });
  });
}

function navigateToProfile(profileId) {
  // Redirect the user to the profile page using the profile ID
  window.location.href = `profile.html?id=${profileId}`;
}
