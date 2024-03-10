import { commentPost } from "../modules/api.js";
import { getPostIdFromQuery } from "./display.js";
import { userName } from "./display.js";

export { displayComments };
export { attachCommentListener };

async function postData() {
  const postId = getPostIdFromQuery();
  const errorContainer = document.querySelector(".postData-error");

  if (!postId) {
   // console.error("Post ID not found.");
    errorContainer.textContent =
      "We are unable to find the requested post. Please check the URL or go back to the homepage to continue browsing.";
    return;
  }

  try {
    const postData = await getPostSpecific(postId);
    displayPost(postData);

    // Extract comments from postData
    const commentsData = postData.comments || [];

    // Display comments
    displayComments(commentsData, postData.author.name === userName);

    attachCommentListener(postId);
    postOptions(postData);
  } catch (error) {
    // Handle error
  }
}

postData();

// debugging

function displayComments(comments, PostAuthor) {
  const commentsContainer = document
    .getElementById("comment-section")
    .querySelector("#display-comments");
  commentsContainer.innerHTML = "";

  console.log("Comments:", comments); // Log comments to check its content

  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      console.log("Current Comment:", comment); // Log each comment for debugging

      // If user's post
      const deleteComment = PostAuthor || userName === comment.author.name;
      const deleteCommentBtn = deleteComment
        ? `<i class="classes...." data-comment-id="${comment.id}"></i>`
        : "";

      try {
        const theComment = document.createElement("div");
        theComment.classList.add(
          "comment-container",
          "d-flex",
          "gap-3",
          "mx-3",
          "shadow-sm",
          "p-2",
          "m-4",
          "bg-body",
          "rounded"
        );

        const topContainer = document.createElement("div");
        topContainer.classList.add("d-flex", "top-container");
        theComment.appendChild(topContainer);

        const username = document.createElement("p");
        username.classList.add("username-display", "text-primary");
        username.innerHTML = `${
          comment.author && comment.author.name
            ? comment.author.name
            : "Unknown"
        }`;
        topContainer.appendChild(username);

        topContainer.innerHTML += deleteCommentBtn;

        const commentText = document.createElement("p");
        commentText.classList.add("comment-text");
        commentText.innerHTML = comment.body || "No Body"; // Assuming body is the property that contains the comment text
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
      if (!userComment) {
        console.error("Comment not found");
        return;
      }

      const commentText = userComment.value.trim();
      if (!commentText) {
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
    });
}
