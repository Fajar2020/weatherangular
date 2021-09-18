import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { CitypassdataService } from 'src/app/services/citypassdata.service';
import { TodayService } from '../today/today.service';
import { DailyService } from './daily.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  subscription: Subscription;
  cityWeatherData:any[];
  // activeData:any;
  error: any;
  city:City;

  constructor(
    private service:DailyService, 
    private serviceToday: TodayService,
    private cityPassDataService: CitypassdataService) { 
    this.city=JSON.parse(localStorage.getItem('SelectedCity'));
  }

  ngOnInit(): void {
    this.cityPassDataService.getCityChange().subscribe(data => {
      if(data){
        this.city = data
        this.getAllData();
      }
      
    });
    this.getAllData();
  }


  getAllData(){
    if(!this.city.id){
      this.getCityData();
    }
    this.getData();
  }


  getCityData(){
    this.subscription = this.serviceToday.getCityNowByCoord(this.city.coord.lat, this.city.coord.lon)
      .subscribe(
        (data: any) => {

          this.city.name=data.name;
          this.city.id=data.id;

          localStorage.setItem('SelectedCity', JSON.stringify(this.city));
        },
        error => this.error = error
      );
  }


  getData(){
    this.subscription = this.service.getDaily(this.city.coord.lat, this.city.coord.lon)
    .subscribe(
      (data: any) => {

        data.hourly.forEach(e => {
          e.dt=moment(new Date(e.dt*1000)).format("YYYY-MM-DD HH:mm:ss");
          e.hour=e.dt.substring(11, 13);
        });


        data.daily.forEach(element => {
          let hours=[];
          element.dt=moment(new Date(element.dt*1000)).format("YYYY-MM-DD HH:mm:ss");
          
          element.sunrise=moment(new Date(element.sunrise*1000)).format("HH:mm:ss");
          element.sunset=moment(new Date(element.sunset*1000)).format("HH:mm:ss");
          element.moonrise=moment(new Date(element.moonrise*1000)).format("HH:mm:ss");
          element.moonset=moment(new Date(element.moonset*1000)).format("HH:mm:ss");

          data.hourly.forEach(e => {
            if(element.dt.substring(0, 10) === e.dt.substring(0, 10)){
              hours.push(e);
            }
          });
          element.hours=hours;

          if(element.weather[0].id == 800){
            element.imgBack="https://cdn.pixabay.com/photo/2017/06/17/18/35/background-2413081_1280.jpg";
          }else if(element.weather[0].id > 800){
            element.imgBack="https://cdn.pixabay.com/photo/2015/07/09/22/44/tree-838666_1280.jpg";
          }else if(element.weather[0].id >= 700){
            element.imgBack="https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg";
          }else if(element.weather[0].id >= 600){
            element.imgBack="https://cdn.pixabay.com/photo/2016/03/09/09/21/snowflake-1245748_1280.jpg";
          }else if(element.weather[0].id >= 500){
            element.imgBack="https://cdn.pixabay.com/photo/2020/04/02/23/01/rain-4996916_1280.jpg";
          }else if(element.weather[0].id >= 300){
            element.imgBack="https://cdn.pixabay.com/photo/2016/10/27/18/31/drops-of-water-1776012_1280.jpg";
          }else{
            element.imgBack="https://cdn.pixabay.com/photo/2018/05/30/15/39/thunderstorm-3441687_1280.jpg";
          }

        });
        this.cityWeatherData=data.daily;
      },
      error => this.error = error
    );
  }

}
