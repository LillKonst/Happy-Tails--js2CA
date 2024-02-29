export default function profileList(profiles, user, container, number = 5) {
  let numbersArray = [];
  while (numbersArray.length < number) {
    let randomNum = Math.floor(Math.random() * profiles.length);
    let profile = profiles[randomNum];
    if (!numbersArray.includes(randomNum)) {
      if (user.name !== profile.name) {
        if (
          !profile.followers.some((follower) => follower.name === user.name)
        ) {
          if (
            profile.avatar.url !==
              "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" &&
            profile.avatar.url !== "https://via.placeholder.com/150"
          )
            numbersArray.push(randomNum);
        }
      }
    }
  }

  numbersArray.forEach((num) => {
    const profile = profiles[num];
    container.appendChild(singleProfile(profile));
  });

  console.log(container);
}

function singleProfile(profile) {
  const profileContainer = document.createElement("div");
  profileContainer.setAttribute(
    "class",
    "flex items-center justify-between border-b px-8 2xl:px-10 hover:bg-gray-100 gap-4"
  );
  const innerDiv = document.createElement("div");
  innerDiv.setAttribute(
    "class",
    "flex justify-between items-center lg:gap-6 2xl:gap-12 py-5"
  );

  const img = document.createElement("img");
  img.setAttribute(
    "class",
    "rounded-full w-12 h-12 2xl:w-14 2xl:h-14 object-cover"
  );
  img.setAttribute("src", profile.avatar.url);
  img.setAttribute("alt", "");

  const span = document.createElement("span");

  const h4 = document.createElement("h4");
  h4.setAttribute("class", "font-medium");
  h4.textContent = profile.name;

  const anchorTag = document.createElement("a");
  anchorTag.setAttribute(
    "class",
    "muted text-sm 2xl:text-base font-medium text-secondary"
  );
  anchorTag.textContent = "View profile";

  anchorTag.href = `/profile/?name=${profile.name}`;

  span.append(h4, anchorTag);
  innerDiv.append(img, span);

  const button = document.createElement("button");
  button.setAttribute(
    "class",
    "flex items-center gap-3 p-2 px-5 2xl:px-6 rounded border border-primary hover:bg-light hover:border-light text-sm 2xl:text-base"
  );
  button.textContent = "Follow";

  profileContainer.appendChild(innerDiv);
  profileContainer.appendChild(button);

  return profileContainer;
}
