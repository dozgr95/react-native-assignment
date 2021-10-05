export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

const ACCESS_TOKEN = "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";
const GITHUB_USER_API = "https://api.github.com/search/users";

export const getGithubUsers = async (searchInput: string) => {
  const queryUrl = `${GITHUB_USER_API}?q=${searchInput} in:user&per_page=12`;
  const githubUserResponse = await fetch(queryUrl, {
    method: "GET",
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  });
  const users = await githubUserResponse.json();

  return users.items.map((item: any) => {
    const { login, id, avatar_url, html_url } = item;
    return { login, id, avatar_url, html_url };
  });
};
