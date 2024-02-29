//-- storeToken
export { storeToken };
//-- getToken is for every page for API authentication requests
export { getToken };
//-- Used when user click logg out
export { clearToken };
//Redirect function - If user is not logged in

//apiKey

export const apiKey = "e02ddd5e-3f4a-4e42-8255-82c75a8d4327";
localStorage.setItem("apiKey", apiKey);

//export const accessToken = localStorage.getItem("access-token");

//-------- JWT Token --------//

function storeToken(token) {
  localStorage.setItem("access-token", token);
}

function getToken() {
  return localStorage.getItem("access-token");
}

function clearToken() {
  localStorage.removeItem("access-token");
}
