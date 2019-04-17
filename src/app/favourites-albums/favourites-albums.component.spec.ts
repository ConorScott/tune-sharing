import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesAlbumsComponent } from './favourites-albums.component';

describe('FavouritesAlbumsComponent', () => {
  let component: FavouritesAlbumsComponent;
  let fixture: ComponentFixture<FavouritesAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
