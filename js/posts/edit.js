import { userName } from "./display.js";
import { deletePost, updatePost } from "../modules/api.js";

export { postOptions };

function postOptions(postId) {
    console.log("Post Options Called. User:", userName, "Post Author:", postId.author.name); 
  const postByCurrentUser = postId.author.name === userName;
  console.log(postByCurrentUser);
  const editBtn = document.querySelector(".edit-btn");

  if (postByCurrentUser) {
    editBtn.classList.remove("d-none");
    editBtn.addEventListener("click", () => openEditModal(postId));
    document.getElementById("save-changes").addEventListener("click", () => saveChanges(postId.id, newData));
   // document.getElementById("delete-post").addEventListener("click", () => deletePost(postId.id, newData));
  
  } else {
   editBtn.classList.add("d-none");
  }
} 


function openEditModal(postId) {
            const title = document.getElementById("edit_post_title").value;
            const body = document.getElementById("edit_post_body").value;
            const tagsInput = document.getElementById("edit_tagInput").value;
            const tags = tagsInput ? tagsInput.split(',') : []; 
            const imageInput = document.getElementById("edit_image_input").value; 
    
           //store the values from the inputs
            const newData = {
                title: title,
                body: body,
                tags: tags,
                media: {
                    url: imageInput,
                }
            };
            //calls the editPost to edit
            updatePost(postId, newData)
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                console.error("Failed to update post:", error);
                const updateError = document.getElementById("editErrorFeedback");
                updateError.textContent =
                "Failed to update post. ";
                clearElementAfterDuration(editErrorFeedback, 10000);
            });
        }
/*
document.addEventListener("DOMContentLoaded", () => {
  // Assuming you have a way to retrieve the current post data
  const currentPostData = getCurrentPostData();  // Replace with actual implementation
  postOptions(currentPostData);
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



/////////////////////////////////////////////////////////////////////////////////////////////

export function displayImage() {
    const imageUrl = document.getElementById("edit_image_input").value;
    const imageDisplay = document.getElementById("edit_image-display");

    // Set the background image of the div
    imageDisplay.style.backgroundImage = `url('${imageUrl}')`;
}

//edit post
/*
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("editPostForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Extract data from the form
        const title = document.getElementById("edit_post_title").value;
        const body = document.getElementById("edit_post_body").value;
        const tagsInput = document.getElementById("edit_tagInput").value;
        const tags = tagsInput ? tagsInput.split(',') : []; 
        const imageInput = document.getElementById("edit_image_input").value; 
        const altText = document.getElementById("edit_altText").value;

       //store the values from the inputs
        const postData = {
            title: title,
            body: body,
            tags: tags,
            media: {
                url: imageInput
            }
        };
        //calls the editPost to create
        try {
            const data = await editPost(postData);
            console.log(data); 
            alert("Post created successfully!");
        
        } catch (error) {
            console.error(error);
            //Create error message here
        }
    });
});
*/