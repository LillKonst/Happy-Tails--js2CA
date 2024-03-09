import { deletePost } from "../modules/api.js";

function whenDeletePost (postId) {
    if (confirm("This post can not be restored. Are you sure you want to delete it?")) {
        deletePost(postId)
        .then(() => {
            window.location.href = "/html/my-profile/index.html";
        })
        .catch((error) => {
            console.error("Could not delete post:", error );
            const deleteError = document.getElementById("delete-error");
            deleteError.textContent = "Could not delete post. Please try again";
            clearElementAfterDuration(deleteError, 10000);
        });
    }
}