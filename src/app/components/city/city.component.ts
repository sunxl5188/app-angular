/*
* 调用组件 <app-city
* province="350000"
* city="361003"
* area="361001"
* address="详细地址"
* (myEvent)="handlecity($event)"
* />
* */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpService} from '../../shared/http.service';
import * as _ from 'lodash';

export class CityObj {
  constructor(
      public province: string,
      public city: string,
      public area: string,
      public address: string
  ) {}
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less']
})
export class CityComponent implements OnInit {
  @Input() province = '';
  @Input() city = '';
  @Input() area = '';
  @Input() address = '';
  @Input() addressShow = true; // 是否显示详细地址
  @Input() verification = true; // 是否必填

  @Output() myEvent = new EventEmitter();

  public provArr = [];
  public cityArr = [];
  public areaArr = [];

  constructor(
      private http: HttpService
  ) { }

  model = new CityObj('', '', '', '');

  ngOnInit() {
    this.http.getJSON('/assets/json/city.json', (res) => {
      this.provArr = res.cityList;
      if (this.province !== '') {
        this.model.province = this.province;
      }
      if (this.city !== '') {
        this.model.city = this.city;
        this.provArr.map(item => {
          if (item.area_id === this.province) {
            this.cityArr = item.child;
          }
        });
      }
      if (this.area !== '') {
        this.model.area = this.area;
        this.cityArr.map(item => {
          if (item.area_id === this.city) {
            this.areaArr = item.child;
          }
        });
      }
      if (this.address !== '') {
        this.model.address = this.address;
      }
      _.defer(() => {
        $('.selectpicker').selectpicker('refresh');
      });
    });
  }

  findChild(type) {
    if (type === 1) {
      this.model.city = '';
      this.model.area = '';
      this.cityArr = [];
      this.areaArr = [];
      this.provArr.map(item => {
        if (item.area_id === this.model.province) {
          this.cityArr = item.child;
        }
      });
    }
    if (type === 2 && this.cityArr.length > 0) {
      this.model.area = '';
      this.areaArr = [];
      this.cityArr.map(item => {
        if (item.area_id === this.model.city) {
          this.areaArr = item.child;
        }
      });
    }
    _.defer(() => {
      $('.selectpicker').selectpicker('refresh');
    });
    this.handleCityCallBack();
  }
  // 给父组件传值
  handleCityCallBack() {
    this.myEvent.emit({
      province: this.model.province,
      city: this.model.city,
      area: this.model.area,
      address: this.model.address,
    });
  }
}
