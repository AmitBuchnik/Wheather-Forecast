import { ITemperatureValues } from '../interfaces/tempertaure-values.interface';

export class DailyForecast {
    Date: Date;
    Temperature: DailyTemperature;
}

export class DailyTemperature {
    Minimum: ITemperatureValues;
    Maximum: ITemperatureValues;
}