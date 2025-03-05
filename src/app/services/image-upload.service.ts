import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    private apiUrl = 'http://localhost:8083/Images/Upload';

    constructor(private http: HttpClient) { }

    uploadImage(file: File, patientId: string, uploadedBy: string): Observable<{ fileUrl: string }> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('patientId', patientId);
        formData.append('uploadedBy', uploadedBy);
      
        return this.http.post<{ fileUrl: string }>(this.apiUrl, formData).pipe(
          catchError(this.handleError)
        );
      }
      

    private handleError(error: HttpErrorResponse) {
        console.error('Upload Error:', error);
        return throwError(() => new Error(error.message || 'Upload failed'));
    }
}
