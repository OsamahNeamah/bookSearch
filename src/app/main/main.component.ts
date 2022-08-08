import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Books } from '../books';
import { BooksService} from '../books.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  @Input() Books:Books[]|any
  constructor(private service:BooksService) { }

  ngOnInit(): void {}
  ngOnChanges():void{
    console.log(this.Books)
  }
  addBook(Book:Books){
    this.service.addBook(Book)
  }


}
