import { login } from "./login-function.js";

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
    window.location.href = "/html/my-profile/index.html";
  }
});
