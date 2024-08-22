import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  bookId: string | null;
  data: string;
  constructor(private activatedroute: ActivatedRoute){}
  ngOnInit(){
    this.activatedroute.paramMap.subscribe((params)=>{
      this.bookId=params.get("bookId");
    });
    this.activatedroute.data.subscribe((data)=>{
      this.data=data["pageInfo"];
    });
  }

}
