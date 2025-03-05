import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../services/auth.service';

interface Patient {
  userId: string;
  surname: string;
  forname: string;
  role: string;
}

interface Appointment {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: string;
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
  selectedPatientId: string | null = null;
  appointmentDate: Date | null = null;
  appointmentReason: string = '';
  appointments: Appointment[] = [];
  doctorId: string = '';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.http.get<Patient[]>('http://localhost:8082/User/ReadAll').subscribe((data) => {
      this.patients = data.filter(user => user.role === 'PATIENT');
    });

    this.doctorId = this.authService.getLoggedInUserId();
  }

  scheduleAppointment() {
    if (!this.selectedPatientId || !this.appointmentDate || !this.appointmentReason.trim()) {
      alert("Please select a patient, date, and enter a reason.");
      return;
    }

    const selectedPatient = this.patients.find(p => p.userId === this.selectedPatientId);

    if (!selectedPatient) return;

    const newAppointment: Appointment = {
      id: this.appointments.length + 1,
      patientId: this.selectedPatientId,
      patientName: `${selectedPatient.forname} ${selectedPatient.surname}`,
      doctorId: this.doctorId,
      date: this.appointmentDate.toISOString().split('T')[0],
      reason: this.appointmentReason
    };

    // TODO: Send the new appointment to the backend
    console.log("New appointment:", newAppointment);
    
    this.clearForm();
  }

  clearForm() {
    this.selectedPatientId = null;
    this.appointmentDate = null;
    this.appointmentReason = '';
  }
}
