import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';

interface Patient {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  date: string;
  reason: string;
}

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class AppointmentComponent {
  patients: Patient[] = [];
  selectedPatientId: number | null = null;
  appointmentDate: Date | null = null;
  appointmentReason: string = '';
  appointments: Appointment[] = [];
  doctorId: number = 1;  // assuming doctor ID is 1 for now

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load patient data from JSON
    this.http.get<Patient[]>('patient-data.json').subscribe((data) => {
      this.patients = data;
    });
  }

  scheduleAppointment() {
    if (!this.selectedPatientId || !this.appointmentDate || !this.appointmentReason.trim()) {
      alert("Please select a patient, date, and enter a reason.");
      return;
    }

    const selectedPatient = this.patients.find(p => p.id === this.selectedPatientId);
    if (!selectedPatient) return;

    const newAppointment: Appointment = {
      id: this.appointments.length + 1,
      patientId: this.selectedPatientId,
      patientName: selectedPatient.name,
      doctorId: this.doctorId,
      date: this.appointmentDate.toISOString().split('T')[0],
      reason: this.appointmentReason
    };

    this.appointments.push(newAppointment);
    this.clearForm();
  }

  clearForm() {
    this.selectedPatientId = null;
    this.appointmentDate = null;
    this.appointmentReason = '';
  }
}
