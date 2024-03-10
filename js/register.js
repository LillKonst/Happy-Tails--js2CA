import { login } from "./login-function.js";

const NOROFF_API_URL = "https://v2.api.noroff.dev";

//REGISTER BUTTON
document
  .getElementById("register")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    register(name, email, password).then((registered) => {
      if (registered) {
        login(email, password).then((loggedIn) => {
          if (loggedIn) {
            window.location.href = "/html/my-profile/index.html";
          } else {
            alert("Invalid email or password. Please try again.");
          }
        });
      } else {
        alert("Invalid email or password. Please try again.");
      }
    });
  });

// REGISTER FUNCTION
async function register(name, email, password) {
  if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
    return false;
  }
  if (isRegistered(email)) {
    console.log("Already registered");
    return true;
  }
  const response = await fetch(`${NOROFF_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  if (response.status === 400) {
    const responseJson = await response.json();
    if (responseJson.errors[0].message === "Profile already exists") {
      localStorage.setItem(`${email}-registered`, true);
      return true;
    }
  }
  if (!response.ok) {
    return false;
  }

  localStorage.setItem("userName", name);
  localStorage.setItem(`${email}-registered`, true);

  return true;
}

function isRegistered(email) {
  return localStorage.getItem(`${email}-registered`) ? true : false;
}
