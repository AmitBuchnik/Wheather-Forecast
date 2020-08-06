import { ITemperature } from '../interfaces/temperature.interface';
import { ITemperatureValues } from '../interfaces/tempertaure-values.interface';

export class BaseWheatherModel {
    key: string;
    LocalizedName: string;
    WeatherText: string;
    Temperature: ITemperature;
}