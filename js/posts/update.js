import { NOROFF_API_URL } from "../login-functions.mjs";

import { authFetch } from "../auth.mjs";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
  const createPostURL = await fetch(
    `${NOROFF_API_URL}/social/posts/${postData.id}`
  );

  const response = await authFetch(createPostURL, {
    method: "POST",
    body: JSON.stringify(postData),
  });

  return await response.json();
}
