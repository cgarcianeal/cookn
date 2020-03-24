import { Injectable } from '@angular/core';
import {Article} from '../_models/article';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles: Article[];

  constructor() {
    this.articles = [
      {
        id: '0',
        title: 'First Article',
        description: 'Amazing First article is great',
        dateCreated: Date.now() - 4,
        createdBy: 'admin',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: '0',
        title: 'Second Article',
        description: 'Amazing Second article is great',
        dateCreated: Date.now() - 2,
        createdBy: 'admin',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: '0',
        title: 'Third Article',
        description: 'Amazing Third article is great',
        dateCreated: Date.now(),
        createdBy: 'admin',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },

    ];
  }

  getAllArticles(): Observable<Article[]> {
    return new Observable<Article[]>(subscriber => {
      if (this.articles.length > 0) {
        setTimeout(() => {
          subscriber.next(this.articles);
        }, 1000);
      } else {
        setTimeout(() => {
          subscriber.error('No courses in the Articles.');
        }, 1000);
      }
    });
  }


}
