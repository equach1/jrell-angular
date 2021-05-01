import { Component, Input, OnInit } from '@angular/core';
import { GithubUserList } from '../github/github-user-list';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() userList: GithubUserList;

  constructor() { }

  ngOnInit() {
  }

}
