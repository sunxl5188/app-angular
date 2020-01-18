import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {regexpValidator, AsyncValidate, checkPasswordConfirm, idCardValidator} from '../shared/directive/validate.directive';
import {HttpService} from '../shared/service/http.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {

  constructor(
    private asy: AsyncValidate,
    private fb: FormBuilder,
    private http: HttpService
  ) {}
  loading = true;
  // 定义爱好
  hobbyOption = [
    {name: '滑雪', value: '1'},
    {name: '看电影', value: '2'},
    {name: '看报纸', value: '3'},
    {name: '上网聊天', value: '4'},
    {name: '看小说', value: '5'},
    {name: '足球', value: '6'},
    {name: '乒乓球', value: '7'},
    {name: '旅游', value: '8'},
    {name: '逛街', value: '9'},
    {name: '听音乐', value: '10'},
    {name: '写剧本', value: '11'},
    {name: '游泳', value: '12'},
    {name: '足球', value: '13'},
    {name: '玩游戏', value: '14'},
    {name: '看电视剧', value: '15'},
    {name: '羽毛球', value: '16'},
    {name: '篮球', value: '17'}
    ];
  // 表单默认值
  formData = {
    user: '',
    username: '',
    password: '',
    passwordConfirm: '',
    sex: 1,
    avatar: '',
    age: '',
    bornDate: '',
    idCard: '',
    email: '',
    education: '',
    phone: '',
    hobby: [],
    desc: ''
  };

  myForm: FormGroup;

  ngOnInit() {
    const hobbyAction = ['1', '2'];
    this.hobbyOption.map(item => {
      if (hobbyAction.indexOf(item.value) >= 0) {
        this.formData.hobby.push(item);
      }
    });
    setTimeout(() => {
      this.loading = false;
      this.createForm();
      _.delay(() => {
        // 日期插件
        laydate.render({
          elem: '.bornDateTime',
          type: 'date',
          done: (value) => {
            this.myForm.patchValue({bornDate: value});
            // this.myForm.get('bornDate').setValue(value);
          }
        });
      }, 500);
    }, 1000);
  }
  // 创建表单
  createForm() {
    this.myForm = this.fb.group({
      user: [this.formData.user, {
        validators: Validators.required,
        asyncValidators: [this.asy.validate.bind(this.asy)],
        updateOn: 'blur'
      }],
      username: [this.formData.username, [Validators.required, regexpValidator('account', '用户名')]],
      password: [this.formData.password, [Validators.required, regexpValidator('password', '登录密码')]],
      passwordConfirm: [this.formData.passwordConfirm, Validators.required],
      sex: [this.formData.sex, Validators.required],
      avatar: [this.formData.avatar, Validators.required], // 头像
      age: [this.formData.age, [Validators.required, Validators.min(16), Validators.max(200)]],
      bornDate: [this.formData.bornDate, Validators.required],
      idCard: [this.formData.idCard, [Validators.required, idCardValidator()]],
      email: [this.formData.email, [Validators.required, regexpValidator('email', '请输入有效邮箱地址')]],
      education: [this.formData.education, Validators.required],
      phone: [this.formData.phone, [Validators.required, regexpValidator('mobile')]],
      hobby: this.fb.array(this.formData.hobby, [Validators.required, Validators.minLength(2)]),
      desc: [this.formData.desc, Validators.required]
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
  get idCard() {
    return this.myForm.get('idCard');
  }
  get email() {
    return this.myForm.get('email');
  }
  get education() {
    return this.myForm.get('education');
  }
  get phone() {
    return this.myForm.get('phone');
  }
  get hobby() {
    return this.myForm.get('hobby');
  }
  get desc() {
    return this.myForm.get('desc');
  }
  // https://www.iteye.com/blog/minjiechenjava-2414890
  // https://www.jianshu.com/p/abd760695da3
  // 添加删除复选框
  addItem(event, obj, field) {
    const arr = this.myForm.get(field) as FormArray;
    if (event.target.checked) {
      arr.push(this.fb.group(obj));
    } else {
      const valArr = this.myForm.value[field];
      valArr.map((item, i) => {
        if (item.value === obj.value) {
          arr.removeAt(i);
        }
      });
    }
  }
  // 查找数组内对象内是否包含指定对象
  isContain(val) {
    return this.hobby.value.some(item => item.value === val);
  }
  // 设置图片blob
  avatarValue(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const obj: any = (e.target as any).result;
      this.myForm.patchValue({avatar: obj});
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  submitForm() {
    const form = this.myForm.value;
    const hobbyArr = [];
    for (const item of this.hobby.value) {
      hobbyArr.push(item.value);
    }
    form.hobby = JSON.stringify(hobbyArr);
    this.http.post('index/index/message', form, (item) => {
      console.log(item);
    });
  }

}
