import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ThemeService } from '../services/theme.service';
import { AppState, selectIsMetric } from 'src/app/ngrx/reducers';
import { ToggleDegreesUnit } from 'src/app/whether-details/ngrx/actions/weather.actions';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subSink = new SubSink();
  isMetric: boolean;

  constructor(public themeService: ThemeService,
    private store: Store<AppState>,) {
  }

  ngOnInit() {
    this.subSink.add(this.store.select(selectIsMetric)
      .subscribe(isMetric => {
        this.isMetric = isMetric;
      }));
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  toggleTheme($event) {
    this.themeService.toggleTheLights($event);
  }

  toggleDegreesUnit($event) {
    if ($event) {
      $event.preventDefault();
    }


    this.isMetric = !this.isMetric;
    this.store.dispatch(new ToggleDegreesUnit(this.isMetric));
  }
}
