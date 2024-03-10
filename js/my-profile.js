import { fetchUserProfile, fetchPostsByUserName } from "../js/modules/api.js";
export { displayUserProfile };

export const MAX_TEXT_LENGTH = 20; // Maximum number of characters to display

// Function to generate HTML structure for a post card
function createPostCard(post, userName) {
  const postCard = document.createElement("div");
  postCard.classList.add("col-md-5", "col-sm-6", "m-2");
  postCard.addEventListener("click", () => {
    window.location.href = `/html/post/index.html?id=${post.id}&title=${post.title.rendered}`;
  });

  const cardInner = document.createElement("div");
  cardInner.classList.add("card", "card-body", "mx-auto", "card-custom");
  postCard.appendChild(cardInner);
  cardInner.style.cursor = "pointer";

  if (post.media && post.media.url) {
    const image = document.createElement("img");
    image.setAttribute("src", post.media.url);
    image.setAttribute("alt", post.media.alt);
    image.classList.add("card-img-top");
    cardInner.appendChild(image);
  } else {
    // Display a default image
    const defaultImage = document.createElement("img");
    defaultImage.setAttribute("src", "/images/default-image.jpg"); 
    defaultImage.setAttribute("alt", "Default Image");
    defaultImage.classList.add("card-img-top");
    cardInner.appendChild(defaultImage);
  }

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardInner.appendChild(cardBody);

  const topContainer = document.createElement("div");
  topContainer.classList.add("d-flex", "top-container");
  cardBody.appendChild(topContainer);

  // Display the username
  const userNameElement = document.createElement("h1");
  userNameElement.classList.add("username");
  userNameElement.textContent = ` ${userName}`;
  topContainer.appendChild(userNameElement);

  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("d-flex", "reactions-container");
  topContainer.appendChild(reactionsContainer);

  const likeButton = document.createElement("button");
  likeButton.classList.add("btn", "btn-sm", "btn-primary", "m-1");
  likeButton.innerHTML = '<i class="fas fa-heart"></i>';
  likeButton.setAttribute("aria-label", "Like");
  reactionsContainer.appendChild(likeButton);

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-sm", "btn-outline-primary", "m-1");
  commentButton.innerHTML = '<i class="far fa-comment"></i>';
  commentButton.setAttribute("aria-label", "Comment");
  reactionsContainer.appendChild(commentButton);

  const postTitle = document.createElement("h2");
  postTitle.classList.add("card-title", "mr-auto");
  const truncatedTitle =
    post.title.length > MAX_TEXT_LENGTH
      ? post.title.substring(0, MAX_TEXT_LENGTH) + "..."
      : post.title;
  postTitle.innerHTML = truncatedTitle || "No Title";
  cardBody.appendChild(postTitle);

  const postText = document.createElement("p");
  postText.classList.add("card-text");
  const truncatedText =
    post.body.length > MAX_TEXT_LENGTH
      ? post.body.substring(0, MAX_TEXT_LENGTH) + "..."
      : post.body;
  postText.innerHTML = truncatedText || "No Body"; 
  cardBody.appendChild(postText);

  const timestamp = document.createElement("h3");
  const createdDate = new Date(post.created);
  const formattedDate = createdDate.toLocaleDateString();
  const formattedTime = createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  timestamp.innerHTML = `${formattedDate} ${formattedTime}` || "No Timestamp";
  cardBody.appendChild(timestamp);

  return postCard;
}

// Function to display user's posts
async function displayUserPosts(userPosts, userName) {
  try {
    const postsContainer = document.getElementById("userPosts");
    postsContainer.innerHTML = ""; // Clear previous posts

    userPosts.forEach((post) => {
      const postCard = createPostCard(post, userName);
      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error displaying user posts:", error);
  }
}

async function displayUserProfile() {
  try {
    // Retrieve the user's profile
    const loggedInUser = JSON.parse(localStorage.getItem("profile"));
    const userName = loggedInUser.name;
    const userProfile = await fetchUserProfile(userName);

    // Display user's username
    const userNameElement = document.getElementById("userName");
    userNameElement.textContent = userName;

    // Add click event listener to navigate to your profile if clicked
    userNameElement.addEventListener("click", function () {
      window.location.href = "/html/my-profile/index.html";
    });
    userNameElement.style.cursor = "pointer";

    // Display user's avatar if available
    const profileImage = document.getElementById("profileImage");
    if (userProfile.avatar && userProfile.avatar.url) {
      profileImage.src = userProfile.avatar.url;
      profileImage.alt = userProfile.avatar.alt;
    } else {
      // Set a default image if avatar is not available
      profileImage.src = "/images/kompis.JPG";
      profileImage.alt = "Default Avatar";
    }

    // Display user's bio
    const userBio = document.getElementById("userBio");
    userBio.textContent = userProfile.bio;

    // Display user's followers, following, and posts counts
    const followersCount = userProfile._count.followers;
    const followingCount = userProfile._count.following;
    const postsCount = userProfile._count.posts;
    document.getElementById("followersCount").textContent = followersCount;
    document.getElementById("followingCount").textContent = followingCount;
    document.getElementById("postsCount").textContent = postsCount;

    // Retrieve and display user's posts
    const userPosts = await fetchPostsByUserName(userName);
    displayUserPosts(userPosts, userName);
  } catch (error) {
    console.error("Error fetching and displaying user profile:", error);
  }
}

// Call the function to display user profile after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  displayUserProfile();
});
