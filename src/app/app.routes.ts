// app.routes.ts:
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../AuthGuard';
import { NgModule } from '@angular/core';
import { AppointmentComponent } from './pages/doctor-dashboard/appointment/appointment.component';
import { PatientDetailsComponent } from './pages/doctor-dashboard/patient-list/patient-details/patient-details.component';
import { XrayUploadComponent } from './pages/doctor-dashboard/xray-upload/xray-upload.component';

export const routes: Routes = [
  {
    path: 'doctor', component: DoctorDashboardComponent, children: [
      { path: 'patient', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { role: 'PATIENT' } },
      { path: 'patient/:id', component: PatientDetailsComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'xrays', component: XrayUploadComponent },
      { path: 'patient', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { role: 'PATIENT' } },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
}) export class AppRoutingModule { }