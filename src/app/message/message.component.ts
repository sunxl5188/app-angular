import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {regexpValidator, AsyncValidate, checkPasswordConfirm} from '../shared/validate.directive';

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
    passwordConfirm: ''
  };

  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      user: new FormControl(this.formData.user, {
          validators: Validators.required,
          asyncValidators: [this.asy.validate.bind(this.asy)],
          updateOn: 'blur'
        }
      ),
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
      ])
    }, {validators: [checkPasswordConfirm]});
  }

  get user() {
    return this.myForm.get('user');
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  get passwordConfirm() {
    return this.myForm.get('passwordConfirm');
  }

  constructor(private asy: AsyncValidate) {
  }
}
