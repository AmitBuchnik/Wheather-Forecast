import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { SubSink } from 'subsink';

import { WheatherModel } from '../models/wheather.model';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectWeather, selectError, selectCurrentCity, selectIsMetric } from '../ngrx/reducers';
import { LoadCurrentWeather, ToggleFavoriteFlag, LoadCurrentWeatherByLatLng, ToggleDegreesUnit } from './ngrx/actions/weather.actions';
import { AsyncPipe } from '@angular/common';
import { AddToFavorites, RemoveFromFavorites } from '../favoirtes/ngrx/actions/favorites.actions';
import { FavoriteModel } from '../models/favorites.model';
import { LocationService } from '../core/services/location.service';
import { ILocation } from '../interfaces/location.interface';
import { DegreesTypes } from '../enums/degrees-types.enum';

@Component({
  selector: 'app-whether-details',
  templateUrl: './whether-details.component.html',
  styleUrls: ['./whether-details.component.scss']
})
export class WhetherDetailsComponent implements OnInit, OnDestroy {

  searchText: string;
  currentWheather: WheatherModel;

  subSink = new SubSink();
  getData = new Subject<string>(); // event for debounceTime the input

  isMetric = true;
  degreeType = DegreesTypes.Metric;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private locationService: LocationService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initIsMetric();

    this.initRoutingParams();

    this.initErrorHandling();

    this.initDebounceGetData();
  }

  initIsMetric() {
    this.subSink.add(this.store.select(selectIsMetric)
      .subscribe(isMetric => {
        this.isMetric = isMetric;

        if (isMetric) {
          this.degreeType = DegreesTypes.Metric;
        } else {
          this.degreeType = DegreesTypes.Imperial;
        }

        // load with the current degree unit
        if (this.currentWheather) {
          this.store.dispatch(new LoadCurrentWeather({ serachText: this.searchText, isMetric: this.isMetric }));
        }
      }));
  }

  initRoutingParams() {
    this.subSink.add(this.route.params.subscribe((params: { name: string }) => {
      const name = params.name;
      if (name) { // if we navigated by clicking on a card in favorites screen
        this.store.dispatch(new LoadCurrentWeather({ serachText: name, isMetric: this.isMetric }));
        this.searchText = name;
      } else { // in first time load or by switching screens
        this.getWheatherByAutocomplete();
      }
      // selects the whether object from state
      this.selectWheatherFromStore();
    }));
  }

  getWheatherByAutocomplete() {
    this.subSink.add(this.store.select(selectCurrentCity)
      .subscribe(currentCity => {
        if (currentCity) {
          // no need to dispatch search, an object is in state (occurs when switching screens)
          this.searchText = currentCity;
        } else { // first time load
          this.locationService.getPosition().then(pos => {
            console.log(`Positon: ${pos.lng} ${pos.lat}`);

            const location: ILocation = {
              lat: pos.lat,
              lng: pos.lng
            };
            this.store.dispatch(new LoadCurrentWeatherByLatLng({ location: location, isMetric: this.isMetric }));
          })
            .catch(error => {
              console.error(error.message);

              this.searchText = "Tel Aviv";
              this.store.dispatch(new LoadCurrentWeather({ serachText: this.searchText, isMetric: this.isMetric }));
            });
        }
      }));
  }

  selectWheatherFromStore() {
    this.subSink.add(this.store.select(selectWeather)
      .subscribe(currentWheather => {
        this.currentWheather = currentWheather;
      }));
  }

  initErrorHandling() {
    this.subSink.add(this.store.select(selectError)
      .subscribe(error => {
        if (error) {
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: error
          });
        }
      }));
  }

  initDebounceGetData() {
    this.getData.pipe(debounceTime(1000))
      .subscribe(searchText => {
        this.store.dispatch(new LoadCurrentWeather({ serachText: searchText, isMetric: this.isMetric }));
      });
  }

  onInput($event) {
    this.getData.next($event.target.value);
  }

  onToggleFavorite($event) {
    let isFavorite = !Boolean($event);
    this.store.dispatch(new ToggleFavoriteFlag(isFavorite));

    if (isFavorite) {
      this.store.dispatch(new AddToFavorites(<FavoriteModel>this.currentWheather));
    } else {
      this.store.dispatch(new RemoveFromFavorites(<FavoriteModel>this.currentWheather));
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
