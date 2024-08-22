import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsexampleComponent } from './formsexample/formsexample.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { ServerComponent } from './server/server.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AddproductpageComponent } from './addproductpage/addproductpage.component';

const routes: Routes = [
  // {
  //   path: "login",
  //   title: "login",
  //   component: LoginComponent,
  // },
  // {
  //   path: "menu",
  //   title: "menu",
  //   component: MenuComponent,
  // },
  // {
  //   path: "",
  //   title: "",
  //   component: HomeComponent,
  // },
  // {
  //   path: "templateform",
  //   title: "templateform",
  //   component: FormsexampleComponent,
  // },
  // {
  //   path: "dynamicform",
  //   title: "dynamicform",
  //   component: DynamicformComponent,
  // },
  // {
  //   path: "books/:bookId",
  //   title: "Books",
  //   component: BooksComponent,
  //   data: {pageInfo: "Sample Book page"},
  // },
  // {
  //   path: "server",
  //   title: "server",
  //   component: ServerComponent,
  // }
  {
    path: "home",
    title: "home",
    component: HomepageComponent,
  },
  {
    path: "admin",
    title: "admin",
    component: AdminpageComponent,
  },
  {
    path: "addproduct",
    title: "addproduct",
    component: AddproductpageComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
