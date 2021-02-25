import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewNews';
  constructor(private router: Router){}

  goToArticle(articleNo) {
    this.router.navigate(["article-component"], {queryParams: {article: articleNo}});
  }
}
