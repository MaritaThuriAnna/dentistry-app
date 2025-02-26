import { Component } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { ImageUploadService } from '../../../services/image-upload.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-xray-upload',
  imports: [NgIf],
  templateUrl: './xray-upload.component.html',
  styleUrl: './xray-upload.component.css'
})
export class XrayUploadComponent {
  selectedFile: File | null = null;
  uploadMessage = '';

  constructor(private imageUploadService: ImageUploadService) { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first.';
      return;
    }

    const patientId = '0902be25-d687-440f-813b-d10ceef13d44';
    const uploadedBy = '153fddaa-d8c8-4d47-bb57-5535fa604a57';

    this.imageUploadService.uploadImage(this.selectedFile, patientId, uploadedBy)
    .subscribe({
      next: (response) => {
        this.uploadMessage = `Upload successful!`;
        // console.log('File Uploaded:', response.fileUrl);
      },
      error: (err) => {
        console.error('Upload Error:', err);
        // this.uploadMessage = `Upload failed: ${err.message}`;
      }
    });
  }
}
