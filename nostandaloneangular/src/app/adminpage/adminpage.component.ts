import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Category {
  _id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent implements OnInit{
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get<{ categories: Category[] }>("http://localhost:3000/api/v1/categories").subscribe(
      (response) => {
        this.categories = response.categories;
      },
      (error) => {
        console.log("Error fetching categories:", error);
      }
    );
  }

}
