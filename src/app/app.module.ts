import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './components/city/city.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { MessageComponent } from './message/message.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ValidateDirective } from './shared/directive/validate.directive';
import { FileSizePipe } from './shared/pipe/fileSize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ValidateDirective,
    CityComponent,
    PaginationComponent,
    SearchComponent,
    HomeComponent,
    ErrorComponent,
    MessageComponent,
    NewsComponent,
    NewsDetailComponent,
    FileSizePipe
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
