import { Component, HostListener } from '@angular/core';
import { CitypassdataService } from './services/citypassdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private passCityData: CitypassdataService){}

  cityChanged(event) {
    this.passCityData.setCityChange(event);
  }
 
}
