import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../article';
import { NewsService } from '../news.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[]
  error: any

  constructor(private newsService: NewsService, private router: Router) { }

  readableDate(isoDate){
    var d = new Date(isoDate);
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return dateTimeFormat.format(d)
  }

  // pass url to article component
  goToArticle(url) {
    this.router.navigate(["article-component"], {queryParams: {
      url: url,
    }
    });
  }

  getArticles(): void {
    this.newsService
      .getNews()
      .subscribe(
        articles => {
          this.articles = articles
          console.log(articles)
        },
        error => (this.error = error)
      )
  }

  ngOnInit(): void {
    this.getArticles()
  }

}
