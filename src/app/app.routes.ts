// app.routes.ts:
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/AuthGuard';
import { NgModule } from '@angular/core';
import { AppointmentComponent } from './pages/doctor-dashboard/appointment/appointment.component';
import { PatientDetailsComponent } from './pages/doctor-dashboard/patient-list/patient-details/patient-details.component';
import { PatientListComponent } from './pages/doctor-dashboard/patient-list/patient-list.component';
import { XrayUploadComponent } from './pages/doctor-dashboard/xray-upload/xray-upload.component';
import { HomeComponent } from './pages/doctor-dashboard/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Show Homepage first
  { path: 'login', component: LoginComponent },
  { path: 'doctor', component: DoctorDashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'patients', component: PatientListComponent },
      { path: 'patient/:id', component: PatientDetailsComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'xrays', component: XrayUploadComponent },
    ] 
  },
  { path: '**', redirectTo: '' } // ✅ Redirect to home instead of login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }