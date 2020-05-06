import { Injectable } from '@angular/core';
import {Article} from '../_models/article';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }


  createArticle(article) {
    return this.http.post(`http://localhost:3030/article/addarticle`, article);
  }

  getAllArticles(collectionName) {
    return this.http.get<Article[]>(`http://localhost:3030/article/${collectionName}/getarticles`);
  }

  findArticle(collectionName, id) {
    return this.http.get(`http://localhost:3030/article/${collectionName}/findarticle/${id}`);
  }

  editArticle(collectionName, id, article) {
    return this.http.post(`http://localhost:3030/article/edit/${collectionName}/${id}`, article);
  }

  deleteArticle(collectionName, date) {
    return this.http.delete(`http://localhost:3030/article/${collectionName}/${date}`);
  }

  getUserArticles(username) {
    return this.http.get<Article[]>(`http://localhost:3030/article/getuserarticles/${username}`);
  }

}
