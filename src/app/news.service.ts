import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from './article'
import { NewsResponse } from './newsResponse'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  static id = 0
  private topHeadlinesUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=af54217bbe2d4f9796ad443aa5f6ac0a'; // URL to web api
  private baseQueryUrl = 'https://newsapi.org/v2/everything?apiKey=af54217bbe2d4f9796ad443aa5f6ac0a'; // URL to web api

  constructor(private http: HttpClient) { }

  // parameters are optional and can be used to search article
  getNews(title?: string, source?: string, publishedFrom?: string, publishedTo?: string) {

    // build url
    let params = new HttpParams();
    if (title)
      params = params.set('qInTitle', title);
    if (source)
      params = params.set('sources', source);
    if (publishedFrom)
      params = params.set('from', publishedFrom);
    if (publishedTo)
      params = params.set('to', publishedTo);

    let URL = this.baseQueryUrl + '&' + params.toString();
    // if no article is searched, show top headlines
    if (params.toString().length == 0)
      URL = this.topHeadlinesUrl

    //console.log(URL)

    // fetch
    return this.http
      .get<NewsResponse>(URL)
      .pipe(
        map(data => data.articles),
        catchError(this.handleError),
        map(articles => {
          return articles
        }),
      );
  }

  // calls api again and returns article with the same url
  // note: this only works if the article is still in the first
  //       20 news articles with the SAME url (topHeadlinesUrl)
  // TODO: find solution to get article even if it is a differen base url
  //       (storing the article on FireStore with the url as key?)
  getArticle(url: string): Observable<Article> {
    return this.getNews().pipe(
      map(articles => articles.find(article => article.url === url))
    );
  }

  searchNews(term: string) {
    const url = 'https://newsapi.org/v2/everything?q=' + term.trim() + '&apiKey=af54217bbe2d4f9796ad443aa5f6ac0a';
    return this.http
      .get<NewsResponse>(url)
      .pipe(
        map(data => data.articles),
        catchError(this.handleError),
        map(articles => {
          return articles
        }),
      );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
