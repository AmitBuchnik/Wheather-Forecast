import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { map, mergeMap, catchError, filter, withLatestFrom } from 'rxjs/operators';
import { AppState, selectWeather } from '../../../ngrx/reducers';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { LoadCurrentWeather, WheatherActionTypes, LoadCurrentWhetherError, LoadCurrentWhetherSuccess, ToggleFavoriteFlag, LoadCurrentWeatherByLatLng } from '../actions/weather.actions';
import { ApiService } from '../../../services/api.service';
import { WheatherModel } from '../../../models/wheather.model';
import { AccuWheatherError } from 'src/app/core/models/accu-wheather-error.model';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService) {
  }

  @Effect()
  loadCurrentWheather$ = this.actions$
    .pipe(
      ofType<LoadCurrentWeather>(WheatherActionTypes.LOAD_CURRENT_WHEATHER),
      withLatestFrom(this.store.pipe(select(selectWeather))),
      // make an http request only if the search text changed
      // filter(([action, currentWheater]) => currentWheater?.LocalizedName != action.payload.serachText),
      mergeMap(([action, currentWheater]) => this.apiService.getCurrentWheatherByAutocomplete$(action.payload.serachText, action.payload.isMetric)
        .pipe(
          map((weather: WheatherModel) => {
            return (new LoadCurrentWhetherSuccess(weather));
          }),
          catchError((err) => {
            let errorMessage = this.getErrorText(err);
            return of(new LoadCurrentWhetherError(errorMessage));
          })
        ))
    );

  @Effect()
  loadCurrentWheatherByLatLng$ = this.actions$
    .pipe(
      ofType<LoadCurrentWeatherByLatLng>(WheatherActionTypes.LOAD_CURRENT_WHEATHER_BY_LAT_LNG),
      mergeMap(action => this.apiService.getCurrentWheatherByLatLng$(action.payload.location, action.payload.isMetric)
        .pipe(
          map((weather: WheatherModel) => {
            return (new LoadCurrentWhetherSuccess(weather));
          }),
          catchError((err) => {
            let errorMessage = this.getErrorText(err);
            return of(new LoadCurrentWhetherError(errorMessage));
          })
        ))
    );

  getErrorText(err) {
    if (err.error instanceof AccuWheatherError) {
      return `Error Code: ${err.error.Code}\nMessage: ${err.error.Message}`;
    }
    return `Error Code: ${err.status}\nMessage: ${err.message}`;
  }
}