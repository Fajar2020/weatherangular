import { Injectable } from '@angular/core';
import * as DataCity from '../../data/city.json';
​
​
@Injectable({
  providedIn: 'root'
})
export class DataService {
​
  constructor() { }
​
  fetchCities() {
    return DataCity.cities;
  }
​
}