import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewNews';
  storedArticles: Observable<any[]>;
  comments: Observable<any[]>;
  constructor(private router: Router, firestore: AngularFirestore){
    this.storedArticles = firestore.collection('articles').valueChanges();
    this.comments = firestore.collection('comments').valueChanges();
  }

  // todo, load home
  goToArticle(articleNo) {
    this.router.navigate(["article-component"], {queryParams: {article: articleNo}});
  }
}
