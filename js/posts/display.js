import { NOROFF_API_URL } from "../login-function.js";
import { getPostSpecific } from "../modules/api.js";
import { displayImage } from "./edit.js";

function getPostIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

/*
function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}
*/

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
    //attachCommentListener(postId);
    //attachReactionListener(postId);
    //setupPostOptions(postData);
  } catch (error) {
    //console.error("Error fetching post details:", error);
    //errorContainer.textContent =
    //  "There seems to be an issue loading the post details at this moment. This may affect your ability to comment on or react to the post. Please try reloading the page to see if this resolves the issue.";
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
    likeButton.classList.add("btn", "btn-sm", "btn-primary", "m-1");
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
    reactionsContainer.appendChild(likeButton);

    const commentButton = document.createElement("button");
    commentButton.classList.add("btn", "btn-sm", "btn-outline-primary", "m-1");
    commentButton.innerHTML = '<i class="fa-regular fa-comment"></i>';
    reactionsContainer.appendChild(commentButton);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn", "btn", "btn-sm", "btn-primary", "m-1");
    editBtn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    editBtn.addEventListener("click", () => { $('#editPost').modal('show');});
    reactionsContainer.appendChild(editBtn);
    
    

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

    const displayComments = document.getElementById("display-comments");
    displayComments.innerHTML = "No comments yet"; // if no comments yet. Add code to display comments.
    commentSection.appendChild(displayComments);

  } catch (error) {
    //showError(error.message);
  }
  
}

 // Calling function to determinate if the current user is the post author and displays comments
 const postAuthor = postData.author.name === currentUser;
 displayComments(postData.comments, postAuthor, postId);


function postoptions(postData) {
  
  const editBtn = document.querySelector(".edit-btn");  // Assuming edit-btn is a class
  const deleteBtn = document.querySelector(".delete-btn");  // Assuming delete-btn is a class

  if (postAuthor) {
    editBtn.classList.remove("d-none");
    deleteBtn.classList.remove("d-none");

    editBtn.addEventListener("click", () => openEditModal(postData));
    // Assuming "saveChanges" is a button inside the modal for saving changes
    document.getElementById("saveChanges").addEventListener("click", () => saveChanges(postData.id));
    deleteBtn.addEventListener("click", () => deletePost(postData.id));
  } else {
    editBtn.classList.add("d-none");
    deleteBtn.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Assuming you have a way to retrieve the current post data
  const currentPostData = getCurrentPostData();  // Replace with actual implementation
  postoptions(currentPostData);
});

// Example function to retrieve current post data (replace with actual implementation)
function getCurrentPostData() {
  // Replace this with your actual implementation to get the current post data
  // You might need to fetch it from the API or use some other method
  return {
    author: {
      name: "currentUser"
    }
    // Add other properties as needed
  };
}

displayImage();