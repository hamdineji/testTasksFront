import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { TaskServiceService } from './task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontapp';
  Tasks = [{Task_name : "" , assigness : "", Priority : "" , Due_date : 0 }] ;
  TaskName ="" ;
  Assignees =""; 
  Priority ="" ; 
  Date : Number = 0  ;
  AllTasks : Array<any> = []
  constructor( private TaskService :TaskServiceService ){

  }

  ngOnInit(): void {
   this.TaskService.getTasks().subscribe((res : any )=>{
     this.Tasks=[]
    res.forEach((element : any) => {
      switch(element.Priority) {
        case 1 : {
          element.Priority = "Critical" ;
          break;
        }
        case 2 : {
          element.Priority = "High" ;
          break
        }
        case 3 : {
          element.Priority = "Medium" ;
          break
        }
        case 4 : {
          element.Priority = "Low" ;
          break
        }
      }
      this.Tasks.push(element)
      this.AllTasks.push(element)
    });
   })}
    timeConverter(UNIX_timestamp: number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  onChangeName($event : String){
    if($event){
    this.Tasks=this.AllTasks
      this.Tasks.forEach((element : any)=>{
        if(element.Task_name == $event){
          console.log("element", element)
          this.Tasks=[element]
        }
      })
    }
    else {
this.Tasks= this.AllTasks
    }
   
  }
  onChangeAssignees($event : String){
    if($event){

    
    this.Tasks= []
    this.AllTasks.forEach((element : any)=>{
      if(element.assigness == $event){
        this.Tasks.push(element)
      }
    })
  }
  else {
    this.Tasks= this.AllTasks
  }
  }
  onChangePriority($event : String){
    if($event){
    this.Tasks= []
    this.AllTasks.forEach((element : any)=>{
      if(element.Priority == $event){
        this.Tasks.push(element)
      }
    })}
    else{
      this.Tasks=this.AllTasks
    }


  }
  dateToTimeStamp(myDate : any){
   myDate.split("-");
var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
return newDate.getTime()
  }
  onChangeDate($event : Date){
  console.log((new Date($event)).getTime())
  this.Tasks= [] ; 
  this.AllTasks.forEach((element :  any)=>{
if(new Date(element.Due_date).getTime() < (new Date($event)).getTime()){
  console.log("elemeny", element)
  this.Tasks.push(element)
  }
} 
)}

  
  }