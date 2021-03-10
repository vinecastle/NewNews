import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../article';
import { NewsService } from '../news.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { ExpressionStatement } from '@angular/compiler';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  
  @Input() articles: Article[]
  error: any

  constructor(private newsService: NewsService, private router: Router, private firestore: AngularFirestore) {
    //this.articles = [];
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
    this.router.navigate(["article"], {queryParams: {
      url: url,
    }
    });
  }

  putArticleInFirestore(article): void {
    let query = this.firestore.collection('articles', ref => ref.where('url', '==', article.url)); 
    query.get().subscribe( fetched => {
      //console.log(fetched.docs.length);
      //console.log(article.url);
      //fetched.docs.map(doc => console.log(doc.data()));
      if (fetched.docs.length == 0){
        this.firestore.collection('articles').add(article);
      }
    }
    );
  }
 
  getArticles(): void {
    this.newsService
      .getNews()
      .subscribe(
        articles => { 
          this.articles = articles
          //console.log(articles)
          articles.map( singleArticle => {
          this.putArticleInFirestore(singleArticle);
          });
        },
        error => (this.error = error)
      );
  }

  ngOnInit(): void {
    this.getArticles();
  }

}
