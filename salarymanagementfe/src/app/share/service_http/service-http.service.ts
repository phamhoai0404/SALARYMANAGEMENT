import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServiceHttpService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // Authorization: 'my-auth-token',
            // Authorization: 'Basic ' + btoa('username:password'),
        }),
    };
    private URL_BASIC = 'http://localhost:8088/api'
    private URL_PAYROLL= this.URL_BASIC +  '/payroll';
    private URL_DURATION= this.URL_BASIC + '/duration';

    constructor(private http: HttpClient) { }

    getAllPayroll (){
        return this.http
            .get<any>(this.URL_PAYROLL + '/find', this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    getAllBoardPayroll(){
        return this.http
            .get<any>(this.URL_DURATION + '/find', this.httpOptions)
            .pipe(catchError(this.handleError));
    }
    editOneRecordPayroll(data){
        console.log("vào edit one http ", data);
        const hoa = this.URL_PAYROLL + '/edit/' +  data.id;
        console.log("Đường dẫn" , hoa);
        return this.http
            .put<any>(this.URL_PAYROLL + '/edit/' +  data.id, data, this.httpOptions )
            .pipe(catchError(this.handleError));
    }
    deleteOneRecordPayroll(data){
        return this.http
            .delete<any>(this.URL_PAYROLL +'/delete/' + data.id , this.httpOptions)
            .pipe(catchError(this.handleError));
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
