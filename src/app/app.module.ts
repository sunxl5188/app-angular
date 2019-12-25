import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidateDirective } from './shared/validate.directive';
import { CityComponent } from './components/city/city.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { WebUploaderComponent } from './components/web-uploader/web-uploader.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { MessageComponent } from './message/message.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidateDirective,
    CityComponent,
    PaginationComponent,
    SearchComponent,
    WebUploaderComponent,
    HomeComponent,
    ErrorComponent,
    MessageComponent,
    NewsComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
