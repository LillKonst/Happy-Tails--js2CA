import { likePost } from "../modules/api.js";

export { attachReactionListener };

const likeCommentError = document.getElementById("likeCommentError");

function attachReactionListener(postId) {
    
    const likeBtn = document.querySelector(".like-btn")

    likeBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            await likePost(postId, "👍");
            window.location.reload(); 
        } catch (error) {
            console.error("Could not react to post:", error);
        }
    });
}