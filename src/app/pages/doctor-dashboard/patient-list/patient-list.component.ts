import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Patient[]>('patient-data.json').subscribe((data) => {
      this.patients = data;
    });
    console.log(this.patients)
  }
}
