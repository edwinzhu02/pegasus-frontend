export class SessionEdit {
  LessonId: number;
  LearnerId: number;
  RoomId: number;
  TeacherId: number;
  OrgId: number;
  Reason: string;
  BeginTime: Date;
  EndTime: Date;
  constructor(LessonId, LearnerId, RoomId, TeacherId, OrgId, Reason, BeginTime, EndTime) {
    this.LessonId = LessonId;
    this.LearnerId = LearnerId;
    this.RoomId = RoomId;
    this.TeacherId = TeacherId;
    this.OrgId = OrgId;
    this.Reason = Reason;
    this.BeginTime = BeginTime;
    this.EndTime = EndTime;
  }
}
