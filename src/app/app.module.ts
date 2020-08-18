import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './ngrx/reducers';
import { EffectsModule } from '@ngrx/effects';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CardModule, } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';

import { NgxSpinnerModule } from "ngx-spinner";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { WhetherDetailsComponent } from './whether-details/whether-details.component';
import { FavoirtesComponent } from './favoirtes/favoirtes.component';
import { CardComponent } from './components/card/card.component';
import { environment } from 'src/environments/environment';
import { WeatherEffects } from './ngrx/effects/weather.effects';

@NgModule({
  declarations: [
    AppComponent,
    WhetherDetailsComponent,
    FavoirtesComponent,
    CardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    NgxSpinnerModule,
    CoreModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    AutoCompleteModule,
    FlexLayoutModule,
    InputTextModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([WeatherEffects])
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
