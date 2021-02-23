import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article = "test article";

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.article = params['article'];
    }); 
  }

}
