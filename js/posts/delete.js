import { deletePost } from "../modules/api.js";

export { whenDeletePost};

function whenDeletePost (postId) {
    const confirmation = confirm("This post can not be restored. Are you sure you want to delete it?");
    if (confirmation) {
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