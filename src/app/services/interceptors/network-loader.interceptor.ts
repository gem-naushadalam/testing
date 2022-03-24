  
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/*
 * To start spinner before every api request and stop after getting response*/
@Injectable()
export class NetworkLoaderInterceptor implements HttpInterceptor {
  public serviceCount = 0;
  constructor(
    private loaderService: LoaderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    setTimeout(() => {
      this.serviceCount++;
      this.loaderService.setLoader(true);
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 201) {
            this.snackBar.open(event.body.message, '', {
              panelClass: 'snackbar-success',
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 1500,
            });
          }
          if (event.status === 404) {
            console.log('12');
            this.router.navigate(['/notFound']);
          }
          // console.log(event);
        } else if (event instanceof HttpErrorResponse) {
        }
        return event;
      }),
      delay(100),
      finalize(() => {
        this.serviceCount--;
        if(this.serviceCount == 0){
         this.loaderService.setLoader(false)}
        })
    );
  }
}


