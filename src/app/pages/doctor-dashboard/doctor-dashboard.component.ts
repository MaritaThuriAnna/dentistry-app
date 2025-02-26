// doctor-dashboard.component.ts:
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientListComponent } from "./patient-list/patient-list.component";

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
