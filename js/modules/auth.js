export { storeToken };
export { getToken };
export { clearToken };

//apiKey
export const apiKey = "e02ddd5e-3f4a-4e42-8255-82c75a8d4327";
localStorage.setItem("apiKey", apiKey);

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
