import { getPostsFromFollowing } from "../js/modules/api.js";

document.getElementById("explore-container");

async function displayPostsFromFollowing(newestFirst) {
  try {
    const posts = await getPostsFromFollowing(newestFirst);
    const exploreContainer = document.getElementById("explore-container");
    exploreContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      const postCard = document.createElement("div");
      postCard.classList.add("col-md-5", "m-2");
      exploreContainer.appendChild(postCard);

      const cardInner = document.createElement("div");
      cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
      postCard.appendChild(cardInner);

      // Check if post.media exists before accessing its properties
      if (post.media && post.media.url) {
        const image = document.createElement("img");
        image.setAttribute("src", post.media.url);
        image.setAttribute("alt", post.media.alt);
        image.classList.add("card-img-top");
        cardInner.appendChild(image);
      } else {
        // Display the post without an image
        const noMediaStyle = document.createElement("div");
        noMediaStyle.classList.add("no-media");
        cardInner.appendChild(noMediaStyle);
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
      postTitle.innerHTML = post.title || "No Title";
      cardBody.appendChild(postTitle);

      const postText = document.createElement("p");
      postText.classList.add("card-text");
      postText.innerHTML = post.body || "No Body"; // Assuming body is the property that contains the post text
      cardBody.appendChild(postText);

      const timestamp = document.createElement("h4");
      timestamp.innerHTML = post.created || "No Timestamp"; // Assuming created is the property that contains the timestamp
      cardBody.appendChild(timestamp);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPostsFromFollowing(true);
});

document.getElementById("newest").addEventListener("click", function (event) {
  event.preventDefault();
  displayPostsFromFollowing(true);
});

document.getElementById("oldest").addEventListener("click", function (event) {
  event.preventDefault();
  displayPostsFromFollowing(false);
});
