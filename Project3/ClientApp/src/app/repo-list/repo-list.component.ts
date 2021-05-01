import { Component, Input, OnInit } from '@angular/core';
import { GithubRepoList } from '../github/github-repo-list';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {

  @Input() repoList: GithubRepoList;

  constructor() { }

  ngOnInit() {
  }

  next() {
    
  }

}
