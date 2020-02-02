import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class LearnersService {
  httpHeaders: HttpHeaders;
  token: string

  private baseUrl: any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // API Request headers
  prepareHeaders() {
    this.token = localStorage.getItem('Token')
    this.httpHeaders = new HttpHeaders({ 'Authorization': "" + localStorage.getItem('Token') })
  }

  getLearners(name) {
    return this.http.get<any[]>(this.baseUrl + 'learner/' + name)
    //   .pipe(
    //     catchError(this.errorHandler)
    //   );
    // }
    //  errorHandler(error: HttpErrorResponse){
    //   return Observable.throw(error.message || "Server Error");
    //  }
  }

  getLearnerList() {
    return this.http.get(this.baseUrl + 'learner')
  }

  getLearnerById(id) {
    return this.http.get(this.baseUrl + 'learner/GetLearnerById/'+id)
  }
  getOrgById(id) {
    return this.http.get(this.baseUrl + 'learner/GetOrgByLearner/'+id)
  } 
  getLearnerByIdTimePick(id) {
    return this.http.get(this.baseUrl + 'lesson/GetLessonsForLearner/'+id)
  }

  deleteLearner(LearnerId): any {
    return this.http.delete(this.baseUrl + 'learner/' + LearnerId);
  }

  //get learn form data
  getLookups(typeId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'Lookups/' + typeId);
  }

  learnerDayOff(dayOffModel) {
    return this.http.post(this.baseUrl + 'LearnerDayOff', dayOffModel);
  }

  cancelLessons(cancelLessonsModel) {
    return this.http.put(this.baseUrl + 'session', cancelLessonsModel);
  }

  GetOrgRoom() {
    return this.http.get(this.baseUrl + 'Orgs/OrgAndRoom');
  }

  PeriodCourseChange(model) {
    return this.http.post(this.baseUrl + 'PeriodCourseChange', model);
  }

  getRemainingCourses(LearnerId: number): Observable<any> {
    return this.http.get(this.baseUrl + "session/GetMakeupSessions/" + LearnerId)
  }
  getGroupMakeupLesson(instanceId: number): Observable<any> {
    return this.http.get(this.baseUrl + "session/GetGroupMakeupSessions/" + instanceId)
  }

  getArrangedLesson(LearnerId: number): Observable<any> {
    return this.http.get(this.baseUrl + "Lesson/" + "GetArrangedLessonsByLearner/" + LearnerId)
  }

  getTeachers() {
    return this.http.get(this.baseUrl + 'teacher');
  }

  getLearnerPayment(learnerId ){
    return this.http.get(this.baseUrl+'Payment/'+'PaymentByLearner/'+learnerId )
  }

  getLearnerInvoice(learnerId){
    return this.http.get(this.baseUrl+'Invoice/'+ learnerId)
  }

  getLearnerLesson(learnerId){
    return this.http.get(this.baseUrl+'Lesson/'+'GetLessonsForLearner/'+learnerId)
  }

  getMakeUpLesson(learnerId){
    return this.http.get(this.baseUrl+'Session/'+'GetMakeupSessions/'+learnerId)
  }

  getWaitingInvoice(learnerId){
    return this.http.get(this.baseUrl+'InvoiceWaitingConfirms/'+learnerId)
  }
  GetTeacherRoomByOrgDayOfWeek(orgId, dayofweek) {
    return this.http.get(this.baseUrl + 'teacher/GetTeacherRoomByOrgDayOfWeek/' + orgId + '/' +  dayofweek);
  }

   GetTeacherByOrgDayOfWeek(orgId, dayofweek){
     return this.http.get(this.baseUrl+ 'Teacher/GetTeacherByOrgDayOfWeek/'+orgId+'/'+dayofweek);
   }
   GetTeacherByOrg(orgId){
    return this.http.get(this.baseUrl+ 'Teacher/GetTeacherByOrg/'+orgId);
  }

  GetAllAvailableTeacher(){
    return this.http.get(this.baseUrl+ 'Teacher/GetAllAvailableTeacher/');
  }  


  updateExpiryDate(awaitId,Qty): any {
    return this.http.put(this.baseUrl + 'LessonRearrange/' + awaitId+'/'+Qty,'');
  }
  makeUpSplitLesson(lessonId,isAfter,userId): any {
    return this.http.put(this.baseUrl + 'Session/MakeUpSplitLesson/' + lessonId+'/'+isAfter+'/'+userId,'');
  }
  getLessonsByCourseInstanceId(courseInstanceId): any {
    return this.http.get(this.baseUrl + 'lesson/GetLessonsByCourseInstance/' + courseInstanceId);
  }
}
