import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() displayHomePage:EventEmitter<boolean>= new EventEmitter()
  @Output() NewBooks:EventEmitter<string>= new EventEmitter()
  searchForm:FormGroup = new FormGroup('')
  constructor(private builder:FormBuilder, private service:BooksService) {
    this.searchForm= this.builder.group({
      search: new FormControl('')
    })
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
        map(val=>{return val})
      ).subscribe(result=>this.NewBooks.emit(result['search']))
   }

  ngOnInit(): void {
  }
  displayHome(boo:boolean){
    this.displayHomePage.emit(boo)
  }
}
