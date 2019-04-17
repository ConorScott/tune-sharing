import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {Artist} from '../models/artists';
import {Album} from '../models/album';
import {Track} from '../models/tracks';
import * as firebase from 'firebase';



@Injectable(//{
  //providedIn: 'root'
//}
)
export class FavouriteService {
  private _productUrl = "http://localhost:3000/products";

  albumCollection: AngularFirestoreCollection<Album>;
  albums: Observable<Album[]>;
  allAlbums: Album[];

  artistCollection: AngularFirestoreCollection<Artist>;
  artists: Observable<Artist[]>;
  allArtists: Artist[];

  trackCollection: AngularFirestoreCollection<Track>;
  tracks: Observable<Track[]>;
  allTracks: Track[];
  
  user = firebase.auth().currentUser;

  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore){
    this.albumCollection = _afs.collection<Album>("albums");
    this.artistCollection = _afs.collection<Artist>("artists");
    this.trackCollection = _afs.collection<Track>("tracks");

    //this.addAllProducts();
  }

  addAlbum(album: Album){

    this._afs.collection(`users/${this.user.uid}/Favourite Albums`).add(album);
  }

  getAlbums(){
    this.albums = this._afs.collection(`users/${this.user.uid}/FavouriteAlbums`).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Album;
          console.log("getAlbums:data" + JSON.stringify(data));
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.albums;
  }

  addArtist(artist: Artist): void {
    this._afs.collection(`users/${this.user.uid}/FavouriteArtists`).add(artist);

  }

  getArtists(){
    this. artists = this._afs.collection(`users/${this.user.uid}/FavouriteArtists`).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Artist;
          console.log("getProducts:data" + JSON.stringify(data));
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.artists;
  }

  addTrack(track: Track): void {
    this._afs.collection(`users/${this.user.uid}/FavouriteTracks`).add(track);
  }

  getTracks(){
    this.tracks = this._afs.collection(`users/${this.user.uid}/FavouriteTracks`).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Track;
          console.log("getProducts:data" + JSON.stringify(data));
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.tracks;
  }

  deleteProduct(id:string): void {
    this._afs.collection(`users/${this.user.uid}/FavouriteAlbums`).doc(id).delete()
    .catch(error => {console.log("deleteProduct error:"+error);})
    .then(() => console.log('deleteProduct: id ='+id));
    
  }
  deleteArtist(id:string): void {
    this._afs.collection(`users/${this.user.uid}/FavouriteArtists`).doc(id).delete()
    .catch(error => {console.log("deleteProduct error:"+error);})
    .then(() => console.log('deleteProduct: id ='+id));
    
  }
  deleteTrack(id:string): void {
    this._afs.collection(`users/${this.user.uid}/FavouriteTracks`).doc(id).delete()
    .catch(error => {console.log("deleteProduct error:"+error);})
    .then(() => console.log('deleteProduct: id ='+id));
    
  }
}