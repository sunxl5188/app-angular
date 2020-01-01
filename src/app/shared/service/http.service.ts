import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'X-CustomToken': 'value+', // PHP跨域里要设置接收参数，必须大写字母开头
  'X-XSRF-TOKEN': 'ToKenValue--'
});
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverUrl = 'http://www.api.me/';

  constructor(
      private http: HttpClient
  ) {}

  // get请求
  public get(url: string, params: {}, callback): void {
    this.GET(this.serverUrl + url, params).subscribe(res => {
      callback(res);
    });
  }

  // post请求
  public post(url: string, params: {}, callback): void {
    this.POST(this.serverUrl + url, params).subscribe(res => {
      callback(res);
    });
  }

  // getJson
  public getJSON(url: string, callback): void {
    this.GET(url, {}).subscribe(res => {
      callback(res);
    });
  }

  // delete请求
  public del(url: string, id: number, callback): void {
    this.deleteId(this.serverUrl + url, id).subscribe(res => {
      callback(res);
    });
  }

  // put请求
  public put(url: string, params: {}, callback): void {
    this.update(this.serverUrl + url, params).subscribe(res => {
      callback(res);
    });
  }
  public reqGet(url: string, data: {}): Observable<any> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<any>(this.serverUrl + url, {headers, params})
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
  }

  public getAsync(url: string, data: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: data
    });
    return this.http.get<any>(this.serverUrl + url, {headers, params}).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }
  /**
   * 私有GET请求
   * @param url API 地址
   * @param data 请求参数
   */
  private GET(url: string, data: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: data
    });
    return this.http.get<any>(url, {headers, params}).pipe(
        retry(3), // 最多重试3次失败请求
        catchError(this.handleError) // 处理错误
    );
  }

  /**
   * 私有POST请求处理
   * @param url API
   * @param data 参数
   */
  private POST(url: string, data: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: data
    });
    return this.http.post<any>(url, params, {headers}).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  /**
   * 私有delete请求
   * @param url API
   * @param id 要删除的ID编号
   */
  private deleteId(url: string, id: number): Observable<any> {
    const currentUrl = `${url}/${id}`;
    return this.http.delete(currentUrl, {headers}).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  /**
   * 私有put请求用来更新数据
   * @param url API
   * @param data 参数
   */
  private update(url: string, data: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: data
    });
    return this.http.put(url, params, {headers}).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }
  /**
   * 错误处理
   * @param error 错误信息
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 发生客户端或网络错误。相应处理。
      console.error('发生了一个错误:', error.error.message);
    } else {
      // 后端返回一个不成功的响应代码。响应主体可能包含关于出错原因的线索，
      console.error(
          `后端返回代码 ${error.status}, ` + `错误内容: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('访问出现问题，请稍后再试!');
  }
}
