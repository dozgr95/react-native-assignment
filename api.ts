export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

const ACCESS_TOKEN = "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"; // "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";

const GITHUB_USER_API = "https://api.github.com/search/users";

export const getGithubUsers = async (searchInput: string) => {
  const queryUrl = `${GITHUB_USER_API}?q=${searchInput} in:user&per_page=12`;
  const githubUserResponse = await fetch(queryUrl, {
    method: "GET",
    headers: {
      Authorization: `token ${ACCESS_TOKEN}`,
    },
  });
  const convertedResponse = await githubUserResponse.json();

  if (convertedResponse?.items === undefined && convertedResponse.message) {
    throw convertedResponse.message;
  }

  const users = convertedResponse.items.map((item: any) => {
    const { login, id, avatar_url, html_url } = item;
    return { login, id, avatar_url, html_url };
  });

  return users;
};
