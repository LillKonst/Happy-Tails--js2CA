import { likePost } from "../modules/api.js";

export { attachReactionListener };

const likeCommentError = document.getElementById("likeCommentError");

function attachReactionListener(postId) {
    
    const likeBtn = document.querySelector(".like-btn")

    likeBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            await likePost(postId, "👍");
           // likeCommentError.classList.add("d-none");
            window.location.reload(); 
        } catch (error) {
            console.error("Could not react to post:", error);
            //likeCommentError.classList.remove("d-none");
            clearElementAfterDuration(likeCommentError, 10000); 
        }
    });
}