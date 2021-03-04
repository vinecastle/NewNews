import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../article';
import { NewsService } from '../news.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { ExpressionStatement } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[]
  error: any

  constructor(private newsService: NewsService, private router: Router, private firestore: AngularFirestore) {

   }

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
          articles.map( singleArticle => {
            //console.log(singleArticle.description)
            const query = this.firestore.collection('article', ref => ref.where('url', '==', singleArticle.url));
            query.get()
            .subscribe(
              result => {
                //console.log(result);
                if (result.empty) {
                  this.firestore.collection('articles').add(singleArticle);
                }
              },
              error => (this.error = error) //Might need better error-handling
            )
            //console.log(query.get());
          })
        },
        error => (this.error = error)
      )
  }

  ngOnInit(): void {
    this.getArticles()
  }

}
