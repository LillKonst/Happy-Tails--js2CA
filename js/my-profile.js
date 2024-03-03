import { fetchUserProfile, fetchPostsByUserName } from "../js/modules/api.js";
export { displayUserProfile };

// Function to generate HTML structure for a post card
function createPostCard(post, userName) {
  const postCard = document.createElement("div");
  postCard.classList.add("col-md-5", "m-2");
  postCard.addEventListener("click", () => {
    window.location.href = `/html/post/post-specific.html?id=${post.id}&title=${post.title.rendered}`;
  });

  const cardInner = document.createElement("div");
  cardInner.classList.add(
    "card",
    "card-body",
    "text-center",
    "mx-auto",
    "shadow-sm"
  );
  postCard.appendChild(cardInner);

  if (post.media && post.media.url) {
    const image = document.createElement("img");
    image.setAttribute("src", post.media.url);
    image.setAttribute("alt", post.media.alt);
    image.classList.add("card-img-top");
    cardInner.appendChild(image);
  } else {
    const noMediaStyle = document.createElement("div");
    noMediaStyle.classList.add("no-media");
    cardInner.appendChild(noMediaStyle);
  }

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardInner.appendChild(cardBody);

  // Display the username
  const userNameElement = document.createElement("h1");
  userNameElement.classList.add("card-text");
  userNameElement.textContent = ` ${userName}`;
  cardBody.appendChild(userNameElement);

  // Add edit icon
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square", "ms-2");
  userNameElement.appendChild(editIcon);

  // Add delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "ms-2");
  userNameElement.appendChild(deleteIcon);

  const postTitle = document.createElement("h3");
  postTitle.classList.add("card-title");
  postTitle.textContent = post.title || "No Title";
  cardBody.appendChild(postTitle);

  const postText = document.createElement("p");
  postText.classList.add("card-text");
  postText.textContent = post.body || "No Body";
  cardBody.appendChild(postText);

  const timestamp = document.createElement("h4");
  timestamp.textContent = post.created || "No Timestamp";
  cardBody.appendChild(timestamp);

  // Add like button
  const likeButton = document.createElement("button");
  likeButton.classList.add("btn", "btn-sm", "btn-primary", "mr-1");
  likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
  cardBody.appendChild(likeButton);

  // Add comment button
  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-sm", "btn-outline-primary");
  commentButton.innerHTML = '<i class="fa-regular fa-comment"></i>';
  cardBody.appendChild(commentButton);

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
