import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms'

import * as DataCity from '../../data/city.json';
import { City } from '../models/city';
import { TodayService } from '../components/today/today.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent{
  @Output() cityChanged: EventEmitter<City> =   new EventEmitter();
  public cities=DataCity.cities;
  public myControl: FormControl;
  public filteredValues=this.cities;
  filteredOptions: Observable<string[]>;
  public selectedCity: City;

  subscription: Subscription;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {

    this.selectedCity=JSON.parse(localStorage.getItem('SelectedCity'));
    this.myControl = new FormControl();
    if(!this.selectedCity){
      this.myLocation();
    }else{
      this.myControl.setValue(this.selectedCity);
    }
    
    this.myControl.valueChanges.subscribe(newValue=>{
      this.filteredValues = this.filterValues(newValue);
    })
  }

  getLocation(callback) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var returnValue = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          
          // and here you call the callback with whatever
          // data you need to return as a parameter.
          callback(returnValue);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }
​
  displayFn(city: any): string {
    return city && city.name ? city.name : '';
  }

  filterValues(search: unknown) {
    return this.cities.filter(value=>{
      if(typeof search === 'string'){
        return value.name.toLowerCase().indexOf(search.toLowerCase()) === 0
      }
      let search1:any=search;
      return value.name.toLowerCase().indexOf(search1.name.toLowerCase()) === 0
    });
  };

  onSelectionChanged(event) {
    if(event.isUserInput){
      localStorage.setItem('SelectedCity', JSON.stringify(event.source.value));
      this.cityChanged.emit(event.source.value);
    }
  }

  myLocation() {
    const urlRequest = "https://api.ipify.org/?format=json";

    this.http.get<any>(urlRequest).subscribe(data => {
      const url="http://ip-api.com/json/"+data.ip;
      this.http.get<any>(url).subscribe(data => {

        let curCity=new City();
        curCity.coord.lat=data.lat;
        curCity.coord.lon=data.lon

        localStorage.setItem('SelectedCity', JSON.stringify(curCity));
        this.myControl.setValue(curCity);
        this.cityChanged.emit(curCity);
      });
    })
  }

  
}
