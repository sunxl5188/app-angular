import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  constructor(
      private $router: Router,
      private $location: Location
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.$location.back();
  }
}
