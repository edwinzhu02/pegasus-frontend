import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';
import { SessionsService } from '../../services/http/sessions.service';
// import { SessionsService } from '../../../assets/images/Avatar/';
// import {Router}

interface IPostModel{
  id:number;
  lessonId:number;
  role:number;
  MessageContent:string;
}
interface IMsgModel{
  message:string;
  time:string;
  avatar:string;
  incoming:boolean;
  name:string;
}
@Component({
  selector: 'app-messgeboard',
  templateUrl: './messgeboard.component.html',
  styleUrls: ['./messgeboard.component.css']
})
export class MessgeboardComponent implements OnInit {
  @Input() params;
  
  role:number;
  lessonId:number;
  id:number;
  message:string;
  messages=[];
  logo="../../../assets/images/Avatar/able.png";
  isloading=false;
  
  constructor(private router:Router,
      private route:ActivatedRoute,
      private sessionsService:SessionsService) { }

  ngOnInit() {
    console.log(this.params);
    if (this.parseParams()==false)
      alert("error");
    this.getData();
  }
  parseParams(){
    try {
      this.role=this.params.role;
      this.lessonId=this.params.lessonId;
      this.id=this.params.id;
    } catch (error) {
      return false;
    }
    return true;
  }
  parseResult(data){
    // messages=[
    //   {
    //     colorClass:"green",
    //     avatar:environment.photoUrl+"assets/images/Avatar/teacher.jpg",
    //     textPosClass:"right",
    //     isSelf:true,
    //     message:"Hello. How are you today? First pig",
    //     timePosClass:"time-right",
    //     time:"11:00"
    //   },
    this.messages=[];
    data.forEach(element => {
      const msg={} as IMsgModel;      
      msg.message = element.Message;
      msg.time = String(this.convertDate(element.CreatedAt));
      msg.incoming=this.isIncoming(element);
      
      if (element.StaffId !=null){
        msg.name='Receptionist';
        msg.avatar="../../../assets/images/Avatar/able.png"; 
      }
        
      else if (element.TeacherId !=null){
        msg.name=(element.Teacher.FirstName).toUpperCase();
        msg.avatar="../../../assets/images/Avatar/teacher.jpg"; 
      }
      else {
        msg.name=element.Learner.FirstName.toUpperCase()+' '+element.Learner.LastName.toUpperCase();
        msg.avatar="../../../assets/images/Avatar/student.jpg"; 
      }
        

      this.messages.push(msg);
    });
    console.log(this.messages);
  }
  async getData(){
    const res = await this.sessionsService.getMsgs(this.lessonId).toPromise()
      .then(res =>{
        console.log(res)
        this.parseResult(res['Data']);
      })
      .catch(err =>alert(err));
  }
  async send(){
    const postMsg = {} as IPostModel; 

    this.isloading=true;
    postMsg.id=this.id;
    postMsg.lessonId=this.lessonId;
    postMsg.role = this.role;
    postMsg.MessageContent = this.message;
    console.log(postMsg);
    await this.postData(postMsg);
    //  this.addList( this.message);
    await this.getData();
    this.isloading=false;
  }
  isIncoming(element){
    if (this.role==1){//teacher
      if (element.TeacherId==this.id) return true;        
    }else if (this.role==4){//learner
      if (element.LearnerId==this.id) return true;        
    }
    else{
      if (element.StaffId!=null) return true;   
    }
    return false;
  }
  async postData(model){
    const res = await this.sessionsService.postMsg(model).toPromise()
      .then(res =>{
        console.log(res);
        this.message='';
      })
      .catch(err =>alert(err.toString()));
  }
  // addList(MessageContent){
  //   const msg = {} as IMsgModel;
  //   msg.message = MessageContent;
  //   msg.time =  Date.now().toString();
  //   msg.avatar="../../../assets/images/Avatar/teacher.jpg";        
  //   msg.incoming=true;
  //   this.messages.push(msg);
  // }
  // str format is '2016-11-09T18:00:01'
  convertDate(str){
    var date = new Date(str);
    return date;
  }
}
