import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  readonly httpUrl = environment.httpUrl;

  constructor(private http: HttpClient,
    private messageService: MessageService) {
  }

  get(url: string, options: {} = { observe: 'body' }): Observable<any> {
    return this.http.get(`${this.httpUrl}${url}`, options).pipe(map((result) => {
      // if (result.Code) {
      //   this.messageService.add({
      //     severity: 'error', summary: 'Error', detail: result.Message
      //   });
      //   throwError(result.Message);
      // } else
      {
        if (result['data']) { // for wiremock
          return result['data'];
        }
        return result;
      }
    }));
  }
}


