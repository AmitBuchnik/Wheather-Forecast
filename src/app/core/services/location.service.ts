import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private spinnerService: NgxSpinnerService) {
  }

  getPosition(): Promise<any> {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    return new Promise((resolve, reject) => {
      this.spinnerService.show();

      navigator.geolocation.getCurrentPosition(resp => {
        this.spinnerService.hide();
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          this.spinnerService.hide();
          reject(err);
        }),
        options
    });
  }

}
