import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  patientId: number;

  constructor(private route: ActivatedRoute) {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
