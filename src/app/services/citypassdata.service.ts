import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { City } from '../models/city';

@Injectable()
export class CitypassdataService {
  // private data = new BehaviorSubject(new City);
  // data$ = this.data.asObservable();

  // changeData(data: City) {
  //   this.data.next(data)
  // }

  private cityChange$: BehaviorSubject<City> = new BehaviorSubject(null);

    getCityChange(): Observable<City> {
        return this.cityChange$.asObservable();
    }

    setCityChange(data: City) {
        this.cityChange$.next(data);
    }


}
