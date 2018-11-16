import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
apiUrl:string='http://localhost:11655/api/AngularApi/';
  constructor(private http:HttpClient) { }
  getCountries(): Observable<any>{
    return this.http.get('../../../assets/countries.json')  
  }
  getState():Observable<any>{
    return this.http.get('../../../assets/states.json')
  }
  getCity():Observable<any>{
    return this.http.get('../../../assets/cities.json')
  }
  addUser(user:any):Observable<any>{
    return this.http.post(this.apiUrl + 'AddUser' , user).pipe(map((data:HttpResponse<any>) => {
    return data;
    }
    ));
  }
  getUserList():Observable<any>{
    return this.http.get(this.apiUrl+'getData').pipe(map((data:HttpResponse<any>) =>{
      return data;
    }))
  }
  getUserById(id:number):Observable<any>{
    return this.http.get(this.apiUrl + 'GetUserbyId?Id=' +id).pipe(map((data:HttpResponse<any>) =>{
      return data;
    } ))
  }
  deleteUser(id:number):Observable<any>{
    return this.http.get(this.apiUrl + 'deleteUser?Id=' +id).pipe(map((data:HttpResponse<any>) =>{
      return data;
    }))
  }
}
