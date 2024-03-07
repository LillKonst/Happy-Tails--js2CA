import { NOROFF_API_URL } from "../login-function.js";
import { getPostSpecific } from "../modules/api.js";
//import { displayImage } from "./edit.js";
import { attachReactionListener } from "./reactions.js"; 
import { displayComments } from "./comments.js";
import { attachCommentListener } from "./comments.js";
import { postOptions } from "./edit.js";

export { userName };
export { getPostIdFromQuery };

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
    const commentSection = document.getElementById("display-comments");
    console.log("Selected Elements:", titleElement, postDisplay, commentSection);
  
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

    const displayBody = document.createElement("div");
    displayBody.classList.add("display-body");
    cardInner.appendChild(displayBody);

    const topContainer = document.createElement("div");
    topContainer.classList.add("d-flex", "top-container");
    displayBody.appendChild(topContainer);

    const username = document.createElement("p");
    username.classList.add("username-display");
    username.innerHTML = `${
      post.author && post.author.name ? post.author.name : "Unknown"
    }`;
    username.style.cursor = "pointer";

    username.addEventListener("click", function () {
      // Redirect user to the profile page
      const userProfileUrl = `/html/profile/index.html?username=${post.author.name}`;
      window.location.href = userProfileUrl;
    });

    topContainer.appendChild(username);

    const reactionsContainer = document.createElement("div");
    reactionsContainer.classList.add("d-flex", "reactions-container");
    console.log(reactionsContainer);
    topContainer.appendChild(reactionsContainer);

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-btn", "btn", "btn-sm", "btn-primary", "m-1");
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
    // Change colors of heart if liked by user
    const hasLiked = post.reactions.some((reaction) =>
     reaction.reactors.includes(userName)    
     ); console.log("test");
     console.log(hasLiked);

        if (hasLiked) {
          likeButton.classList.add("btn-custom-liked");  
        } else {
          likeButton.classList.remove("btn-custom-liked");
        } 
  reactionsContainer.appendChild(likeButton);

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
    console.log("Creating edit button"); 

    reactionsContainer.appendChild(editBtn);

    const postTitle = document.createElement("h3");
    postTitle.classList.add("post-title", "mr-auto");
    postTitle.innerHTML = post.title || "No Title";
    displayBody.appendChild(postTitle);

    const postText = document.createElement("p");
    postText.classList.add("post-text");
    postText.innerHTML = post.body || "No Body"; 
    displayBody.appendChild(postText);

    const timestamp = document.createElement("h4");

    //timestamp.innerHTML = post.created || "No Timestamp";
    //displayBody.appendChild(timestamp);
 
/*
    const comment = document.createElement("div");
    comment.classList.add("comment");
    commentSection.appendChild(comment);

    const authorComment = createElement("h2");
    authorComment.innerHTML = commentsData.owner;
    comment.appendChild(authorComment);

    const bodyComment = createElement("p");
    bodyComment.innerHTML = commentData.body;
    comment.appendChild(bodyComment);
*/

    const createdDate = new Date(post.created);
    const formattedDate = createdDate.toLocaleDateString();
    const formattedTime = createdDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timestamp.innerHTML = `${formattedDate} ${formattedTime}` || "No Timestamp";
    displaybody.appendChild(timestamp);
    
    const commentsData = post.comments || [];
    displayComments(commentsData);

    //const displayComments = document.getElementById("display-comments");
    //displayComments.innerHTML = "No comments yet"; // if no comments yet. Add code to display comments.
    //commentSection.appendChild(displayComments);

  } catch (error) {
    (error.message);
  }
  
}

