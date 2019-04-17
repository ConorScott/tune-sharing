import { Component, OnInit } from '@angular/core';
import {Album} from '../models/album';
import {FavouriteService} from '../services/add-favourite.service';
@Component({
  selector: 'app-favourites-albums',
  templateUrl: './favourites-albums.component.html',
  styleUrls: ['./favourites-albums.component.scss']
})
export class FavouritesAlbumsComponent implements OnInit {

filteredAlbums: Album[];
album: Album[] = [];
errorMessage: string;


  constructor(private _favouriteService: FavouriteService) {
    
   }

  ngOnInit(): void {
    this._favouriteService.getAlbums().subscribe(album => {
        this.album = album,
        this.filteredAlbums = this.album;
    },
        error => this.errorMessage = <any>error);

}
_listFilter: string;

get listFilter(): string {
  return this._listFilter;
}

set listFilter(value: string) {
  this._listFilter = value;
  this.filteredAlbums = this.listFilter ? this.performFilter(this.listFilter):this.album;
}

//performFilter applies filter to products from Firebase
performFilter(filterBy:string):Album[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.album.filter((album:Album) => album.name.toLocaleLowerCase().indexOf(filterBy) != -1);
}

deleteProduct(id:string): void {
  this._favouriteService.deleteProduct(id);
}

}
