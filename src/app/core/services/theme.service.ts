import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isLightsOff = false;
  inlineStyle: any;

  constructor(@Inject(DOCUMENT) private _document: any) {
    this._document.documentElement.classList.add('dark');
    this._document.documentElement.classList.remove('light');
    this.isLightsOff = true;
  }

  toggleTheLights($event) {
    if (this.isLightsOff) {
      this._document.documentElement.classList.add('light');
      this._document.documentElement.classList.remove('dark');
    } else {
      this._document.documentElement.classList.add('dark');
      this._document.documentElement.classList.remove('light');
    }
    this.isLightsOff = !this.isLightsOff;
    if ($event) {
      $event.preventDefault();
    }
  }
}
