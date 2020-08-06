import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState, selectFavorites, selectIsMetric } from '../ngrx/reducers';
import { FavoriteModel } from '../models/favorites.model';
import { SubSink } from 'subsink';
import { tap } from 'rxjs/operators';
import { DegreesTypes } from '../enums/degrees-types.enum';

@Component({
  selector: 'app-favoirtes',
  templateUrl: './favoirtes.component.html',
  styleUrls: ['./favoirtes.component.scss']
})
export class FavoirtesComponent implements OnInit, OnDestroy {

  subSink = new SubSink();
  favorites$: Observable<Array<FavoriteModel>>;

  degreeType: DegreesTypes;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavorites);

    this.subSink.add(this.store.select(selectIsMetric)
      .subscribe(isMetric => {
        if (isMetric) {
          this.degreeType = DegreesTypes.Metric;
        } else {
          this.degreeType = DegreesTypes.Imperial;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  navigateToWheatherDetails(favorite: FavoriteModel) {
    this.router.navigate([`/home/${favorite.LocalizedName}`], { relativeTo: this.route });
  }
}
