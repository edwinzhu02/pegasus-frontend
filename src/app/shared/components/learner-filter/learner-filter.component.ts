import { Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/http/teachers.service';
import { CoursesService } from 'src/app/services/http/courses.service';


interface IOption {
  id: number;
  name: string ;
}
interface ISelectedItem {
  teacherId: number;
  branchId: number ;
  courseTypeId:number;
  instrumentId:number;
  paymentStatus:number;
}

@Component({
  selector: 'app-learner-filter',
  templateUrl: './learner-filter.component.html',
  styleUrls: ['./learner-filter.component.css']
})

//getCourseType
//getCourseCategories
export class LearnerFilterComponent implements OnInit {
  
  @Output() filter: EventEmitter<any> = new EventEmitter();
  public teachers:IOption[]=[];
  public instruments:IOption[]=[];
  public courseTypes:IOption[]=[];
  public branchs:IOption[]=[];
  public payments:IOption[]=[];
  public thisUserbranchs=[];
  public selectedItem:ISelectedItem={
    teacherId:-1,
    branchId:-1,
    courseTypeId:-1,
    instrumentId:-1,
    paymentStatus:-1
  };

  public isError:boolean=false;
  constructor(private teachersService:TeachersService,
      private coursesService:CoursesService) { }

  ngOnInit() {
    let getTeachersInfo = this.teachersService.getTeachersInfo();
    let getOrgs=this.coursesService.getOrgs();
    let getCourseType=this.coursesService.getCourseType();
    let getCourseCategories = this.coursesService.getCourseCategories()
    forkJoin([getTeachersInfo,getOrgs,getCourseType,getCourseCategories]).subscribe(
      res=>{
        this.teachers = this.parseTeacher( res[0]['Data']); 
        this.branchs = this.parseBranch( res[1]['Data']); 
        this.courseTypes = this.parseCourseType( res[2]['Data']);         
        this.instruments = this.parseInstrument( res[3]['Data']);         
        this.payments = this.makePaymentType();
      },
      err=>{
        this.isError = true;
      }
    )
  }
  getThisBranch(){
    // this.thisUserbranchs = localStorage.getItem("OrgId");
    this.thisUserbranchs =JSON.parse(localStorage.getItem("OrgId"));
  }
  //this.teachersService.getTeachersInfo()
  getData(service,parseData,outData){
    service.subscribe(
      res =>{
        let data = res['Data'];
        parseData(data,outData);
      },
      err =>{
        this.isError = true;
      }
    )
  }
  parseTeacher(data){
    let outData=[];
    data.forEach(e => {
      outData.push({
         id:Number(e.TeacherId),
         name:e.FirstName+' '+e.LastName
       })
    });
    return outData;
  }
  parseInstrument(data){
    let outData=[];
    data.forEach(e => {
      outData.push({
         id:Number(e.CourseCategoryId),
         name:e.CourseCategoryName
       })
    });
    return outData;
  }
  parseBranch(data){
    let outData=[];
    data.forEach(e => {
      outData.push({
         id:Number(e.OrgId),
         name:e.Abbr
       })
    });
    return outData;
  }
  parseCourseType(data){
    let outData=[];
    data.forEach(e => {
      outData.push({
         id:Number(e.PropValue),
         name:e.PropName
       })
    });
    return outData;
  } 

  makePaymentType(){
    let outData=[];

      outData.push({
         id:Number(0),
         name:"not paid"
       });

       outData.push({
        id:Number(1),
        name:"paid"
      });

    return outData;
  }   

  onChange(){
    this.filter.emit(this.selectedItem);
  }
}
