import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  DownloadPDFService,
  IInvoiceLearnerName,
  IInvoice
} from "../../../../../services/others/download-pdf.service";

import { PostEmailServiceService } from "../../../../../services/http/post-email-service.service";

@Component({
  selector: 'app-admin-send-payment-email',
  templateUrl: './admin-send-payment-email.component.html',
  styleUrls: ['./admin-send-payment-email.component.css']
})
export class AdminSendPaymentEmailComponent implements OnInit {

  public emailForm: FormGroup;
  public errorMessage: string;

@Input() learnlist;
@Input() selectArray;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private downloadPDFService: DownloadPDFService,
    private emailService: PostEmailServiceService
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      title: [''],
      contents: [''],
      attachment: [''],
      selectAttachment: new FormControl()
    });
  }

  checkAttachmentClick(){

  }

  onSubmit(){

    for(let i=0; i<this.selectArray.length; i++){
      if(true == this.selectArray[i]){
        var email = this.learnlist[i].Learner.Email;
        var firstName = this.learnlist[i].Learner.FirstName;
        var lastName = this.learnlist[i].Learner.LastName;
        var name = firstName + " " + lastName;
        var title = this.emailForm.value.title;
        var contents = "<h3>Hello " + firstName + "</h3><br><p>" + this.emailForm.value.contents + "</p>";
        // console.log("debug", contents);
 
        const learnerName = {} as IInvoiceLearnerName;
        learnerName.firstName = firstName;
        learnerName.lastName = firstName;
        learnerName.Email = email;

        let para2 = this.downloadPDFService.downloadPDF_blob(learnerName, this.learnlist[i].Invoice, this.learnlist[i].Learner.Org);

        let para1 = {
          MailTo : email,
          // MailTo : "edwin.zhu02@gmail.com",
          MailTitle : title,
          MailContent : contents,
          MailToName : name,
        };

        let submit = new FormData();
        submit.append('Mail', JSON.stringify(para1));
        if(this.emailForm.value.selectAttachment){
          submit.append('Attachment', para2);
        }
        

        this.emailService.postEmail(submit).subscribe((res) => {

          console.log(res);
          this.activeModal.close();
        },
        (err) => {
          Swal.fire({
            title: 'Server error!',
            type: 'error',
            showConfirmButton: true,
          });
        });
      }
    }

  }  

  // backendErrorHandler(err) {
  //   console.warn(err)
  //   if (err.error.ErrorMessage != null) {
  //     this.errorMessage = err.error.ErrorMessage;
  //   }
  //   else {
  //     this.errorMessage = 'Error! Please check your input.'
  //   }
  // }  
}
