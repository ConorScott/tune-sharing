import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Artist} from '../models/artists';
import { Observable } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { Album } from '../models/album';
import { response } from 'express';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable()
export class ApiService {

  API_KEY_LASTFM = "281b4432668939a54526fa4463211d4d";
  data: Album;
  user = firebase.auth().currentUser;
  isPresent: boolean;
  

  constructor(private http: HttpClient, private afs: AngularFirestore) { }
  

  private baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=281b4432668939a54526fa4463211d4d&format=json'

  searchArtists(artistName: string, queryType: string) {
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.${queryType}&artist=${artistName}&api_key=${this.API_KEY_LASTFM}&format=json`);
  }

  searchTracks(trackName: string, queryType: string){
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=track.${queryType}&track=${trackName}&api_key=${this.API_KEY_LASTFM}&format=json`);

  }
  searchAlbums(albumName: string, queryType: string,){
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=album.${queryType}&album=${albumName}&api_key=${this.API_KEY_LASTFM}&format=json`);
    }


  albumPresent(name: string):boolean{
    var cityRef = this.afs.collection(`users/${this.user.uid}/FavouriteArtists`).doc(`${name}`);

    var getDoc = cityRef.get()
    .subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        this.isPresent == false;
      } else {
        console.log('Document data:', doc.data());
      }
    })
    return this.isPresent;
  }
  

  

}