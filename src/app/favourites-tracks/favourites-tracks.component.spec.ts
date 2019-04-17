import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesTracksComponent } from './favourites-tracks.component';

describe('FavouritesTracksComponent', () => {
  let component: FavouritesTracksComponent;
  let fixture: ComponentFixture<FavouritesTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
