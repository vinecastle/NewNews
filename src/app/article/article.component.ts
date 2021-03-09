import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  snapshotObs: Observable<any>;
  //article: Article
  error: string

  url: string 

  constructor(
    private route: ActivatedRoute, private newsService: NewsService, 
    private firestore: AngularFirestore
    ) { }


  getArticle(): void {
    // get article by calling the rest api again and checking for url
    /* this.newsService
      .getArticle(this.url)
      .subscribe(
        article => {
          this.article = article
          console.log('article ' + article)
        },
        error => (this.error = error)
      ); */
    //get an observable of query snapshot
    this.snapshotObs = this.firestore.collection('articles', 
        ref => ref.where("url", "==", this.url)).get();
    //get data in the document and assign to this.article
    /* this.snapshotObs.subscribe(
      snapshot => {
        snapshot.docs.map(
          doc => {
            //console.log(doc.data());
            let article = new Article();
            article["source"] = doc.data()["source"];
            article["title"] = doc.data()["title"];
            article["author"] = doc.data()["author"];
            article["description"] = doc.data()["description"];
            article["url"] = doc.data()["url"];
            article["urlToImage"] = doc.data()["urlToImage"];
            article["publishedAt"] = doc.data()["publishedAt"];
            article["content"] = doc.data()["content"];
            this.article = article;
            console.log(this.article);
          }
        )
      }
    ); */
  }

  // gets the url passed by the previous component
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log('url ' + this.url)
    });
    //console.log(this.url);   
    this.getArticle()
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

}
