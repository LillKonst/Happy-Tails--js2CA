/*
function postoptions(postData) {
  
  const editBtn = document.querySelector(".edit-btn");  // Assuming edit-btn is a class
  const deleteBtn = document.querySelector(".delete-btn");  // Assuming delete-btn is a class

  if (postAuthor) {
    editBtn.classList.remove("d-none");
    deleteBtn.classList.remove("d-none");

    editBtn.addEventListener("click", () => openEditModal(postData));
    // Assuming "saveChanges" is a button inside the modal for saving changes
    document.getElementById("saveChanges").addEventListener("click", () => saveChanges(postData.id));
    deleteBtn.addEventListener("click", () => deletePost(postData.id));
  } else {
    editBtn.classList.add("d-none");
    deleteBtn.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Assuming you have a way to retrieve the current post data
  const currentPostData = getCurrentPostData();  // Replace with actual implementation
  postoptions(currentPostData);
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

displayImage();*/





/////////////////////////////////////////////////////////////////////////////////////////////

export function displayImage() {
    const imageUrl = document.getElementById("image_input").value;
    const imageDisplay = document.getElementById("image-display");

    // Set the background image of the div
    imageDisplay.style.backgroundImage = `url('${imageUrl}')`;
}

//edit post

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
                url: imageInput,
                alt: altText
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