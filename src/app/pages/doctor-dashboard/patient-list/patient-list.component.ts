import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface Patient {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-patient-list',
  imports: [NgFor, RouterLink],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  patients: Patient[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Patient[]>('http://localhost:8082/User/ReadAll').subscribe((data) => {
      this.patients = data;
    });
  }

  selectPatient(patientId: string) {
    this.router.navigate(['/doctor/xrays'], { queryParams: { patientId } });
  }
}
