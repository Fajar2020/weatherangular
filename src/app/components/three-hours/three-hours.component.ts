import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ThreeHoursDataSource } from './three-hours-datasource';
import { ThreeHoursService } from './three-hours.service';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weather';
import { City } from 'src/app/models/city';
import { CitypassdataService } from 'src/app/services/citypassdata.service';

@Component({
  selector: 'app-three-hours',
  templateUrl: './three-hours.component.html',
  styleUrls: ['./three-hours.component.css']
})
export class ThreeHoursComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Weather>;
  dataSource: ThreeHoursDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','dt','temp', 'feels', 'humidity', 'description', 'icon'];

  subscription: Subscription;
  error: any;

  city:City;

  constructor(private service: ThreeHoursService, private cityPassDataService: CitypassdataService){
    this.city=JSON.parse(localStorage.getItem('SelectedCity'));
  }

  ngOnInit() {
    this.cityPassDataService.getCityChange().subscribe(data => {
      if(data){
        this.city = data
        this.getData();
      }
      
    });
    this.getData();
    
  }

  getData(){
    if(this.city.id){
      this.subscription = this.service.getForecastThreeHours(this.city.id)
      .subscribe(
        (result: any) => {
          let lists=result.list;
          let newData=[];
  
          lists.forEach(function callback(data, index) {
            let currentData = new Weather();
            currentData.id=index+1;
            currentData.dt=data.dt_txt;
            currentData.temp=data.main.temp;
            currentData.feels=data.main.feels_like;
            currentData.humidity=data.main.humidity;
            currentData.w_id=data.weather[0].id;
            currentData.description=data.weather[0].description;
            currentData.icon="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            
            newData.push(currentData);
          });
  
          this.dataSource = new ThreeHoursDataSource(newData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        },
        error => this.error = error
      );
    }else{
      this.subscription = this.service.getForecastThreeByCoord(this.city.coord.lat, this.city.coord.lon)
      .subscribe(
        (result: any) => {
          let lists=result.list;
          let newData=[];
  
          lists.forEach(function callback(data, index) {
            let currentData = new Weather();
            currentData.id=index+1;
            currentData.dt=data.dt_txt;
            currentData.temp=data.main.temp;
            currentData.feels=data.main.feels_like;
            currentData.humidity=data.main.humidity;
            currentData.w_id=data.weather[0].id;
            currentData.description=data.weather[0].description;
            currentData.icon="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            
            newData.push(currentData);
          });
  
          this.dataSource = new ThreeHoursDataSource(newData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;


          this.city.name=result.city.name;
          this.city.id=result.city.id;

          localStorage.setItem('SelectedCity', JSON.stringify(this.city));
        },
        error => this.error = error
      );
    }
    
  }

}