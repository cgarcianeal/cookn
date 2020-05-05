import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../_services/article.service';
import {Article} from '../../_models/article';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.css']
})
export class FullArticleComponent implements OnInit {

  private article;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let collection = this.route.snapshot.paramMap.get('collection');

    this.articleService.findArticle(collection, id).subscribe(
      article => {
        console.log(article)
        this.article = article;
      },
      error => {
        //this.notifService.showNotif(error, 'error');
      }
    );
  }

  getArticleTime(UNIX_Timestamp: number) {
    let date = new Date(UNIX_Timestamp);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    let calenderDate = [year, month, day].join('-');

    let hour = date.getHours();
    let min = date.getMinutes();

    let time = [hour, min].join(':');

    return [calenderDate, time].join(' at ');
  }
}
