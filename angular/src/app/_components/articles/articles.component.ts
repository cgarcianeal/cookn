import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../_models/article';
import {ArticleService} from '../../_services/article.service';
import {first} from "rxjs/operators";
import {Notification} from "rxjs";
import {NotificationService} from "../../_services/notification.service";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() collectionName: string;
  src: string;

  public articles: Article[];

  constructor(private articleService: ArticleService,
              private notifService: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadAllArticles();
  }

  loadAllArticles() {
    this.articleService.getAllArticles(this.collectionName).subscribe(
      articles => {
        console.log(articles);
        this.articles = articles;

      },
      error => {
        //this.notifService.showNotif(error, 'error');
      }
    );
  }

  defaultUrl(event) {
    event.target.src = 'assets/images/logo.png';
  }

  delete(collectionName, date) {
    console.log('delete ', date);

    if (!confirm("Delete this article?"))
      return;

    this.articleService.deleteArticle(collectionName, date).pipe(first()).subscribe( res => {
      this.articles = [];
      this.loadAllArticles();
      let del = res ? 1 : 0;
      this.notifService.showNotif('Deleted: ' + del, 'response');
    });
  }

}
