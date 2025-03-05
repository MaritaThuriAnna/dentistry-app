import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserCrudService } from '../../../services/user_crud.service';

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
    NgIf
  ]
})
export class AppointmentComponent {
  patients: Patient[] = [];
  selectedPatientId: string | null = null;
  appointmentDate: Date | null = null;
  appointmentReason: string = '';
  appointments: Appointment[] = [];
  doctorId: string = '';
  isScheduling: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private userService: UserCrudService) { }

  ngOnInit() {
    console.log("isScheduling: ", this.isScheduling);
    this.userService.getAllUsers().subscribe((data) => {
      this.patients = data.filter(user => user.role === 'PATIENT'); 
    });

    // TODO
    // Fetch all upcoming appointments
    // this.http.get<Appointment[]>('http://localhost:8082/Appointments/Upcoming').subscribe((data) => {
    //   this.appointments = data;
    // });

    this.route.queryParams.subscribe(params => {
      console.log("Query Params:", params); // Debugging log
      if (params['schedule'] === 'true' && params['patientId']) {
        this.isScheduling = true;
        this.selectedPatientId = params['patientId'];
      }
    });
  
    // Dummy scheduled appointments
    this.appointments = [
      {
        id: 1,
        patientId: '12345',
        patientName: 'John Doe',
        doctorId: this.doctorId,
        date: '2024-03-10',
        reason: 'Routine Checkup'
      },
      {
        id: 2,
        patientId: '67890',
        patientName: 'Jane Smith',
        doctorId: this.doctorId,
        date: '2024-03-15',
        reason: 'Tooth Extraction'
      },
      {
        id: 3,
        patientId: '54321',
        patientName: 'Alice Johnson',
        doctorId: this.doctorId,
        date: '2024-03-20',
        reason: 'Cavity Filling'
      }
    ];
    
    this.doctorId = this.authService.getLoggedInUserId();

    this.route.queryParams.subscribe(params => {
      if (params['schedule'] === 'true' && params['patientId']) {
        this.isScheduling = true;
        this.selectedPatientId = params['patientId'];
      }
    });
  }

  get selectedPatientName(): string {
    const patient = this.patients.find(p => p.userId === this.selectedPatientId);
    return patient ? `${patient.forname} ${patient.surname}` : 'Unknown';
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
    // this.http.post('http://localhost:8084/Appointments/Schedule', newAppointment).subscribe({
    //   next: () => {
    //     alert('Appointment Scheduled Successfully!');
    //     this.isScheduling = false; // Return to view mode
    //   },
    //   error: () => alert('Error scheduling appointment.')
    // });

    console.log("New appointment:", newAppointment);

    this.clearForm();
  }

  clearForm() {
    this.selectedPatientId = null;
    this.appointmentDate = null;
    this.appointmentReason = '';
  }
}
