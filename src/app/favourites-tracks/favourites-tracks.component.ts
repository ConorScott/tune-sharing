import { Component, OnInit } from '@angular/core';
import { FavouriteService } from "../services/add-favourite.service";
import {Track} from '../models/tracks';

@Component({
  selector: 'app-favourites-tracks',
  templateUrl: './favourites-tracks.component.html',
  styleUrls: ['./favourites-tracks.component.scss']
})
export class FavouritesTracksComponent implements OnInit {

  filteredTracks: Track[];
  track: Track[] = [];
  errorMessage: string;
  
  
    constructor(private _favouriteService: FavouriteService) {
      
     }
  
    ngOnInit(): void {
      this._favouriteService.getTracks().subscribe(track => {
          this.track = track,
          this.filteredTracks = this.track;
      },
          error => this.errorMessage = <any>error);
  
  }
  _listFilter: string;
  
  get listFilter(): string {
    return this._listFilter;
  }
  
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTracks = this.listFilter ? this.performFilter(this.listFilter):this.track;
  }
  
  //performFilter applies filter to products from Firebase
  performFilter(filterBy:string):Track[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.track.filter((track:Track) => track.name.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  deleteProduct(id:string): void {
    this._favouriteService.deleteTrack(id);
  }
}
