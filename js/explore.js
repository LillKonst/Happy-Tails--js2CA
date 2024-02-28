/*
//Get all posts

import header from "../folder/headers.js";
import Auth from "../index.js"; 


export default async function getPosts() {
    const method = "GET";
    const headers = headers.authWithoutContent();
    const endpoint = `/social/posts?_author=true`;

    const getPosts = new Auth(method, headers, endpoint);
    const posts = await getPosts.fetch(); 
    return posts; 
}

*/

import { getAllPosts } from "../js/api.js";

//import { getPostsFromFollowing } from "../js/api.js";

//import { getPostSpeciic } from "../js/api.js"; 

document.getElementById("explore-container");

async function displayAllPosts() {
    try {
    const posts = await getAllPosts();
    const exploreContainer = document.getElementById("explore-container");
    exploreContainer.innerHTML = "";

    
    for(let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postCard = document.createElement("div");
            postCard.classList.add("col-md-5", "my-3", "mx-1");
            exploreContainer.appendChild(postCard);

            const cardInner = document.createElement("div");
            cardInner.classList.add("card", "card-body", "text-center", "mx-auto");
            cardInner.style.width = "15rem";
            postCard.appendChild(cardInner);

            // Check if post.media exists before accessing its properties
            if (post.media && post.media.url) {
                const image = document.createElement("img");
                image.setAttribute("src", post.media.url);
                image.setAttribute("alt", post.media.alt);
                image.classList.add("card-img-top");
                cardInner.appendChild(image);
            } else {
                // Display the post without an image
                const noMediaStyle = document.createElement("div");
                noMediaStyle.classList.add("no-media");
                cardInner.appendChild(noMediaStyle);
            }

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardInner.appendChild(cardBody);

            const titleContainer = document.createElement("div");
            titleContainer.classList.add("d-flex");
            cardBody.appendChild(titleContainer);

            const postTitle = document.createElement("h3");
            postTitle.classList.add("card-title", "mr-auto");
            postTitle.innerHTML = post.title || "No Title"; // Assuming title is the property that contains the post title
            titleContainer.appendChild(postTitle);

            const likeButton = document.createElement("button");
            likeButton.classList.add("btn", "btn-sm", "btn-primary", "mr-1");
            likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
            titleContainer.appendChild(likeButton);

            const commentButton = document.createElement("button");
            commentButton.classList.add("btn", "btn-sm", "btn-outline-primary");
            commentButton.innerHTML = '<i class="fa-regular fa-comment"></i>';
            titleContainer.appendChild(commentButton);

            const postText = document.createElement("p");
            postText.classList.add("card-text");
            postText.innerHTML = post.body || "No Body"; // Assuming body is the property that contains the post text
            cardBody.appendChild(postText);

            const timestamp = document.createElement("h4");
            timestamp.innerHTML = post.created || "No Timestamp"; // Assuming created is the property that contains the timestamp
            cardBody.appendChild(timestamp);
        }   
    
    } catch (error) {
        console.error(error);
    }
}
    
document.addEventListener("DOMContentLoaded", () => {
    displayAllPosts();
});