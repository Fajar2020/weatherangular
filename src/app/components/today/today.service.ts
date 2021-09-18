import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodayService {

  constructor(private http: HttpClient) { }

  getCityNow(cityID: number) {
    const urlRequest = `${environment.apiUrl}/weather?id=${cityID}&units=metric&appid=${environment.key}`;

    return this.http.get<any>(urlRequest)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCityNowByCoord(lat: number, lon: number) {
    const urlRequest = `${environment.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${environment.key}`;

    return this.http.get<any>(urlRequest)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCityPollution(lat: number, lon: number) {
    const urlRequest = `${environment.apiUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.key}`;

    return this.http.get<any>(urlRequest)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCurrentLocation() {
    const urlRequest = "https://api.ipify.org/?format=json";

    return this.http.get<any>(urlRequest).subscribe(data => {
      const url="http://ip-api.com/json/"+data.ip;
      return this.http.get<any>(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    })
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occured: ', error.error.message);
    } else {
      // The backend returned an unsuccessfull response code
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
