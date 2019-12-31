import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Uploadify} from '../shared/class/uploadify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  upload = new Uploadify();
  constructor() {
  }
  ngOnInit() {
    this.upload.create({
      list: '#listA',
      type: 'image',
      pick: {
        id: '#pickerA',
        innerHTML: '图片上传'
      }
    });
    this.upload.create({
      list: '#listB',
      type: 'file',
      pick: {
        id: '#pickerB',
        innerHTML: '附件上传'
      }
    });
  }
}
