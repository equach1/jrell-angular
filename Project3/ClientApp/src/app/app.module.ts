import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GithubSearchComponent } from './github-search/github-search.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoComponent } from './repo/repo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { AuthInterceptor } from './login/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GithubSearchComponent,
    UserComponent,
    UserListComponent,
    RepoListComponent,
    RepoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: GithubSearchComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'userdetail/:name', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'repodetail/:name/:repo', component: RepoComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },


    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
