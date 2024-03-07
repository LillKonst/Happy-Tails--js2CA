import {
  getPostsFromFollowing,
  getPostsFromSearch,
} from "../js/modules/api.js";

export { displayPosts };

export const MAX_TEXT_LENGTH = 50; // Maximum number of characters to display

document.getElementById("feed-container");

async function displayPosts(posts, profiles) {
  try {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      const postCard = document.createElement("div");
      postCard.classList.add("col-md-5", "m-2");
      postCard.addEventListener("click", () => {
        window.location.href = `/html/post/post-specific.html?id=${post.id}&title=${post.title.rendered}`;
      });
      feedContainer.appendChild(postCard);

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
      /* 
      // Display the username - new code that works for username
      const userNameElement = document.createElement("h1");
      userNameElement.classList.add("card-text");
      userNameElement.textContent = ` ${userName}`;
      cardBody.appendChild(userNameElement); */

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
        post.title.length > MAX_TEXT_LENGTH
          ? post.title.substring(0, MAX_TEXT_LENGTH) + "..."
          : post.title;
      postTitle.innerHTML = truncatedTitle || "No Title";
      cardBody.appendChild(postTitle);

      const postText = document.createElement("p");
      postText.classList.add("card-text");
      const truncatedText =
        post.body.length > MAX_TEXT_LENGTH
          ? post.body.substring(0, MAX_TEXT_LENGTH) + "..."
          : post.body;
      postText.innerHTML = truncatedText || "No Body"; // Assuming body is the property that contains the post text
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

// Event listener to display & filter only posts from users that i follow.

document.addEventListener("DOMContentLoaded", () => {
  getPostsFromFollowing(true).then((posts) => {
    displayPosts(posts);
  });
});

document.getElementById("newest").addEventListener("click", function (event) {
  event.preventDefault();
  getPostsFromFollowing(true).then((posts) => {
    displayPosts(posts);
  });
});

document.getElementById("oldest").addEventListener("click", function (event) {
  event.preventDefault();
  getPostsFromFollowing(false).then((posts) => {
    displayPosts(posts);
  });
});

document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getPostsFromSearch(event.target.value).then((posts) => {
        displayPosts(posts);
        // getProfilesFromSearch(event.target.value).then((profiles) => {
        //   displayPosts(posts, profiles);
        // });
      });
    }
  });
