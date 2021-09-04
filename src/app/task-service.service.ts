import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(  private http : HttpClient) { }

  getTasks (){
    return this.http.get("https://600e7b0e3bb1d100179df4d5.mockapi.io/Tasks")
  }
}
