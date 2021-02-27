import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../article';
import { NewsService } from '../news.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article
  error: string

  url: string 

  constructor(
    private route: ActivatedRoute, private newsService: NewsService
    ) { }


  getArticle(): void {
    // get article by calling the rest api again and checking for url
    this.newsService
      .getArticle(this.url)
      .subscribe(
        article => {
          this.article = article
          console.log('article ' + article)
        },
        error => (this.error = error)
      )
  }

  // gets the url passed by the previous component
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log('url ' + this.url)
    });
    this.getArticle()
}

}
