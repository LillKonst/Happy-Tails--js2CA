import {
  getAllPosts,
  getPostsFromSearch,
  getAllProfiles,
  getProfilesFromSearch,
} from "../js/modules/api.js";
import { MAX_TEXT_LENGTH } from "../js/my-feed.js";

document.getElementById("explore-container");

async function displayAllPosts(newestFirst = true, posts) {
  try {
    const displayPosts = posts || (await getAllPosts(newestFirst));
    const exploreContainer = document.getElementById("explore-container");
    exploreContainer.innerHTML = "";

    for (let i = 0; i < displayPosts.length; i++) {
      const post = displayPosts[i];

      const postCard = document.createElement("div");
      postCard.classList.add("col-md-5", "col-sm-6", "m-2");
      postCard.addEventListener("click", () => {
        window.location.href = `/html/post/index.html?id=${post.id}&title=${post.title.rendered}`;
      });
      exploreContainer.appendChild(postCard);

      const cardInner = document.createElement("div");
      cardInner.classList.add(
        "card",
        "card-body",
        "mx-auto",
        "card-custom",
        "shadow-sm"
      );
      postCard.appendChild(cardInner);

      // Check if post.media exists before accessing its properties
      if (post.media && post.media.url) {
        const image = document.createElement("img");
        image.setAttribute("src", post.media.url);
        image.setAttribute("alt", post.media.alt);
        image.classList.add("card-img-top");
        cardInner.appendChild(image);
      } else {
        // Display a default image
        const defaultImage = document.createElement("img");
        defaultImage.setAttribute("src", "/images/default-image.jpg"); // Replace "default-image.jpg" with your default image file
        defaultImage.setAttribute("alt", "Default Image");
        defaultImage.classList.add("card-img-top");
        cardInner.appendChild(defaultImage);
      }

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardInner.appendChild(cardBody);

      const topContainer = document.createElement("div");
      topContainer.classList.add("d-flex", "top-container");
      cardBody.appendChild(topContainer);

      const username = document.createElement("p");
      username.classList.add("username");
      username.innerHTML = `${
        post.author && post.author.name ? post.author.name : "Unknown"
      }`;

      topContainer.appendChild(username);

      const reactionsContainer = document.createElement("div");
      reactionsContainer.classList.add("d-flex", "reactions-container");
      topContainer.appendChild(reactionsContainer);

      const likeButton = document.createElement("button");
      likeButton.classList.add("btn", "btn-sm", "btn-primary", "m-1");
      likeButton.innerHTML = '<i class="fas fa-heart"></i>';
      likeButton.setAttribute("aria-label", "Like");
      reactionsContainer.appendChild(likeButton);

      const commentButton = document.createElement("button");
      commentButton.classList.add(
        "btn",
        "btn-sm",
        "btn-outline-primary",
        "m-1"
      );
      commentButton.innerHTML = '<i class="far fa-comment"></i>';
      commentButton.setAttribute("aria-label", "Comment");

      const postTitle = document.createElement("h3");
      postTitle.classList.add("card-title", "mr-auto");
      const truncatedTitle =
        post.title && post.title.length > MAX_TEXT_LENGTH
          ? post.title.substring(0, MAX_TEXT_LENGTH) + "..."
          : post.title || "No Title"; // If post.title doesn't exist or is null, set the default value to "No Title"
      postTitle.innerHTML = truncatedTitle;
      cardBody.appendChild(postTitle);

      const postText = document.createElement("p");
      postText.classList.add("card-text");
      const truncatedText =
        post.body && post.body.length > MAX_TEXT_LENGTH
          ? post.body.substring(0, MAX_TEXT_LENGTH) + "..."
          : post.body || "No Body"; // If post.body doesn't exist or is null, set the default value to "No Body"
      postText.innerHTML = truncatedText;
      cardBody.appendChild(postText);

      const timestamp = document.createElement("h4");
      const createdDate = new Date(post.created);
      const formattedDate = createdDate.toLocaleDateString();
      const formattedTime = createdDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      timestamp.innerHTML =
        `${formattedDate} ${formattedTime}` || "No Timestamp";
      cardBody.appendChild(timestamp);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayAllPosts(true).then((posts) => {});
});

document.getElementById("newest").addEventListener("click", function (event) {
  event.preventDefault();
  displayAllPosts(true).then((posts) => {});
});

document.getElementById("oldest").addEventListener("click", function (event) {
  event.preventDefault();
  displayAllPosts(false).then((posts) => {});
});

document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchTerm = event.target.value;
      getPostsFromSearch(searchTerm).then((posts) => {
        displayAllPosts(true, posts);
        // getProfilesFromSearch(event.target.value).then((profiles) => {
        //   displayPosts(posts, profiles);
        // });
      });
    }
  });

/* // Import necessary functions from api.js
import {
  getAllPosts,
  getPostsFromSearch,
  getProfilesFromSearch,
  getAllProfiles,
} from "../js/modules/api.js";

import { fetchAllProfiles, searchProfiles } from "../js/allProfiles.js";
export const MAX_TEXT_LENGTH = 50; // Maximum number of characters to display

// import { MAX_TEXT_LENGTH } from "../js/my-feed.js";

document.addEventListener("DOMContentLoaded", () => {
  // Function to display posts
  async function displayAllPosts(newestFirst = true, posts) {
    try {
      const displayPosts = posts || (await getAllPosts(newestFirst));
      const exploreContainer = document.getElementById("explore-container");
      exploreContainer.innerHTML = "";

      for (let i = 0; i < displayPosts.length; i++) {
        const post = displayPosts[i];
        const postCard = document.createElement("div");
        postCard.classList.add("col-md-5", "m-2");
        postCard.addEventListener("click", () => {
          window.location.href = `/html/profile/post-specific.html?id=${post.id}&title=${post.title.rendered}`;
        });
        exploreContainer.appendChild(postCard);

        const cardInner = document.createElement("div");
        cardInner.classList.add(
          "card",
          "card-body",
          "mx-auto",
          "card-custom",
          "shadow-sm"
        );
        postCard.appendChild(cardInner);

        // Check if post.media exists before accessing its properties
        if (post.media && post.media.url) {
          const image = document.createElement("img");
          image.setAttribute("src", post.media.url);
          image.setAttribute("alt", post.media.alt);
          image.classList.add("card-img-top");
          cardInner.appendChild(image);
        } else {
          // Display a default image
          const defaultImage = document.createElement("img");
          defaultImage.setAttribute("src", "/images/default-image.jpg");
          defaultImage.setAttribute("alt", "Default Image");
          defaultImage.classList.add("card-img-top");
          cardInner.appendChild(defaultImage);
        }

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardInner.appendChild(cardBody);

        const topContainer = document.createElement("div");
        topContainer.classList.add("d-flex", "top-container");
        cardBody.appendChild(topContainer);

        const username = document.createElement("p");
        username.classList.add("username");
        username.innerHTML = `${
          post.author && post.author.name ? post.author.name : "Unknown"
        }`;

        topContainer.appendChild(username);

        const reactionsContainer = document.createElement("div");
        reactionsContainer.classList.add("d-flex", "reactions-container");
        topContainer.appendChild(reactionsContainer);

        const likeButton = document.createElement("button");
        likeButton.classList.add("btn", "btn-sm", "btn-primary", "m-1");
        likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
        reactionsContainer.appendChild(likeButton);

        const commentButton = document.createElement("button");
        commentButton.classList.add(
          "btn",
          "btn-sm",
          "btn-outline-primary",
          "m-1"
        );
        commentButton.innerHTML = '<i class="fa-regular fa-comment"></i>';
        reactionsContainer.appendChild(commentButton);

        const postTitle = document.createElement("h3");
        postTitle.classList.add("card-title", "mr-auto");
        const truncatedTitle =
          post.title && post.title.length > MAX_TEXT_LENGTH
            ? post.title.substring(0, MAX_TEXT_LENGTH) + "..."
            : post.title || "No Title"; // If post.title doesn't exist or is null, set the default value to "No Title"
        postTitle.innerHTML = truncatedTitle;
        cardBody.appendChild(postTitle);

        const postText = document.createElement("p");
        postText.classList.add("card-text");
        const truncatedText =
          post.body && post.body.length > MAX_TEXT_LENGTH
            ? post.body.substring(0, MAX_TEXT_LENGTH) + "..."
            : post.body || "No Body"; // If post.body doesn't exist or is null, set the default value to "No Body"
        postText.innerHTML = truncatedText;
        cardBody.appendChild(postText);

        const timestamp = document.createElement("h4");
        timestamp.innerHTML = post.created || "No Timestamp"; // Assuming created is the property that contains the timestamp
        cardBody.appendChild(timestamp);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to display profiles in the modal
  function displayProfiles(profiles) {
    const profilesContainer = document.getElementById("profiles");
    profilesContainer.innerHTML = ""; // Clear previous content

    profiles.forEach((profile) => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card");
      profileCard.innerHTML = `
      <h5>${profile.username}</h5>
      <p>${profile.bio}</p>
    `;
      profilesContainer.appendChild(profileCard);
    });

    // Initialize and show the modal
    const searchModal = new bootstrap.Modal(
      document.getElementById("searchResultsModal")
    );
    searchModal.show();
  }

  document
    .getElementById("searchInput")
    .addEventListener("keypress", async function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const searchTerm = event.target.value;
        // Check if the search term is a profile name (assuming "@" denotes a profile search)
        if (searchTerm.startsWith("@")) {
          try {
            const profiles = await getProfilesFromSearch(searchTerm.substr(1)); // Remove "@" from search term
            // Display profiles in the modal
            displayProfiles(profiles);
            // Show the modal
            const searchModal = new bootstrap.Modal(
              document.getElementById("searchResultsModal")
            );
            searchModal.show();
          } catch (error) {
            console.error(error);
          }
        } else {
          // Search for posts
          try {
            const posts = await getPostsFromSearch(searchTerm);
            // Display the posts normally
            displayAllPosts(true, posts);
          } catch (error) {
            console.error(error);
          }
        }
      }
    });

  // Initial display of posts
  displayAllPosts(true);

  // Example usage
  fetchAllProfiles(); // Fetch all profiles
  searchProfiles("example query"); // Search for profiles
});

// Event listeners for sorting posts
document.getElementById("newest").addEventListener("click", function (event) {
  event.preventDefault();
  displayAllPosts(true);
});

document.getElementById("oldest").addEventListener("click", function (event) {
  event.preventDefault();
  displayAllPosts(false);
});
 */
