import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../github/user';
import { UserFollowers } from '../github/user-followers';
import { UserRepos } from '../github/user-repos';
import { UserService } from '../github/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  repos: UserRepos[];
  followers: UserFollowers[];
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let userLogin = this.route.snapshot.paramMap.get('name');

    this.userService.searchUser(userLogin).subscribe(
      (user: User) => {
        this.user = user;
      }
    )

    this.userService.getUserRepoInfo(userLogin).subscribe(
      (repos: UserRepos[]) => {
        this.repos = repos;
      }
    )

    this.userService.getUserFollowersInfo(userLogin).subscribe(
      (followers: UserFollowers[]) => {
        this.followers = followers;
      }
    )
  }

}
