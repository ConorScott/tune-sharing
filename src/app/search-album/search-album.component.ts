import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../services/api.service';
import {Album} from '../models/album';
import {FavouriteService} from '../services/add-favourite.service';
import {Router} from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AuthService } from '../services/auth.service';
import { Observable} from 'rxjs';
import * as _ from 'lodash';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-search-album',
  templateUrl: './search-album.component.html',
  styleUrls: ['./search-album.component.scss']
})
export class SearchAlbumComponent implements OnInit {
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

  _albums: Album;
  albumFilter: Album[] = [];
 
  isPresent: boolean;
  isLoggedIn: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, private apiService: ApiService, private _favouriteService: FavouriteService, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
   }

  ngOnInit() {
  }

  docPresent(name: string): boolean {
    this.isPresent = this.apiService.albumPresent(name);
    return this.isPresent
  }

  

  searchAlbum(searchStr: string,){
    
    this.searchResult = true;
  
    this.apiService.searchAlbums(searchStr, 'search',).subscribe((res: any ) => {
      console.log(res.results.albummatches.album);
      this.albumFilter = res.results.albummatches.album;
     var dataSource: MatTableDataSource<Album> = new MatTableDataSource<Album>(this.albumFilter);
     this.changeDetectorRef.detectChanges();
     dataSource.paginator = this.paginator;
     this.obs = dataSource.connect();

    });
    
    
  }
  reset() {
    this.searchStr = null;
    this.searchResult = false;
  }

  addAlbum(album: Album){
    
    this._favouriteService.addAlbum(album);

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
