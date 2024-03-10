export const NOROFF_API_URL = "https://v2.api.noroff.dev";

// LOGIN FUNCTION

export async function login(email, password) {
  if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
    return false;
  }
  //if (!isRegistered(email)) {
  //  return false;
 // }
  if (isLoggedIn(email)) {
    return true;
  }
  const loginResponse = await fetch(`${NOROFF_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!loginResponse.ok) {
    return false;
  }
  const loginResponseJson = await loginResponse.json();
  const { accessToken, ...profile } = loginResponseJson.data;

  // Extract the username from the profile information
  const loggedInUsername = profile.name; // Assuming 'profile.name' contains the username

  localStorage.setItem("profile", JSON.stringify(profile));
  localStorage.setItem("access-token", accessToken);

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
  localStorage.setItem("api-key", apiKey);
  localStorage.setItem("logged-in-email", email);

  // Set the username in localStorage
  localStorage.setItem("userName", loggedInUsername);

  return true;
}

function isLoggedIn(email) {
  return localStorage.getItem("logged-in-email") === email;
}
/*
//register
function isRegistered(email) {
  return localStorage.getItem(`${email}-registered`) ? true : false;
}*/
