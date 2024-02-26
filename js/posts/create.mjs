import { NOROFF_API_URL } from "../login-function.mjs";

import { authFetch } from "../auth.mjs";

import { headers } from "../auth.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a new post.
 * @param {Object} postData
 * @returns {Promise}
 */

export async function createAPost(postData) {
  const createPostURL = `${NOROFF_API_URL}/social/posts`

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const response = await authFetch(createPostURL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create post: ${errorData.message}`);
  }
  const result = await response.json();
  return result.data;
}

// Creating post with information from the form
document.getElementById("createPost")
.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Event listener triggered");
  // Create post values
  const title = document.getElementById("post_title").value;
  const body = document.getElementById("post_body").value;
  const mediaURL = document.getElementById("post_image").value;
  //const altText = document.getElementById("altText").value;
  //const tags = document.getElementById("tags").value;
  const errorMessage = document.getElementById("post_error-message");

  try {
    const postData = {
      title, 
      body,
      tags,
      //media: mediaURL ? { url: mediaURL, alt: altText } : undefined
    };
    const result = await createAPost(postData);
    console.log("Post created successfully", result);
  } catch (error) {
    console.error("Error creating post:", error.message);
    // Handle the error or display an error message to the user
  }

});

/*
  
// Funcion for uploadeing image to post
const image_input = document.querySelector("image_input");
var uploaded_image = "";

image_input.addEventListener("change", function() {
    const reader = new FileReader(); 
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image}`
    });
    reader.readAsDataURL(this.files[0]);
})
*/


