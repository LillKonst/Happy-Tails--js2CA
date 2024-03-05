import { commentPost } from "../modules/api.js";

export { displayComments };
export { attachCommentListener };

/// display comments
/*
function displayComments(comments, PostAuthor, postId) {
    const commentsContainer = document.getElementById("display-comments");
    commentsContainer.innerHTML = "";

    if (comments && comments.length > 0) {
        comments.forEach((comment) => {
            //if users post
            const deleteComment = PostAuthor || currentUser === comment.author.name;
            const deleteCommentBtn = deleteComment
            ?`<i class="classes...." data comment-id="${comment.id}"></i>`
            : "";
     })


    try {
            const theComment = document.createElement("div");
            displaybody.classList.add("comment-container");
            commentsContainer.appendChild(theComment);    

            const topContainer = document.createElement("div");
            topContainer.classList.add("d-flex", "top-container");
            theComment.appendChild(topContainer);

            const username = document.createElement("p");
            username.classList.add("username-display");
            username.innerHTML = `${
            comments.author && comments.author.name ? comments.author.name : "Unknown"
            }`;
            topContainer.appendChild(username);

            topContainer.appendChild(deleteCommentBtn);

            const commentText = document.createElement("p");
            commentText.classList.add("comment-text");
            commentText.innerHTML = comments.body || "No Body"; // Assuming body is the property that contains the post text
            theComment.appendChild(commentText);

            commentsContainer.insertAdjacentHTML("afterbegin", theComment);

        } catch (error) {
            //
        }

    }  
    }
*/
/*
//new display comments

function displayComments(comments, PostAuthor) {
    const commentsContainer = document.getElementById("display-comments");
    commentsContainer.innerHTML = "";
  
    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        // If user's post
        const deleteComment = PostAuthor || currentUser === comment.author.name;
        const deleteCommentBtn = deleteComment
          ? `<i class="classes...." data-comment-id="${comment.id}"></i>`
          : "";
  
        try {
          const theComment = document.createElement("div");
          theComment.classList.add("comment-container");
  
          const topContainer = document.createElement("div");
          topContainer.classList.add("d-flex", "top-container");
          theComment.appendChild(topContainer);
  
          const username = document.createElement("p");
          username.classList.add("username-display");
          username.innerHTML = `${
            comment.author && comment.author.name
              ? comment.author.name
              : "Unknown"
          }`;
          topContainer.appendChild(username);
  
          topContainer.innerHTML += deleteCommentBtn;
  
          const commentText = document.createElement("p");
          commentText.classList.add("comment-text");
          commentText.innerHTML =
            comment.body || "No Body"; // Assuming body is the property that contains the comment text
          theComment.appendChild(commentText);
  
          commentsContainer.appendChild(theComment);
        } catch (error) {
          console.error("Error displaying comment:", error);
        }
      });
    }
  }
  */
// debugging 

function displayComments(comments, PostAuthor) {
    const commentsContainer = document.getElementById("display-comments");
    commentsContainer.innerHTML = "";
  
    console.log("Comments:", comments); // Log comments to check its content
  
    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        console.log("Current Comment:", comment); // Log each comment for debugging
  
        // If user's post
        const deleteComment =
          PostAuthor || currentUser === comment.author.name;
        const deleteCommentBtn = deleteComment
          ? `<i class="classes...." data-comment-id="${comment.id}"></i>`
          : "";
  
        try {
          const theComment = document.createElement("div");
          theComment.classList.add("comment-container");
  
          const topContainer = document.createElement("div");
          topContainer.classList.add("d-flex", "top-container");
          theComment.appendChild(topContainer);
  
          const username = document.createElement("p");
          username.classList.add("username-display");
          username.innerHTML = `${
            comment.author && comment.author.name
              ? comment.author.name
              : "Unknown"
          }`;
          topContainer.appendChild(username);
  
          topContainer.innerHTML += deleteCommentBtn;
  
          const commentText = document.createElement("p");
          commentText.classList.add("comment-text");
          commentText.innerHTML =
            comment.body || "No Body"; // Assuming body is the property that contains the comment text
          theComment.appendChild(commentText);
  
          commentsContainer.appendChild(theComment);
        } catch (error) {
          console.error("Error displaying comment:", error);
        }
      });
    }
  }
  


///////////// add comment 

function attachCommentListener(postId) {
    document
    .getElementById("send-comment")
    .addEventListener("click", async (event) => {
        event.preventDefault();

        const userComment = document.getElementById("user-comment");
        if(!userComment) {
            console.error("Comment not found");
            return;
        }

        const commentText = userComment.value.trim();
        if(!commentText) {
           // likeCommentError.textContent = "Comment must have text.";
            // likeCommentError.classList.remove("d-none");
            clearElementAfterDuration(likeCommentError, 10000);
            return;
        }

        try {
            await commentPost(postId, commentText);
            userComment.value = "";
           // likeCommentError.classList.add("d-none");
            window.location.reload();
        } catch (error) {
            console.error("Could not post comment:", error);
           // likeCommentError.textComment =
            //"Could not post comment. Please try again later.";
           // likeCommentError.classList.remove("d-none");
            clearElementAfterDuration(likeCommentError, 10000);
        }
    })
}