import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GithubUserList } from './github-user-list';
import { User } from './user';
import { UserFollowers } from './user-followers';
import { UserRepos } from './user-repos';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl: string = "https://api.github.com/";

  constructor(private httpClient: HttpClient) {}

  searchUser(query: string):Observable<User> {
    return this.httpClient.get<User>(`${this.baseApiUrl}users/${query}`)
  }

  queryUserList(page: number, query: string): Observable<GithubUserList> {
    return this.httpClient.get<GithubUserList>(`${this.baseApiUrl}search/users?q=${query}&per_page=10&page=${page}`)
  }

  getUserRepoInfo(user: string): Observable<UserRepos[]> {
    return this.httpClient.get<UserRepos[]>(`${this.baseApiUrl}users/${user}/repos`)
  }

  getUserFollowersInfo(user: string): Observable<UserFollowers[]> {
    return this.httpClient.get<UserFollowers[]>(`${this.baseApiUrl}users/${user}/followers`)
  }
}
