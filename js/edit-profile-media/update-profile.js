function updateProfile() {
  var avatarUrl = document.getElementById("avatarUrl").value;
  var avatarAlt = document.getElementById("avatarAlt").value;
  var bio = document.getElementById("bioText").value;

  if (!avatarUrl) {
    alert("Please provide a valid avatar URL.");
    return;
  }

  if (avatarAlt.length > 120) {
    alert("Avatar alt text must be less than 120 characters.");
    return;
  }

  if (bio.length > 160) {
    alert("Bio must be less than 160 characters.");
    return;
  }

  // If all validations pass, construct data object
  var data = {
    bio: bio,
    avatar: {
      url: avatarUrl,
      alt: avatarAlt,
    },
  };

  fetch("https://v2.api.noroff.dev/social/profiles/<name>", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Handle success response
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
