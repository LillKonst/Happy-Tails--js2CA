import { userName } from "./display.js";
import { updatePost } from "../modules/api.js";
import { whenDeletePost } from "./delete.js";

export { postOptions };

function postOptions(post) {
  const postByCurrentUser = post.author.name === userName;
  const editBtn = document.querySelector(".edit-btn");

  if (postByCurrentUser) {
      editBtn.classList.remove("d-none");
      const editPostForm = document.getElementById("editPostForm");

      editBtn.addEventListener("click", () => {
          const getData = retrievePostData(post);
          openEditForm(editPostForm, getData);
          editPostForm.style.display = "block";
      });

      document.getElementById("save-changes").addEventListener("click", () => {
          const getData = retrievePostData(post);
          saveChangesPost(post.id, getData);
      });
      
      document.getElementById("delete-post").addEventListener("click", () => {
        whenDeletePost(post.id);
      });  
      

  } else {
      editBtn.classList.add("d-none");
  }
}

function openEditForm(editPostForm, data) {
  document.getElementById("edit_post_title").value = data.title;
  document.getElementById("edit_post_body").value = data.body;
  document.getElementById("edit_image_input").value = data.media.url;
}

function retrievePostData(post) {
  return {
      title: post.title || "",
      body: post.body || "",
      media: {
          url: post.media?.url || "",
      },
  };
}

function saveChangesPost(postId, data) {
  const newData = {
      title: document.getElementById("edit_post_title").value,
      body: document.getElementById("edit_post_body").value,
      media: {
          url: document.getElementById("edit_image_input").value,
      },
  };

  // Use newData or data, whichever approach you prefer
  updatePost(postId, newData)
      .then((response) => {
          window.location.reload();
      })
      .catch((error) => {
          console.error("Failed to update post:", error);
          const updateError = document.getElementById("editErrorFeedback");
          updateError.textContent = "Failed to update post. ";
      });
}
