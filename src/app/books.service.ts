import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, map, of } from 'rxjs';
import { Books,Root } from './books';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private Books?:BehaviorSubject<Books> | any= new BehaviorSubject('')
  private MyBooks?:BehaviorSubject<any> = new BehaviorSubject('')
  private readonly baseURL = 'https://www.googleapis.com/books/v1/volumes'
  private searchArray:any[] = []
  private myStoredBooks:any[] = []
  constructor(private http:HttpClient) { }
  getBooks(query:string):Observable<any>{
    this.searchArray=[]
    let query1= query.length==0?'java':query
    console.log(query1)
    return this.http.get<Root>(`${this.baseURL}?q=${query1}`).pipe(
      map((result:Root)=>{
        result.items.forEach(item=>{
          let BookObject={
            title:item.volumeInfo.title,
            subtitle:item.volumeInfo.subtitle,
            authors: item.volumeInfo.authors,
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            pageCount:item.volumeInfo.pageCount,
            imageLinks: item.volumeInfo.imageLinks!=undefined?
            item.volumeInfo.imageLinks.thumbnail:''

          }
          this.searchArray.push(BookObject)
        })
        this.Books?.next(this.searchArray)
        return this.Books
      })
    )
  }

  addBook(Book:Books):Observable<any>{
    if(this.myStoredBooks.indexOf(Book)>-1){
      return of(this.MyBooks?.next(this.myStoredBooks))
    }
    else{
      this.myStoredBooks.push(Book)
     return of(this.MyBooks?.next(this.myStoredBooks))
    }
  }
  getMYBooks():Observable<any>{
    return of(this.myStoredBooks)
  }

  deleteBook(Book:Books){
    let newarray:Books[]=[]
    if(this.myStoredBooks.indexOf(Book)>-1){
      this.myStoredBooks.forEach(book=>{
        if(book==Book){}
        else{newarray.push(book)}
      })
    }
    this.myStoredBooks=newarray
    return this.MyBooks?.next(this.myStoredBooks)
  }
}
