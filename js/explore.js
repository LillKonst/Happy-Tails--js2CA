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
      cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
      postCard.appendChild(cardInner);
      cardInner.style.cursor = "pointer";

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
      username.style.cursor = "pointer";

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
      reactionsContainer.appendChild(commentButton);

      const postTitle = document.createElement("h2");
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

      const timestamp = document.createElement("h3");
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
