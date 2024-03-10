import {
  fetchUserProfile,
  fetchPostsByUserName,
  followUser,
  unfollowUser,
} from "../js/modules/api.js";
export { displayUserProfile };

export const MAX_TEXT_LENGTH = 20; // Maximum number of characters to display

// Function to generate HTML structure for a post card
function createPostCard(post, userName) {
  const postCard = document.createElement("div");
  postCard.classList.add("col-md-5", "col-sm-10", "m-2");
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
  const userNameElement = document.createElement("p");
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
    postsContainer.innerHTML = "";

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
    // Retrieve the username from the URL or local storage
    let userName;
    const params = new URLSearchParams(window.location.search);
    userName = params.get("username");
    console.log("Username:", userName); // Debugging

    // Fetch user profile data
    const userProfile = await fetchUserProfile(userName);
    console.log("User profile:", userProfile); // Debugging

    // Display user's profile details
    const userNameElement = document.getElementById("userName");
    userNameElement.textContent = userProfile.name;

    const profileImage = document.getElementById("profileImage");
    profileImage.src = userProfile.avatar.url;
    profileImage.alt = userProfile.avatar.alt;

    // Display user's bio, followers, following, and posts counts
    const userBio = document.getElementById("userBio");
    userBio.textContent = userProfile.bio || "No bio available";

    document.getElementById("followersCount").textContent =
      userProfile._count.followers;
    document.getElementById("followingCount").textContent =
      userProfile._count.following;
    document.getElementById("postsCount").textContent =
      userProfile._count.posts;

    // Check if the current user is already following the displayed user
    const isFollowing = await checkIfFollowing(userName);

    // Display follow/unfollow button based on the follow status
    const followButton = document.getElementById("followOrUnfollow");
    followButton.textContent = isFollowing ? "Unfollow" : "Follow";
    followButton.addEventListener("click", async () => {
      if (isFollowing) {
        await unfollowUser(userName);
        followButton.textContent = "Follow";
      } else {
        await followUser(userName);
        followButton.textContent = "Unfollow";
      }
    });

    // Retrieve and display user's posts
    const userPosts = await fetchPostsByUserName(userName);
    displayUserPosts(userPosts, userName);
  } catch (error) {
    console.error("Error fetching and displaying user profile:", error);
  }
}

async function checkIfFollowing(displayedUserName) {
  try {
    // Fetch the current user's profile
    const currentUserProfile = await fetchUserProfile();
    const followedUsers = currentUserProfile.following || [];
    return followedUsers.includes(displayedUserName);
  } catch (error) {
    console.error("Error checking if following:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayUserProfile();
});
