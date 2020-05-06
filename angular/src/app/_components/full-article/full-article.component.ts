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
  private collection: string;
  private ingredients = [];

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.collection = this.route.snapshot.paramMap.get('collection');

    this.articleService.findArticle(this.collection, id).subscribe(
      article => {
        console.log(article);
        this.article = article;
        Object.keys(this.article.ingredients).forEach(key => this.ingredients.push([key, this.article.ingredients[key]]));
      },
      error => {
        //this.notifService.showNotif(error, 'error');
      }
    );
  }

}
