import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserCrudService } from '../../../../services/user_crud.service';

interface Patient {
  userId: string;
  surname: string;
  forname: string;
  email: string;
  telNr: string;
  role: string;
  profilePictureUrl: string;
  gender?: string;
  address?: string;
  medicalHistory?: { 
    allergies: string; 
    conditions: string[]; 
    previousTreatments: string[] 
  };
  appointments?: { 
    date: string; 
    type: string; 
    status: string 
  }[];
  xrayRecords?: { 
    image: string; 
    analysis: string 
  }[];
  doctorNotes?: string;
}

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink, NgFor, FormsModule, NgIf],
  standalone: true,
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  patientId!: string;
  patient: Patient = {
    userId: '',
    surname: '',
    forname: '',
    email: '',
    telNr: '',
    role: '',
    profilePictureUrl: '',
    gender: '',
    address: '',
    medicalHistory: {
      allergies: '',
      conditions: [],
      previousTreatments: []
    },
    appointments: [],
    xrayRecords: [],
    doctorNotes: ''
  };

  constructor(private route: ActivatedRoute, private userService: UserCrudService) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('id')!;

    this.userService.getUserById(this.patientId).subscribe((data) => {
      this.patient = { 
        ...this.patient, // ✅ Keeps default values for missing fields
        ...data 
      };
    });
  }
}