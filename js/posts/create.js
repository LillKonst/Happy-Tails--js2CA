import { NOROFF_API_URL } from "../login-function.js";

const accessToken = localStorage.getItem(`access-token`);
const apiKey = localStorage.getItem(`api-key`)

//API call
async function createPost(postData) {
    console.log(JSON.stringify(postData));
    const response = await fetch(`${NOROFF_API_URL}/social/posts`,  {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${accessToken}`,
             "X-Noroff-API-Key": apiKey,
          },
          body: JSON.stringify(postData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Request Failed:', JSON.stringify(errorData)); 
        throw new Error(`Failed to create post: ${errorData.message}`);
    }
      const result = await response.json();
      return result.data;
    }
    //addEventlistener for modal input 
    document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById("createPostForm").addEventListener("submit", async function (event) {
            event.preventDefault();
    
            const createPostForm = document.getElementById("createPostForm");

            // Extract data from the form
            const title = document.getElementById("post_title").value;
            const body = document.getElementById("post_body").value;
            const imageInput = document.getElementById("image_input").value; 

    
           //store the values from the inputs
            const postData = {
                title: title,
                body: body,
                media: {
                    url: imageInput,
                }
            };
            //calls the createPost to create
            try {
                const data = await createPost(postData);
                    window.location.reload();
                alert("Post created successfully!");
            
            } catch (error) {
                console.error(error);
                //
            }
        });
    });