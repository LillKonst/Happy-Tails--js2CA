const profileFilter = "_following=true&_followers=true&_posts=true";

export default {
  // - all profiles
  all: (limit = 100, page = 1) =>
    `/social/profiles?${profileFilter}&limit=${limit}&page=${page}`,

  // - specific profile by name - if not name is provided, it will return null
  byName: (name) => (name ? `/social/profiles/${name}?${profileFilter}` : null),

  // - change img of a specific profile by name
  changeImg: (name) => `/social/profiles/${name}`,

  // - follow or unfollow a specific profile by name
  toggleFollow: (name, followType) => `/social/profiles/${name}/${followType}`,

  // - search for profiles by their name or Bio
  search: (query) => `/social/profiles/search?q=${query}`,
};
