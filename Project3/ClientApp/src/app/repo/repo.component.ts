import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repo } from '../github/repo';
import { RepoCommits } from '../github/repo-commits';
import { RepoIssues } from '../github/repo-issues';
import { RepoService } from '../github/repo.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  repo: Repo;
  repoCommits: RepoCommits[];
  repoIssues: RepoIssues[];

  constructor(private route: ActivatedRoute, private repoService: RepoService) { }

  ngOnInit() {
    let owner = this.route.snapshot.paramMap.get('name');
    let repo = this.route.snapshot.paramMap.get('repo');

    this.repoService.searchRepo(repo, owner).subscribe(
      (repo: Repo) => {
        this.repo = repo;
      }
    )

    this.repoService.getRepoCommits(repo, owner).subscribe(
      (repoCommits: RepoCommits[]) => {
        this.repoCommits = repoCommits;
      }
    )

    this.repoService.getRepoIssues(repo, owner).subscribe(
      (repoIssues: RepoIssues[]) => {
        this.repoIssues = repoIssues;
      }
    )

  }

}
