const NOROFF_API_URL = "https://v2.api.noroff.dev/docs/v2/social/posts";

// const user_post = document.querySelector

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
