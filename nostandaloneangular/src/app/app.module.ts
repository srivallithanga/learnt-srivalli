import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { FormsexampleComponent } from './formsexample/formsexample.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { BooksComponent } from './books/books.component';
import { ServerComponent } from './server/server.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AddproductpageComponent } from './addproductpage/addproductpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    FormsexampleComponent,
    DynamicformComponent,
    BooksComponent,
    ServerComponent,
    HomepageComponent,
    AppmenuComponent,
    AdminpageComponent,
    AddproductpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
