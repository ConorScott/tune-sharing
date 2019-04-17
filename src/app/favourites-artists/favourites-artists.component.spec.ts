import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesArtistsComponent } from './favourites-artists.component';

describe('FavouritesArtistsComponent', () => {
  let component: FavouritesArtistsComponent;
  let fixture: ComponentFixture<FavouritesArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
