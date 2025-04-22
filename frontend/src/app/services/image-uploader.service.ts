import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';


export const BackendURL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  uploadImage(image: File): Observable<string> {
    console.log(`we are uploading fake upload ${image.name}`);
    return of('https://random.imagecdn.app/500/150').pipe(delay(3000));
  }

}
