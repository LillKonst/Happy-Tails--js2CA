import { NOROFF_API_URL } from "../login-function.js";
import { getPostSpecific } from "../modules/api.js";

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
        displayPost(postData, postId);
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

async function displayPost() {
    const postId = getPostIdFromQuery();

    if (!postId) {
        showError("Blog post is not found");
        return;
    }

    try {
        const response = await fetch(`${NOROFF_API_URL}/social/posts/${postId}`);
        const post = await response.json();
        const titleElement = document.getElementById("title");
        const postContainer = document.getElementById("post-container");

        titleElement.textContent = post.title || "No Title";

        const postCard = document.createElement("div");
        postCard.classList.add("col-md-5", "m-2");
        postContainer.appendChild(postCard);

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
        username.innerHTML = `${post.author && post.author.name ? post.author.name : "Unknown"}`;
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
    } catch (error) {
        //showError(error.message);
    }
}







/*
import { NOROFF_API_URL } from "../login-function.js";

import { getPostSpecific } from "../modules/api.js";

function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
  }
 /*
  function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
  }


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
      displayPost(postData, postId);
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


async function displayPost() {
    const postId = getPostIdFromQuery();
    if (!postId) {
      showError("Blog post is not found");
      return;
    }
    try {
        const response = await fetch(`${NOROFF_API_URL}/social/posts/${postId}`);
        const post = await response.json();
        const titleElement = document.getElementById("title");
        const postContainer = document.getElementById("post-container");
    
        titleElement.textContent = postContainer.title.rendered;
  
        const postCard = document.createElement("div");
              postCard.classList.add("col-md-5", "m-2");
              postContainer.appendChild(postCard);
    
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
              }`
             
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
              cardBody.appendChild(timestamp);}

}
  /*
    try {
      const response = await fetch(`${NOROFF_API_URL}/social/posts/${postId}`);
      const post = await response.json();
      const titleElement = document.getElementById("title");
      const postContainer = document.getElementById("post-container");
  
      titleElement.textContent = postContainer.title.rendered;

      const postCard = document.createElement("div");
            postCard.classList.add("col-md-5", "m-2");
            postContainer.appendChild(postCard);
  
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
            }`
           
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
        
    /*
        const postTags = postDetail.tags.map((tag) => tag);
        await displayPost(postTags);
    
    } catch (error) {
      showError(error.message);
    }
  }
  
  */