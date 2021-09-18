import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyComponent } from './components/daily/daily.component';
import { ThreeHoursComponent } from './components/three-hours/three-hours.component';
import { TodayComponent } from './components/today/today.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'today', pathMatch: 'full'
  },
  {path:'today',component:TodayComponent},
  {path:'threehours', component:ThreeHoursComponent},
  {path:'daily', component:DailyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
