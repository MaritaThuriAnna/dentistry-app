// doctor-dashboard.component.ts:
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { PatientListComponent } from "./patient-list/patient-list.component";

@Component({
  selector: 'app-doctor-dashboard',
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
