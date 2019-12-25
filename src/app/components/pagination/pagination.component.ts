import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage = 10;
  @Input() total = 0;
  @Input() currentPage = 1;
  @Input() display = 15;
  @Input() pageGroup = 5; // 分页组件显示个数, 默认5
  @Output() myEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.groupList();
  }
  // 计算分页总数
  pageNumber() {
    return Math.ceil(this.total / this.display);
  }
  // 获取分页页码
  groupList() {
    let len = this.pageNumber();
    let temp = [];
    const list = [];
    const count = Math.floor(this.pageGroup / 2);
    let center = this.currentPage;
    if (len <= this.pageGroup) {
      while (len--) {
        temp.push({text: this.pageNumber() - len, val: this.pageNumber() - len});
      }
      return temp;
    }
    while (len--) {
      temp.push(this.pageNumber() - len);
    }

    const idx = temp.indexOf(center);
    if (idx < count) {
      center = center + count - idx;
    }
    if (this.currentPage > this.pageNumber() - count) {
      center = this.pageNumber() - count;
    }
    temp = temp.splice(center - count - 1, this.pageGroup);
    do {
      const t = temp.shift();
      list.push({
        text: t,
        val: t
      });
    } while (temp.length);
    if (this.pageNumber() > this.pageGroup) {
      if (this.currentPage > count + 1) {
        list.unshift({text: '...', val: list[0].val - 1});
      }
      if (this.currentPage < this.pageNumber() - count) {
        list.push({text: '...', val: list[list.length - 1].val + 1});
      }
    }
    return list;
  }

  // 设置页码并回调父组方法
  setCurrent(p) {
    if (this.currentPage !== p && p > 0 && p < this.pageNumber() + 1) {
      this.currentPage = p;
      this.myEvent.emit(this.currentPage);
    }
  }
}
