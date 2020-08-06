import { DailyForecast } from './daily-forecast.model';
import { ITemperature } from '../interfaces/temperature.interface';
import { BaseWheatherModel } from './base-wheather.model';

export class WheatherModel extends BaseWheatherModel {
    DailyForecasts: Array<DailyForecast>;
    isFavorite: boolean;
}

