import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { ArticleComponent } from './article/article.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS}  from '@angular/common/http';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NoopInterceptor } from './noop.interceptor';
import { CachingInterceptor}  from './cache.interceptor';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { CommentingComponent } from './commenting/commenting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { ArticleListComponent } from './article-list/article-list.component';
import { LettersAvatarModule } from "ngx-letters-avatar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherComponent,
    ArticleComponent,
    SearchComponent,
    AboutComponent,
    NavigationComponent,
    CommentingComponent,
    ArticleListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule, 
    MatInputModule,
    LettersAvatarModule
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    
    },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }, // TODO: remove
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
