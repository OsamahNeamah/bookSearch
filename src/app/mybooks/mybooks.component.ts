import { Component, OnInit } from '@angular/core';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {

  MyBooks:Books[]=[]
  constructor(private service:BooksService) { }

  ngOnInit(): void {
    this.service.getMYBooks().subscribe(result=>{this.MyBooks=result})
  }

}
