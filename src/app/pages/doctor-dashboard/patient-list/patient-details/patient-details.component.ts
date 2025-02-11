import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: { 
    email: string; 
    phone: string };
  address: string;
  medicalHistory: { 
    allergies: string; 
    conditions: string[]; 
    previousTreatments: string[] };
  appointments: { 
    date: string; 
    type: string; 
    status: string }[];
  xrayRecords: { 
    image: string; 
    analysis: string }[];
  doctorNotes: string;
}

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink, NgFor, NgIf, FormsModule],
  standalone: true,
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  patientId!: number;
  patient: Patient[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<Patient[]>('patient-data.json').subscribe((data) => {
      this.patient = data;
    });
  }
}
