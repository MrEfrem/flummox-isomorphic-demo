import { Actions } from 'flummox';

export default class StargazerActions extends Actions {

  async getStargazersByRepo(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/stargazers`);
    const text = await response.json();

    return {
      owner,
      repo,
      stargazers: text
    };
  }

}
