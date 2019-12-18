import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SessionsService {
  baseUrl = environment.baseUrl;
  token: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.prepareHeaders();
  }

  // API Request headers
  prepareHeaders() {
    this.token = localStorage.getItem("Token");
    return (this.httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("Token")
    }));
  }

  // Session View Admin & Session View Tutor
  getReceptionistRoom(orgId) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(this.baseUrl + "room/forCalendar/"+orgId, {
      headers: this.httpHeaders
    });
  }
  getTeachers(){
    return this.http.get<any>(this.baseUrl + "teacher", {
      headers: this.httpHeaders
    });
  }
  getReceptionistLesson(date,orgId) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl +
        "lesson/GetLessonsForReceptionist/" +
        orgId +
        "/" +
        date,
      { headers: this.httpHeaders }
    );
  }

  getTeacherLesson(teacherId, beginDate) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl +
        "lesson/GetLessonsForTeacher/" +
        teacherId +
        "/" +
        beginDate
    );
  }

  getReceptionistLessonBetweenDate(beginDate, endDate) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl +
        "lesson/GetLessonsBetweenDate/" +
        localStorage.getItem("userID") +
        "/" +
        beginDate +
        "/" +
        endDate
    );
  }

  // Session List
  DeleteSession(lessonId, reason) {
    // console.log(this.httpHeaders);
    // @ts-ignore
    return this.http.put<any>(
      this.baseUrl +
        "session/" +
        lessonId +
        "/" +
        reason +
        "/" +
        localStorage.getItem("userID")
    );
  }

  GetTeachherFilter(courseId) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl + "teacherfilter/sessionEditFilter/" + courseId
    );
  }

  SessionEdit(SessionModel) {
    // console.log(this.httpHeaders);
    return this.http.put<any>(
      this.baseUrl + "LessonRearrange/" + localStorage.getItem("userID"),
      SessionModel
    );
  }
  GroupSessionEdit(SessionModel) {
    // console.log(this.httpHeaders);
    return this.http.put<any>(
      this.baseUrl + "LessonRearrange/PutGroupMakeupLesson/" + localStorage.getItem("userID"),
      SessionModel
    );
  }
  SessionCompleted(lessonId, reason) {
    // console.log(this.httpHeaders);
    // @ts-ignore
    return this.http.put<any>(
      this.baseUrl + "session/Confirm/" + lessonId + "/" + reason
    );
  }

  SessionReSchedule(lessonId, reason) {
    // console.log(this.httpHeaders);
    // @ts-ignore
    return this.http.put<any>(
      this.baseUrl +
        "LessonReschedule/" +
        lessonId +
        "/" +
        localStorage.getItem("userID") +
        "/" +
        reason
    );
  }

  GetSessionEditRoom(TeacherId, OrgId, beginTime) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl + "Room/" + TeacherId + "/" + OrgId + "/" + beginTime
    );
  }

  GetRoomAndBranch() {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl + "Orgs/OrgAndRoom"
    );
  }
  GetTeacherByOrg(orgId:number) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl + "Teacher/GetTeacherByOrg/"+orgId
    );
  }
  GetRemainingByLearnerAndCourse(learnerId:number,courseInstanceId:number) {
    // console.log(this.httpHeaders);
    return this.http.get<any>(
      this.baseUrl + "session/GetRemainingAmount/"+learnerId+"/"+courseInstanceId
    );
  }  
  GetSessionEditRoomTwo(OrgId, StartTime, EndTime) {
    return this.http.get<any>(
      this.baseUrl +
        "RoomAvailableCheck/checkbylesson/" +
        OrgId +
        "/" +
        StartTime +
        "/" +
        EndTime
    );
  }
  getOrgs(){
    return this.http.get<any>(
      this.baseUrl + "orgs/"
    );    
  }
}
