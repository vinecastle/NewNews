import { Component, OnInit } from '@angular/core';
import { NewsResponse } from '../newsResponse';
import { NewsService } from '../news.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchedArticles;
  error: any;

  constructor(private newsService: NewsService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  search(term: string) {
    event.preventDefault();
    this.newsService.searchNews(term).subscribe(
      articles => {
        this.searchedArticles = articles
        console.log(articles)
        articles.map(singleArticle => {
          this.putArticleInFirestore(singleArticle);
        });
      },
      error => (this.error = error)
    );
    return false;
  }

  putArticleInFirestore(article): void {
    let query = this.firestore.collection('articles', ref => ref.where('url', '==', article.url));
    query.get().subscribe(fetched => {
      //console.log(fetched.docs.length);
      //console.log(article.url);
      fetched.docs.map(doc => console.log(doc.data()));
      if (fetched.docs.length == 0) {
        //console.log(article.url); 
        this.firestore.collection('articles').add(article);
      }
    }
    );
  }
  searchCache(term: string) {
    this.firestore.collection('articles',
      ref => ref.where("url", "==", term)).get();
  }

}