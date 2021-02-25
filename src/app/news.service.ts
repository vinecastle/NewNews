import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from './article'
import { NewsResponse } from './newsResponse'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=af54217bbe2d4f9796ad443aa5f6ac0a'; // URL to web api

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http
      .get<NewsResponse>(this.newsUrl)
      .pipe(map(data => data.articles), catchError(this.handleError));
  }

  getArticle(id: string): Observable<Article> {
    return this.getNews().pipe(
      map(articles => articles.find(article => article.source.id === id))
    );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
