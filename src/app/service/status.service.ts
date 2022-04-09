import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { ContactRequest } from './types';
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusUrl = '/api/status';

  constructor(private http: HttpClient) { }

  // Get the status
  getStatus(): Promise<void | any> {
    return this.http.get('/api/status')
               .toPromise()
               .then(response => console.log(response))
               .catch(this.error);
  }

  sendEmail(req: ContactRequest) {
    return this.http.post('/api/sendmail', {...req});
    // .subscribe(
    //   ret=>{
    //     console.log('done')
    //     console.log(ret)
    //   },
    //   (err)=>{

    //   }
    // );
    // .then(response => console.log(response))
    // .catch(this.error);
              
  }

  // Error handling
  private error (error: any) {
    let message = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
