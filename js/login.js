import { login } from "./login-function.js";

const NOROFF_API_URL = "https://v2.api.noroff.dev";

function isLoggedIn(email) {
  return localStorage.getItem("logged-in-email") === email;
}

//register
function isRegistered(email) {
  return localStorage.getItem(`${email}-registered`) ? true : false;
}

/* //GENERATE API KEY
const generateAPIKey = async (email, accessToken) => {
  const apiKeyResponse = await fetch(`${NOROFF_API_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: "User api key",
    }),
  });
  const apiKeyResponseJson = await apiKeyResponse.json();
  const apiKey = apiKeyResponseJson.data.key;
  localStorage.setItem(`${email}-api-key`, apiKey); // Store the API key
  return apiKey;
}; */

//SIGN IN BUTTON
document.getElementById("signIn").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;
  login(email, password).then((loggedIn) => {
    if (loggedIn) {
      window.location.href = "/html/profile/index.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
});

//IF USER IS ALREADY LOGGED IN, CAN GET RIGHT AWAY IN THE PROFILE.HTML WITHOUT LOGING IN AGAIN
window.addEventListener("load", () => {
  if (localStorage.getItem("logged-in-email")) {
    window.location.href = "/html/profile/index.html";
  }
});
