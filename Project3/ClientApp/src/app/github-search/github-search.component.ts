import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubRepoList } from '../github/github-repo-list';
import { GithubUserList } from '../github/github-user-list';
import { RepoService } from '../github/repo.service';
import { UserService } from '../github/user.service';

import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  searchForm = new FormGroup({
    query: new FormControl(''),
  });
  results: GithubUserList;
  repoResult: GithubRepoList;

  faChevronRight = faChevronCircleRight;
  faChevronLeft = faChevronCircleLeft;

  constructor(private userService: UserService, private repoService: RepoService) { }

  error: string;
  userPage = 1;
  repoPage = 1;
  prevUserPageExists: boolean;
  nextUserPageExists: boolean;
  prevRepoPageExists: boolean;
  nextRepoPageExists: boolean;

  ngOnInit() {
  }

  searchGitHub(flag: boolean) {
    if (!this.searchForm.get('query').value || this.searchForm.get('query').value == '')
    {
      document.getElementById('user-grid').style.display = 'none';
      document.getElementById('repo-grid').style.display = 'none';
      this.results = null;
      this.repoResult = null;
    }
    else {
      document.getElementById('user-grid').style.display = 'block';
      document.getElementById('repo-grid').style.display = 'block';

      if (!flag) {
        this.userPage = 1;
        this.loadUsers();
      }
      else {
        this.repoPage = 1;
        this.loadRepos();
      }
    }
  }

  repoClicked() {
    this.searchGitHub(true)
  }

  loadRepos() {
    this.results = null;
    this.repoResult = null;
    document.getElementById('user-grid').style.display = 'none';
    this.prevRepoPageExists = this.repoPage != 1;
    this.repoService.queryRepoList(this.repoPage, this.searchForm.get('query').value)
          .subscribe(
            (result: GithubRepoList) => {
              this.nextRepoPageExists = ((this.repoPage + 1) * 10) < result.total_count;
              this.repoResult = result;
            },
            (error:any) => {
              this.error = error;
            }
          )
  }

  loadUsers() {
    this.repoResult = null;
    this.results = null;
    document.getElementById('repo-grid').style.display = 'none';
    this.prevUserPageExists = this.userPage != 1;
    this.userService.queryUserList(this.userPage, this.searchForm.get('query').value)
          .subscribe(
            (result: GithubUserList) => {
              this.nextUserPageExists = ((this.userPage + 1) * 10) < result.total_count;
              this.results = result;
            }
          )
  }

  prevUsers() {
    this.userPage--;
    this.loadUsers();
  }

  nextUsers() {
    this.userPage++;
    this.loadUsers();
  }

  prevRepos() {
    this.repoPage--;
    this.loadRepos();
  }

  nextRepos() {
    this.repoPage++;
    this.loadRepos();
  }
}
