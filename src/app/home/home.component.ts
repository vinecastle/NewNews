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

  constructor(private newsService: NewsService) { }


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
