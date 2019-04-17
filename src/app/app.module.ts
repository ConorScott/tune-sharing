import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchArtistsComponent } from './search-artists/search-artists.component';
import { MatDrawer, MatListModule, MatCardModule, MatInputModule, MatToolbarModule, MatExpansionModule, MatButtonModule, MatListSubheaderCssMatStyler, MatProgressSpinnerModule, MatMenuModule, MatSelect, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatSidenavModule, MatIconModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule  } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchTrackComponent } from './search-track/search-track.component';
import { SearchAlbumComponent } from './search-album/search-album.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FavouritesArtistsComponent } from './favourites-artists/favourites-artists.component';
import { FavouritesTracksComponent } from './favourites-tracks/favourites-tracks.component';
import { FavouritesAlbumsComponent } from './favourites-albums/favourites-albums.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FavouriteService} from './services/add-favourite.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NotificationService } from './services/notification.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Artist', component: SearchArtistsComponent, canActivate: [AuthGuard]},
  {path: 'Album', component: SearchAlbumComponent, canActivate: [AuthGuard]},
  {path: 'Track', component: SearchTrackComponent, canActivate: [AuthGuard]},
  {path: 'Artist-playlist', component: FavouritesArtistsComponent, canActivate: [AuthGuard]},
  {path: 'Track-playlist', component: FavouritesTracksComponent, canActivate: [AuthGuard]},
  {path: 'Album-playlist', component: FavouritesAlbumsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: 'login', canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    SearchArtistsComponent,
    NavbarComponent,
    SearchTrackComponent,
    SearchAlbumComponent,
    FavouritesArtistsComponent,
    FavouritesTracksComponent,
    FavouritesAlbumsComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule, 
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    IconsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule
  ],
  providers: [ApiService, FavouriteService, AuthService, AuthGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
