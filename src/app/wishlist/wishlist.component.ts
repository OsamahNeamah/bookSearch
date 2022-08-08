import { Component, OnInit, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit,OnChanges,DoCheck {
  public MyBooks:Books[] = []
  constructor(private service:BooksService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngDoCheck(){
    this.service.getMYBooks().subscribe((result: any)=>{this.MyBooks=result})
  }
  DeleteBook(Book:Books){
    let newarray:Books[]=[]
    if(this.MyBooks.indexOf(Book)>-1){
      this.MyBooks.forEach(book=>{
        if(book==Book){}
        else{newarray.push(book)}
      })
    }
    this.MyBooks=newarray
    this.service.deleteBook(Book)
  }
}
