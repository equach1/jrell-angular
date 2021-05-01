import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GithubRepoList } from './github-repo-list';
import { catchError } from 'rxjs/operators';
import { Repo } from './repo';
import { RepoCommits } from './repo-commits';
import { RepoIssues } from './repo-issues';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  private baseApiUrl: string = "https://api.github.com/";

  constructor(private httpClient: HttpClient) { }

  searchRepo(query: string, owner: string):Observable<Repo> {
    return this.httpClient.get<Repo>(`${this.baseApiUrl}repos/${owner}/${query}`)
  }

  queryRepoList(page: number, query: string): Observable<GithubRepoList> {
    return this.httpClient.get<GithubRepoList>(`${this.baseApiUrl}search/repositories?q=${query}&page=${page}&per_page=10`)
    .pipe(catchError(this.handleError));
  }

  getRepoCommits(query: string, owner: string): Observable<RepoCommits[]> {
    return this.httpClient.get<RepoCommits[]>(`${this.baseApiUrl}repos/${owner}/${query}/commits`)
  }

  getRepoIssues(query: string, owner: string): Observable<RepoIssues[]> {
    return this.httpClient.get<RepoIssues[]>(`${this.baseApiUrl}repos/${owner}/${query}/issues`)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, please try again later.');
  };

}
