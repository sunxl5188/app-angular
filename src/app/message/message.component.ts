import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {regexpValidator, AsyncValidate, checkPasswordConfirm, verifyLength} from '../shared/directive/validate.directive';
import * as _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  formData = {
    user: '',
    username: '',
    password: '',
    passwordConfirm: '',
    hobbies: {hobby0: false, hobby1: false, hobby2: false, hobby3: false, hobby4: false}
  };

  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      /*user: new FormControl(this.formData.user, {
            validators: Validators.required,
            asyncValidators: [this.asy.validate.bind(this.asy)],
            updateOn: 'blur'
          }
      )*//*,
      username: new FormControl(this.formData.username, [
        Validators.required,
        regexpValidator('account', '用户名')
      ]),
      password: new FormControl(this.formData.password, [
        Validators.required,
        regexpValidator('password', '登录密码')
      ]),
      passwordConfirm: new FormControl(this.formData.passwordConfirm, [
        Validators.required,
        // confirmPassword('password')
      ]),*/
      hobbies: new FormGroup({
        hobby: new FormControl(false, [verifyLength(1)]),
        hobby1: new FormControl(false),
        hobby2: new FormControl(false),
        hobby3: new FormControl(false),
        hobby4: new FormControl(false)
      })
    }, {validators: [checkPasswordConfirm]});
  }

  get user() {
    return this.myForm.get('user');
  }

/*  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  get passwordConfirm() {
    return this.myForm.get('passwordConfirm');
  }
  */
  get hobbies() {
    return this.myForm.get('hobbies');
  }
  /*get hobby() {
    return this.myForm.get('hobbies.hobby');
  }*/
  // *****************************************
  /*verifyLength(value: any) {
    this.myForm.setErrors({hobby: true});
    return _.filter(value, (item) => item === true).length;
  }*/
  constructor(private asy: AsyncValidate) {
  }
}
