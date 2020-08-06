import { Action } from '@ngrx/store';
import { WheatherModel } from '../../../models/wheather.model';
import { ILocation } from 'src/app/interfaces/location.interface';

export enum WheatherActionTypes {
  LOAD_CURRENT_WHEATHER_BY_LAT_LNG = '[Wheather Details] Load Current Whether by Lat Lng',
  LOAD_CURRENT_WHEATHER = '[Wheather Details] Load Current Whether',
  LOAD_WHEATHER_SUCCESS = '[Current Wheather Page] Load Current Whether Success',
  LOAD_WHEATHER_ERROR = '[Wheather Details] Load Current Whether Error',
  TOGGLE_FAVORITE_FLAG = '[Wheather Details] Toggle Favorite Flag',
  TOGGLE_DEGREES_UNIT = '[Wheather Details] Toggle dEGREES uNIT'
}

export class WheatherAction implements Action {
  type: string;
  currentWeather: WheatherModel;
  error: string;
  isFavorite: boolean;
  location: ILocation;
  isMetric: boolean
}

export class LoadCurrentWeatherByLatLng implements Action {
  readonly type = WheatherActionTypes.LOAD_CURRENT_WHEATHER_BY_LAT_LNG;

  constructor(readonly payload: { location: ILocation, isMetric: boolean }) {
  }
}

export class LoadCurrentWeather implements Action {
  readonly type = WheatherActionTypes.LOAD_CURRENT_WHEATHER;

  constructor(readonly payload: { serachText: string, isMetric: boolean }) {
  }
}

export class LoadCurrentWhetherSuccess implements Action {
  readonly type = WheatherActionTypes.LOAD_WHEATHER_SUCCESS;

  constructor(readonly currentWeather: WheatherModel) {
  }
}

export class LoadCurrentWhetherError implements Action {
  readonly type = WheatherActionTypes.LOAD_WHEATHER_ERROR;

  constructor(readonly error: string) {
  }
}

export class ToggleFavoriteFlag implements Action {
  readonly type = WheatherActionTypes.TOGGLE_FAVORITE_FLAG;

  constructor(readonly isFavorite: boolean) {
  }
}

export class ToggleDegreesUnit implements Action {
  readonly type = WheatherActionTypes.TOGGLE_DEGREES_UNIT;

  constructor(readonly isMetric: boolean) {
  }
}

export type ActionsUnion = LoadCurrentWeather
  | LoadCurrentWeatherByLatLng
  | LoadCurrentWhetherSuccess
  | LoadCurrentWhetherError
  | ToggleFavoriteFlag
  | ToggleDegreesUnit;