import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

//Install Bootstrap and Bootstrap components according to following:
//http://www.markupjavascript.com/2017/07/how-to-add-and-use-bootstrap-in-angular-2-cli-project.html
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(), 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    RouterModule.forRoot([
      {path: 'about', component: AboutComponent}, 
      {path: 'login', component: LoginComponent}
    ])
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }