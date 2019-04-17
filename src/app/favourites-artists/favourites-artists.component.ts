import { Component, OnInit } from '@angular/core';
import { FavouriteService } from "../services/add-favourite.service";
import {Artist} from '../models/artists';


@Component({
  selector: 'app-favourites-artists',
  templateUrl: './favourites-artists.component.html',
  styleUrls: ['./favourites-artists.component.scss']
})
export class FavouritesArtistsComponent implements OnInit {

  filteredArtists: Artist[];
artist: Artist[] = [];
errorMessage: string;


  constructor(private _favouriteService: FavouriteService) {
    
   }

  ngOnInit(): void {
    this._favouriteService.getArtists().subscribe(artist => {
        this.artist = artist,
        this.filteredArtists = this.artist;
    },
        error => this.errorMessage = <any>error);

}
_listFilter: string;

get listFilter(): string {
  return this._listFilter;
}

set listFilter(value: string) {
  this._listFilter = value;
  this.filteredArtists = this.listFilter ? this.performFilter(this.listFilter):this.artist;
}

//performFilter applies filter to products from Firebase
performFilter(filterBy:string):Artist[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.artist.filter((artist:Artist) => artist.name.toLocaleLowerCase().indexOf(filterBy) != -1);
}

deleteProduct(id:string): void {
  this._favouriteService.deleteArtist(id);
}
}
