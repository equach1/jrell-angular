import { RepoCommits } from "./repo-commits";
import { RepoIssues } from "./repo-issues";

export class Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  clone_url: string;
  commits_url: RepoCommits[];
  issues_url: RepoIssues[];
}
