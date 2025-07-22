export type GithubRepositoryInstance = {
  user: string,
  repository: string,
  directory: string,
}

export const githubRepository = (
  instance: GithubRepositoryInstance,
): string => {
  const { user, repository, directory } = instance;
  return `degit --force ${user}/${repository} ${directory}`;
};
