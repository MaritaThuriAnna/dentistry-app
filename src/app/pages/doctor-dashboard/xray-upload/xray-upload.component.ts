import { Component } from '@angular/core';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-xray-upload',
  imports: [],
  templateUrl: './xray-upload.component.html',
  styleUrl: './xray-upload.component.css'
})
export class XrayUploadComponent {
  constructor(private imageService: ImageService) {}

  uploadXray(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const patientId = '550e8400-e29b-41d4-a716-446655440000';  
      const uploadedBy = '660e8400-e29b-41d4-a716-446655440000';

      this.imageService.uploadXray(file, patientId, uploadedBy).subscribe({
        next: (response) => {
          console.log('X-ray uploaded:', response);
          alert('X-ray uploaded successfully!');
        },
        error: (err) => {
          console.error('Upload error:', err);
          alert('Error uploading X-ray.');
        }
      });
    }
  }
}
