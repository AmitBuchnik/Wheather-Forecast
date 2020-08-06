import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class httpRequestInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({ url: req.url + `?apikey=${environment.apikey}` });
        return next.handle(cloneReq);
    }
}
