import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';   
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialaddModule } from './materialadd/materialadd.module';
import { CitypassdataService } from './services/citypassdata.service';
import { TodayComponent } from './components/today/today.component';
import { ThreeHoursComponent } from './components/three-hours/three-hours.component';
import { DailyComponent } from './components/daily/daily.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TodayComponent,
    ThreeHoursComponent,
    DailyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialaddModule,
    HttpClientModule
  ],
  providers: [CitypassdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
