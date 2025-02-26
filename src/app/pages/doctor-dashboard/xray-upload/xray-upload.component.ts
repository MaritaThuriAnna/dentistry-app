import { Component } from '@angular/core';
import { ImageUploadService } from '../../../services/image-upload.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

interface Patient {
  userId: string;
  surname: string;
  forname: number;
  email: string;
  telNr: string;
  role: string;
  profilePictureUrl: string;
}


@Component({
  selector: 'app-xray-upload',
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './xray-upload.component.html',
  styleUrl: './xray-upload.component.css'
})
export class XrayUploadComponent {
  selectedFile: File | null = null;
  uploadMessage = '';
  patients: Patient[] = [];
  patientId: string = '';
  doctorId: string = '';

  isUploading = false;

  constructor(
    private imageUploadService: ImageUploadService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.http.get<Patient[]>('http://localhost:8082/User/ReadAll').subscribe((data) => {
      this.patients = data.filter(user => user.role === 'PATIENT');
    });

    // Get patientId from URL query params
    this.route.queryParams.subscribe(params => {
      this.patientId = params['userId'] || '';
    });

    // Fetch logged-in doctor's ID
    this.doctorId = this.authService.getLoggedInUserId();
  }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    console.log("file: ", this.selectedFile);
    console.log("patient id: ", this.patientId);
    console.log("doctor id: ", this.doctorId);

    if (!this.selectedFile || !this.patientId || !this.doctorId) {
      this.uploadMessage = 'Please select a patient and file.';
      return;
    }

    this.isUploading = true;

    this.imageUploadService.uploadImage(this.selectedFile, this.patientId, this.doctorId)
      .subscribe({
        next: (response) => {
          this.uploadMessage = `Upload successful!`;
          console.log('File uploaded successfully:', response.fileUrl);
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Upload Error:', err);
          this.uploadMessage = 'Upload failed. Please try again.';
          this.isUploading = false;
        }
      });
  }
}
