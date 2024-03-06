import { NOROFF_API_URL } from "../login-function.js";
import { getPostSpecific } from "../modules/api.js";
//import { displayImage } from "./edit.js";
import { attachReactionListener } from "./reactions.js"; 
import { displayComments } from "./comments.js";
import { attachCommentListener } from "./comments.js";
import { postOptions } from "./edit.js";

export { userName };

function getPostIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const userName = localStorage.getItem(`userName`);

async function postData() {
  const postId = getPostIdFromQuery();
  const errorContainer = document.querySelector(".postData-error");

  if (!postId) {
    console.error("Post ID not found.");
    errorContainer.textContent =
      "We are unable to find the requested post. Please check the URL or go back to the homepage to continue browsing.";
    return;
  }

  try {
    const postData = await getPostSpecific(postId);
    displayPost(postData);
    attachCommentListener(postId);
    attachReactionListener(postId);
    postOptions(postData);
  } catch (error) {
    console.error("Error fetching post details:", error);
    errorContainer.textContent =
      "There seems to be an issue loading the post details at this moment. This may affect your ability to comment on or react to the post. Please try reloading the page to see if this resolves the issue.";
  }
} 

// LoadPostData in DOM
document.addEventListener("DOMContentLoaded", postData);

async function displayPost(post) {
  const postId = getPostIdFromQuery();
  console.log(post);
  if (!postId) {
    showError("Blog post is not found");
    return;
  }

  try {
    const titleElement = document.getElementById("title");
    const postDisplay = document.getElementById("post-display")
    const commentSection = document.getElementById("comment-section");

    titleElement.textContent = post.title || "No Title";

    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
    postDisplay.appendChild(cardInner);

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

    const displaybody = document.createElement("div");
    displaybody.classList.add("display-body");
    cardInner.appendChild(displaybody);

    const topContainer = document.createElement("div");
    topContainer.classList.add("d-flex", "top-container");
    displaybody.appendChild(topContainer);

    const username = document.createElement("p");
    username.classList.add("username-display");
    username.innerHTML = `${
      post.author && post.author.name ? post.author.name : "Unknown"
    }`;
    topContainer.appendChild(username);

    const reactionsContainer = document.createElement("div");
    reactionsContainer.classList.add("d-flex", "reactions-container");
    topContainer.appendChild(reactionsContainer);

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-btn", "btn", "btn-sm", "btn-primary", "m-1");
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
    reactionsContainer.appendChild(likeButton);


    // Check if the userName has liked the post and change heart on btn if userName has liked the post
     const hasLiked = postData.reactions.some((reaction) =>
     reaction.reactors.includes(userName)    
    ); console.log("test");
    console.log(hasLiked);

    if (hasLiked) {
      likeButton.classList.add("btn-custom-liked");  
    } else {
     likeButton.classList.remove("btn-custom-liked");
    }


/*
    const commentButton = document.createElement("button");
    commentButton.classList.add("btn", "btn-sm", "btn-outline-primary", "m-1");
    commentButton.innerHTML = '<i class="fa-regular fa-comment"></i>';
    reactionsContainer.appendChild(commentButton);
*/
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn", "btn", "btn-sm", "btn-primary", "m-1");
    editBtn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    editBtn.addEventListener("click", () => { $('#editPost').modal('show');});
    reactionsContainer.appendChild(editBtn);

    /*
  // Check if the current user is the post author
  const currentUserIsAuthor = post.author.name === userName;

  // Add condition to show/hide edit and delete buttons
  if (currentUserIsAuthor) {
    editBtn.classList.remove("d-none");

    // Similarly, add conditions and event listener for delete button
  } else {
    // If the current user is not the author, hide edit and delete buttons
    editBtn.classList.add("d-none");
    // Additional actions if needed
  }
    */

    const postTitle = document.createElement("h3");
    postTitle.classList.add("post-title", "mr-auto");
    postTitle.innerHTML = post.title || "No Title";
    displaybody.appendChild(postTitle);

    const postText = document.createElement("p");
    postText.classList.add("post-text");
    postText.innerHTML = post.body || "No Body"; // Assuming body is the property that contains the post text
    displaybody.appendChild(postText);

    const timestamp = document.createElement("h4");
    timestamp.innerHTML = post.created || "No Timestamp"; // Assuming created is the property that contains the timestamp
    displaybody.appendChild(timestamp);

    const commentsData = postData.comments || [];
    
    const comments = document.getElementById("display-comments");
    comments.innerHTML = displayComments(commentsData);
    commentSection.appendChild(comments);

  } catch (error) {
    (error.message);
  }
  
}