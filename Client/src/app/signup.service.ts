import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// interface for location
// interface Location{
//   latitude:string;
//   longitude:string;
//   city:string;
// }

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
//Put api for SignUp page
  signUpUserDetails(details){
    return this.http.post<any>(environment.apiEndPointUrl + '/api/users', details);
  }
  //Put api for CustomerExperience Page
  customerExperienceDetails(details, id, screen) {
   return this.http.post<any>(environment.apiEndPointUrl + '/api/customer/customers/'+id+'/'+screen, details);
  }
//Put api for Technology Page
  technologyDetails(details, id, screen) {
    return this.http.post<any>(environment.apiEndPointUrl + '/api/technology/'+id+'/'+screen, details);

  }
  //Update api for details page
  socialMediaDetails(details, id) {
    return this.http.put<any>(environment.apiEndPointUrl + '/api/technology/technology_extra_info/'+id, details);
   }

  getIpAddress() {
    return this.http
      .get('https://api.ipify.org/?format=json')
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

