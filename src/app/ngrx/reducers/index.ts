import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { WheatherModel } from '../../models/wheather.model';
import { FavoriteModel } from '../../models/favorites.model';
import { WheatherActionTypes, WheatherAction } from '../../whether-details/ngrx/actions/weather.actions';
import { FavoritesAction, FavoritesActionTypes } from 'src/app/favoirtes/ngrx/actions/favorites.actions';
import { act } from '@ngrx/effects';

export interface WeatherState {
  currentWeather: WheatherModel | null;
  isMetric: boolean;
  error: string | null;
}

const initialWeatherState: WeatherState = {
  currentWeather: null,
  error: null,
  isMetric: true
};

export interface FavorirsState {
  favorites: Array<FavoriteModel> | null;
}

const initialLocationState: FavorirsState = {
  favorites: []
};

export interface AppState {
  whether: WeatherState;
  favorites: FavorirsState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action: WheatherAction): WeatherState {
  switch (action.type) {

    case WheatherActionTypes.LOAD_WHEATHER_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        currentWeather: action.currentWeather,
        error: null
      });

    case WheatherActionTypes.LOAD_WHEATHER_ERROR:
      return Object.assign({}, state, { currentWeather: null, error: action.error });

    case WheatherActionTypes.TOGGLE_FAVORITE_FLAG:
      return Object.assign({}, state,
        {
          ...state,
          currentWeather:
          {
            ...state.currentWeather, isFavorite: action.isFavorite
          },
          error: null
        });

    case WheatherActionTypes.TOGGLE_DEGREES_UNIT:
      return Object.assign({}, state,
        {
          ...state,
          isMetric: action.isMetric
        });

    default:
      return state;
  }
}

export function favoritesReducer(state: FavorirsState = initialLocationState, action: FavoritesAction): FavorirsState {
  switch (action.type) {
    case FavoritesActionTypes.LOAD_FAVORITES:
      return Object.assign({}, state, action.favorites);

    case FavoritesActionTypes.ADD_TO_FAVORITES:
      return Object.assign({}, state, {
        ...state,
        favorites: [...state.favorites, action.favorite]
      });

    case FavoritesActionTypes.REMOVE_FROM_FAVORITES:
      let oldFavorites = [...state.favorites];
      oldFavorites = oldFavorites.filter(f => f.key != action.favorite.key)

      return Object.assign({}, state, {
        ...state,
        favorites: oldFavorites
      });

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  whether: weatherReducer,
  favorites: favoritesReducer
};

export const selectWeather = (state: AppState) => state.whether.currentWeather;

export const selectCurrentCity = (state: AppState) => state.whether.currentWeather?.LocalizedName;

export const selectError = (state: AppState) => state.whether.error;

export const selectIsMetric = (state: AppState) => state.whether.isMetric;

export const selectFavorites = (state: AppState) => state.favorites.favorites;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];