import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../_models/user";
import {NavigationEnd, Router} from "@angular/router";
import {ArticleService} from "../../_services/article.service";
import {AuthService} from "../../_services/auth.service";
import {first} from "rxjs/operators";
import {NotificationService} from "../../_services/notification.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private user;
  private articles = [];

  constructor(private userService: UserService,
              private router: Router,
              private articleService: ArticleService,
              private authService: AuthService,
              private notifService: NotificationService){
    router.events.subscribe((val) => {
      // see also

      if (val instanceof NavigationEnd) {
        this.loadUser();
      }
    });
  }

  ngOnInit() {
  }

  loadUser() {
    let username = this.router.url.split('/')[2];

    this.userService.getUser(username).subscribe(
      user => {
        console.log(user);
        this.user = user[0];

        this.articleService.getUserArticles(this.user._id).subscribe(
          articles => {
            console.log(articles);
            this.articles = articles;
          }
        )
      },
      error => {
        //this.notifService.showNotif(error, 'error');
      }
    )
  }

  delete(collectionName, date) {
    console.log('delete ', date);

    if (!confirm("Delete this article?"))
      return;

    this.articleService.deleteArticle(collectionName, date).pipe(first()).subscribe( res => {
      this.articles = [];
      this.loadUser();
      let del = res ? 1 : 0;
      this.notifService.showNotif('Deleted: ' + del, 'response');
    });
  }

}
