const NOROFF_API_URL = "https://v2.api.noroff.dev";

// function to creat a post-- creat a new file post.js and exclude it from this js file
async function createPost(title, body, apiKey, accessToken) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  };

  const response = await fetch(`${NOROFF_API_URL}/social/posts`, options);
  const responseJson = await response.json();
  console.log("created post ", { createdPost: responseJson });
  return responseJson;
}

async function listPosts(apiKey, accessToken) {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  const response = await fetch(`${NOROFF_API_URL}/social/posts`, options);
  const responseJson = await response.json();
  console.log("all posts ", { allPosts: responseJson });
  return responseJson;
}
