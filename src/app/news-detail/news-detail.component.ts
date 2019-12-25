import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.less']
})
export class NewsDetailComponent implements OnInit {
  private id: number;
  constructor(
      private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
  }

}
