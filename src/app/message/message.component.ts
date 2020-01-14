import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {regexpValidator, AsyncValidate, checkPasswordConfirm, verifyLength, dateFormat} from '../shared/directive/validate.directive';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  constructor(
    private asy: AsyncValidate,
    private fb: FormBuilder
  ) {}

  formData = {
    user: '',
    username: '',
    password: '',
    passwordConfirm: '',
    sex: 1,
    avatar: '',
    age: '',
    bornDate: '',
    hobbies: {hobby0: false, hobby1: false, hobby2: false, hobby3: false, hobby4: false},
    hobby: [
      {name: '足球', value: 'football', isChecked: false},
      {name: '篮球', value: 'basketball', isChecked: false},
      {name: '乒乓球', value: 'pingpang', isChecked: false}
    ],
    emails: [{email: 'email1'}, {email: 'email2'}, {email: 'email3'}, {email: 'email4'}]
  };

  myForm: FormGroup;

  ngOnInit() {
    this.myForm = this.fb.group({
      hobby: [this.formData.hobby]
    });
    /*laydate.render({
      elem: '.bornDateTime',
      type: 'date',
      done: (value) => {
        this.myForm.value.bornDate = value;
      }
    });
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
        Validators.required
      ]),
      sex: new FormControl(this.formData.sex, [Validators.required]),
      avatar: new FormControl(this.formData.avatar, [Validators.required]),
      age: new FormControl(this.formData.age, [
        Validators.required,
        Validators.min(16),
        Validators.max(200)
      ]),
      bornDate: new FormControl(this.formData.bornDate, {
        validators: Validators.required,
        asyncValidators: [this.asy.validate.bind(this.asy)]
      }),
      hobbies: new FormGroup({
        hobby0: new FormControl(false),
        hobby1: new FormControl(false),
        hobby2: new FormControl(false),
        hobby3: new FormControl(false),
        hobby4: new FormControl(false)
      }, [verifyLength(2)])
    }, {validators: [checkPasswordConfirm]});*/
  }
  initDetailInfoModel() {
    return this.fb.group(['跑步', '登山', '游泳', '手游']);
  }
  get hobby() {
    return this.myForm.get('hobby');
  }
  /*get user() {
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

  get sex() {
    return this.myForm.get('sex');
  }
  get avatar() {
    return this.myForm.get('avatar');
  }
  get age() {
    return this.myForm.get('age');
  }
  get bornDate() {
    return this.myForm.get('bornDate');
  }

  get hobbies() {
    return this.myForm.get('hobbies');
  }*/
  submitForm() {
    console.log(this.myForm.value);
  }
}
