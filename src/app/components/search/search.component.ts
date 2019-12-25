import { Component, OnInit, Input } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../shared/http.service';
import * as _ from 'lodash';

export interface KeyList {
  title: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  @Input() placeholder = '';
  searchList = [];
  List = [];

  packages$: Observable<KeyList[]>;
  private searchText$ = new Subject<string>();

  constructor(
      private http: HttpService
  ) { }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }

  ngOnInit() {
    this.packages$ = this.searchText$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(params => {
          if (_.findIndex(this.searchList, (o) => o.title === params) >= 0) {
            // 搜索列表
            return this.reqSearchList('/data.php?action=searchAll', params);
          } else {
            // 搜索联想
            return this.reqKeyList('/data.php?action=search', params);
          }
        }),
        tap(data => {
          this.searchList = data;
        })
    );
  }

  // 查找联想列表
  reqKeyList(url: string, params: string): Observable<KeyList[]> {
    if (!params.trim()) { return of([]); }
    return this.http.reqGet( url, {keywords: params}).pipe(
        map((data: any) => {
          return data.map(entry => ({
                id: entry.id,
                title: entry.title,
                createTime: entry.createTime
              } as KeyList )
          );
        }),
        catchError(() => null)
    );
  }
  // 搜索查找
  reqSearchList(url: string, params: string): Observable<any> {
    return this.http.reqGet(url, {keywords: params}).pipe(
        tap(
            res => this.List = res
        )
    );
  }
}
