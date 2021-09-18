import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { CitypassdataService } from 'src/app/services/citypassdata.service';
import { TodayService } from './today.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  subscription: Subscription;
  hourlySubscription: Subscription;
  cityWeatherData:any;
  airPolutionData:any;
  error: any;
  city:City;
  cityPass:City;

  constructor(private service:TodayService, private cityPassDataService: CitypassdataService) { 
    
  }

  ngOnInit(): void {
    this.city=JSON.parse(localStorage.getItem('SelectedCity'));
    this.cityPassDataService.getCityChange().subscribe(data => {
      if(data){
        this.city = data
        this.getAllData();
      }
      
    });
    
    this.getAllData();
  }

  getAllData(){
    this.getData();
    this.getPollution();
  }

  getData(){
    if(this.city.id){
      this.subscription = this.service.getCityNow(this.city.id)
      .subscribe(
        (data: any) => {
          let condition='';
          data.dt=moment(new Date(data.dt*1000)).format("HH:mm:ss");
          data.sys.sunriseString=moment(new Date(data.sys.sunrise*1000)).format("HH:mm:ss");
          data.sys.sunsetString=moment(new Date(data.sys.sunset*1000)).format("HH:mm:ss");
          data.weather[0].iconString="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
          if(data.clouds){
            condition="with cloudiness "+data.clouds.all+"%";
          }
  
          if(data.rain){
            if(data.rain['1h']){
              condition="Rain volume for the last 1 hour, "+data.rain['1h']+"mm";
            }
            if(data.rain['3h']){
              condition+=" and last 3 hours, "+data.rain['3h']+"mm";
            }
          }
  
          data.condition=condition;
          this.cityWeatherData = data;
        },
        error => this.error = error
      );
    }else{
      this.subscription = this.service.getCityNowByCoord(this.city.coord.lat, this.city.coord.lon)
      .subscribe(
        (data: any) => {
          let condition='';
          data.dt=moment(new Date(data.dt*1000)).format("HH:mm:ss");
          data.sys.sunriseString=moment(new Date(data.sys.sunrise*1000)).format("HH:mm:ss");
          data.sys.sunsetString=moment(new Date(data.sys.sunset*1000)).format("HH:mm:ss");
          data.weather[0].iconString="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
          if(data.clouds){
            condition="with cloudiness "+data.clouds.all+"%";
          }

          if(data.rain){
            if(data.rain['1h']){
              condition="Rain volume for the last 1 hour, "+data.rain['1h']+"mm";
            }
            if(data.rain['3h']){
              condition+=" and last 3 hours, "+data.rain['3h']+"mm";
            }
          }

          data.condition=condition;
          this.cityWeatherData = data;

          this.city.name=data.name;
          this.city.id=data.id;

          localStorage.setItem('SelectedCity', JSON.stringify(this.city));
        },
        error => this.error = error
      );
    }
    
  }

  getPollution(){
    this.subscription = this.service.getCityPollution(this.city.coord.lat, this.city.coord.lon)
    .subscribe(
      (data: any) => {
        let condition='';
        if(data.list[0].main.aqi === 1){
          condition="Good"
        }else if(data.list[0].main.aqi === 2){
          condition="Fair"
        }else if(data.list[0].main.aqi === 3){
          condition="Moderate"
        }else if(data.list[0].main.aqi === 4){
          condition="Poor"
        }else{
          condition="Very Poor"
        }

        data.condition=condition;
        this.airPolutionData=data;

      },
      error => this.error = error
    );
  }
  
}

