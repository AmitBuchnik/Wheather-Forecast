import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from 'src/environments/environment';
import { RestService } from '../core/services/rest.service';
import { WheatherModel } from '../models/wheather.model';
import { ILocation } from '../interfaces/location.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly httpUrl = environment.httpUrl;

    constructor(private restService: RestService,
        private foregroundScreenService: NgxSpinnerService,
        private messageService: MessageService) {
    }

    getCurrentWheatherByAutocomplete$(searchText: string, isMetric: boolean = true): Observable<WheatherModel> {
        const autocompleteParams = new HttpParams()
            .set('q', searchText);

        const conditionsParams = new HttpParams()
            .set('details', 'false');

        const forecastParams = new HttpParams()
            .set('details', 'false')
            .append('metric', isMetric.toString());

        this.foregroundScreenService.show();

        return this.restService.get(`locations/v1/cities/autocomplete`, { params: autocompleteParams })
            .pipe(mergeMap(autocomplete => {
                return this.restService.get(`currentconditions/v1/${autocomplete[0]?.Key}`, { params: conditionsParams })
                    .pipe(map(conditions => {
                        return <WheatherModel>{
                            key: autocomplete[0]?.Key,
                            LocalizedName: autocomplete[0]?.LocalizedName,
                            WeatherText: conditions[0]?.WeatherText,
                            Temperature: conditions[0]?.Temperature
                        }
                    }));
            }
            ),
                mergeMap(wheatherModel => {
                    return this.restService.get(`forecasts/v1/daily/5day/${wheatherModel?.key}`, { params: forecastParams })
                        .pipe(map(forecast => {
                            this.foregroundScreenService.hide();

                            return <WheatherModel>{
                                ...wheatherModel,
                                DailyForecasts: forecast?.DailyForecasts
                            }
                        }));
                }),
                catchError(
                    err => {
                        this.foregroundScreenService.hide();
                        return throwError(err);
                    }
                ));
    }

    getCurrentWheatherByLatLng$(location: ILocation, isMetric: boolean = true): Observable<WheatherModel> {
        const geopositionParams = new HttpParams()
            .set('q', `${location.lat},${location.lng}`)
            .set('details', 'false')
            .set('toplevel', 'false');

        const conditionsParams = new HttpParams()
            .set('details', 'false');

        const forecastParams = new HttpParams()
            .set('details', 'false')
            .append('metric', isMetric.toString());

        this.foregroundScreenService.show();

        return this.restService.get(`locations/v1/cities/geoposition/search`, { params: geopositionParams })
            .pipe(mergeMap(geoposition => {
                return this.restService.get(`currentconditions/v1/${geoposition.Key}`, { params: conditionsParams })
                    .pipe(map(conditions => {
                        return <WheatherModel>{
                            key: geoposition.Key,
                            LocalizedName: geoposition.LocalizedName,
                            WeatherText: conditions[0]?.WeatherText,
                            Temperature: conditions[0]?.Temperature
                        }
                    }));
            }
            ),
                mergeMap(wheatherModel => {
                    return this.restService.get(`forecasts/v1/daily/5day/${wheatherModel?.key}`, { params: forecastParams })
                        .pipe(map(forecast => {
                            this.foregroundScreenService.hide();

                            return <WheatherModel>{
                                ...wheatherModel,
                                DailyForecasts: forecast?.DailyForecasts
                            }
                        }));
                }),
                catchError(
                    err => {
                        this.foregroundScreenService.hide();
                        return throwError(err);
                    }
                ));
    }
}


