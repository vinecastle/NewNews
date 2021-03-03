import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private route: ActivatedRoute, private newsService: NewsService, 
    private firestore: AngularFirestore
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
    // how do we get the specific url to fetch from the firestore? 
    // within the firestore, having a specific url, how do we verify that 
    // the article is in the firestore? And then fetch it?
    console.log(this.url); 
    console.log(
      this.firestore.collection('articles', 
      ref => ref.where("url", "==", this.url)).get() 
    );  
    // errors occur after this line, if the homepage is not instantiated beforehand    
    this.getArticle()
}

}
