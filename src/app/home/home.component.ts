import { Component, OnInit } from '@angular/core';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Books:Books[]=[]
  displayHomePage:boolean = true
  constructor(private service:BooksService) { }

  ngOnInit(): void {
    this.service.getBooks('').subscribe(result=>{this.Books=result})
  }

  displayHome(boo:boolean){
    this.displayHomePage=boo;
  }
  changeBooks(str:string){
    this.service.getBooks(str).subscribe(result=>{this.Books=result})
  }

}
