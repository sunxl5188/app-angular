import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {MessageComponent} from './message/message.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}, // 首页
  {path: 'news', component: NewsComponent, children: [
      {path: 'detail', component: NewsDetailComponent}
    ]},
  {path: 'message', component: MessageComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
