import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Artist } from '../models/artists';
import { Track } from '../models/tracks';
import { FavouriteService } from '../services/add-favourite.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-search-track',
  templateUrl: './search-track.component.html',
  styleUrls: ['./search-track.component.scss']
})
export class SearchTrackComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  searchStr: string;
  searchResult: boolean;

  limit:number = 5;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ;
  panelOpenState = false;

  _tracks: Track;
  trackFilter: Track[] = [];

  isPresent: boolean;
  isLoggedIn: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, private apiService: ApiService, private _favouriteService: FavouriteService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  docPresent(name: string): boolean {
    this.isPresent = this.apiService.albumPresent(name);
    return this.isPresent == true;
  }

  searchTrack(searchStr: string) {
    this.searchResult = true;

    this.apiService.searchTracks(searchStr, 'search',).subscribe((res: any ) => {
      console.log(res.results.trackmatches.track);
      this.trackFilter = res.results.trackmatches.track;
     var dataSource: MatTableDataSource<Track> = new MatTableDataSource<Track>(this.trackFilter);
     this.changeDetectorRef.detectChanges();
     dataSource.paginator = this.paginator;
     this.obs = dataSource.connect();

    });
  }

  reset() {
    this.searchStr = null;
    this.searchResult = false;
  }

  addTrack(track: Track){
    
    this._favouriteService.addTrack(track);

  }

  navigateTo(value) {
    if (value) {
      
        this.router.navigate([value]);
        console.log(value);
    }
    
}
openSnackBar(name: string) {
  var message = "added to favourites";
  this.snackBar.open( name , message, {
    duration: 2000,
  });
}
}
