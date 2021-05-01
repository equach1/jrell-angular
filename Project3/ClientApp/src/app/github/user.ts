import { UserFollowers } from "./user-followers";
import { UserRepos } from "./user-repos";

export class User {
  avatar_url: string;
  login: string;
  name: string;
  blog: string;
  location: string;
  html_url: string;
  repos_url: UserRepos[];
  followers_url: UserFollowers[];
}
