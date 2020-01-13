import { Directive, Injectable } from '@angular/core';
import {FormGroup, AbstractControl, AsyncValidator, ValidatorFn, ValidationErrors} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap, tap, delay, first} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpService} from '../service/http.service';

@Injectable({providedIn: 'root'})

export class AsyncValidate implements AsyncValidator {
  constructor(
      private http: HttpService
  ) {}

  /**
   * 验证用户名是否存在
   */
  public validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(ctrl).pipe(
        delay(500),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => this.http.getAsync('index/index/recheck', {name: ctrl.value})),
        map(result => (result.data === 1 ? { isCheck: `${ctrl.value}用户名已存在` } : null)),
        tap((data) => {
          console.log(data);
        }),
        first()
    );
  }
}
/*/////////////////////////////////////////////////////////////*/
@Directive({
  selector: '[appValidate]'
})
export class ValidateDirective {

  constructor() { }

}

const regexp = {
  alpha: {rules: /^[A-Z]*$/i, messages: '只能包含字母字符'},
  alpha_dash: {rules: /^[0-9A-Z_-]*$/i, messages: '能够包含字母数字字符、破折号和下划线'},
  alpha_num: {rules: /^[0-9A-Z]*$/i, messages: '只能包含字母数字字符'},
  alpha_spaces: {rules: /^[A-Z\s]*$/i, messages: '只能包含字母字符和空格'},
  mobile: {rules: /^1[3-9]\d{9}$/, messages: '手机号码格式不正确'},
  email: {rules: /^\w+@[a-z0-9]+\.[a-z]+$/i, messages: '格式不正确'},
  account: {rules: /^[a-zA-Z][\w_-]{5,19}$/, messages: '只能够包含6-20个字母数字字符、破折号和下划线'},
  password: {rules: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, messages: '长度6-20、以字母开头,至少包含英文和数字'}
};

/**
 * 正则验证
 * @param: name 定义的正则名
 * @param: n 是输入框名称
 * @param: tipsy 自定义提示信息
 */
export function regexpValidator(name, n = '', tipsy = ''): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = regexp[name].rules.test(control.value);
    return result ? null : {regexp: {error: tipsy || n + regexp[name].messages}};
  };
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

// 验证身份证
export function idCardValidator(): ValidatorFn {
  return (control: AbstractControl): { [kay: string]: any } | null => {
    let boole = false;
    const isCard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(control.value);
    const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    const code = control.value.substring(17);
    if (isCard) {
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        sum += control.value[i] * factor[i];
      }
      if (parity[sum % 11] === code.toUpperCase()) {
        boole = true;
      }
    }
    return boole ? null : {idCard: {error: '请输入有效身份证号!'}};
  };
}

// 比较两个密码是否一致
export const checkPasswordConfirm: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return (password.value !== '' && password.value !== passwordConfirm.value) ?
    {passwordConfirm: {errors: '确认密码与登录密码不一至,请重新输入!'}} : null;
};
// 验证复选框 len 至少选择个数
export function verifyLength(len: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const str = JSON.stringify(control.value);
    const count = (str.split('true')).length - 1;
    return len > count ? {errors: `复选至少选择${len}项!`} : null;
  };
}

export function dateFormat(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    console.log(value);
    return;
  };
}
