import { NOROFF_API_URL } from "../login-functions.mjs";

import { authFetch } from "../auth.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  const createPostURL = await fetch(`${NOROFF_API_URL}/social/posts`);

  const response = await authFetch(createPostURL, {
    method: "POST",
    body: JSON.stringify(postData),
  });

  return await response.json();
}

/*





    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create post: ${errorData.message}`);
  }
  const result = await response.json();
  return result.data;
}




// const user_post = document.querySelector
/*
const post_body = document.querySelector("post_body");


{
    "title": "string", // Required
    "body": "string", // Optional
    "tags": ["string"], // Optional
    "media": {
      "url": "https://url.com/image.jpg",
      "alt": "string"
    } // Optional
  }

  
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

/**
 * Creates a new post.
 * @param {Object} postData
 * @returns {Promise}
 
async function createPost(postData) {
  const response = await fetch(`${NOROFF_API_URL}/social/posts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create post: ${errorData.message}`);
  }
  const result = await response.json();
  return result.data;
}

//------ Import --------/
//import { createPost } from "../modules/api.js";

// --Handle the submission for the new post form --//
document
  .getElementById("createPost")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    // values from the form
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
    const mediaUrl = document.getElementById("postImage").value;
    const altText = document.getElementById("altText").value;
    const errorFeedback = document.getElementById("postErrorFeedback");

    // Check if "All" is selected, and if so, set tags as an empty array
    const selectedContinent =
     document.getElementById("continentSelect").value;
    const tags =
      selectedContinent !== "Not Specified" ? [selectedContinent] : [];

    if (title.length > 35) {
      alert("The title cannot be greater than 35 characters.");
      return;
    }

    if (body.length > 250) {
      alert("The post caption cannot be greater than 250 characters.");
      return;
    }

    try {
      const postData = {
        title,
        body,
        tags,
        media: mediaUrl ? { url: mediaUrl, alt: altText } : undefined,
      };
      const result = await createPost(postData);
      console.log("Post created successfully:", result);
      document.getElementById("createPost").reset();
      updateCaptionFeedback();
      updateTitleFeedback();
      window.location.href = "/html/profile/index.html";
    } catch (error) {
      console.error("Failed to create post:", error);
      errorFeedback.textContent =
        "Failed to create post. Please ensure your image URL is valid, starts with http or https, and that your title and caption do not exceed 280 characters. Please try again.";
      errorFeedback.style.display = "block";
    }
  });
*/
