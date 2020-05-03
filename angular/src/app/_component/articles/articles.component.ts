import { Component, OnInit } from '@angular/core';
import {Article} from '../../_models/article';
import {ArticleService} from '../../_services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadAllArticles();
  }

  loadAllArticles() {
    this.articleService.getAllArticles().subscribe(
      articles => {
        this.articles = articles;

      },
      error => {
        //this.notifService.showNotif(error, 'error');
      }
    );
  }


}
