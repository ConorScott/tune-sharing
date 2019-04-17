import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Artist } from '../models/artists';
import { Track } from '../models/tracks';
import { FavouriteService } from '../services/add-favourite.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from "rxjs";

@Component({
  selector: 'app-search-artists',
  templateUrl: './search-artists.component.html',
  styleUrls: ['./search-artists.component.scss']
})
export class SearchArtistsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private apiService: ApiService, private _favouriteService: FavouriteService, private router: Router, private snackBar: MatSnackBar) { }

  searchStr: string;
  searchResult: boolean;

  limit:number = 5;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ;
  panelOpenState = false;

  _artists: Artist;
  artistFilter: Artist[] = [];

  isPresent: boolean;
  isLoggedIn: boolean;
  
  errorMessage: string;

 
  ngOnInit(){
    
  }
  docPresent(name: string): boolean {
    this.isPresent = this.apiService.albumPresent(name);
    return this.isPresent == true;
  }

  searchArtists(searchStr: string){
    this.searchResult= true;
    this.apiService.searchArtists(searchStr, 'search',).subscribe((res: any ) => {
      console.log(res.results.artistmatches.artist);
      this.artistFilter = res.results.artistmatches.artist;
     var dataSource: MatTableDataSource<Artist> = new MatTableDataSource<Artist>(this.artistFilter);
     this.changeDetectorRef.detectChanges();
     dataSource.paginator = this.paginator;
     this.obs = dataSource.connect();

    });
  }
  reset() {
    this.searchStr = null;
    this.searchResult = false;
  }

  addArtist(artist: Artist){
    
    this._favouriteService.addArtist(artist);

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
