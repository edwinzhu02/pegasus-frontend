import { Component, OnInit } from '@angular/core';
import { LearnersService } from '../../../../../services/http/learners.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-name-module',
  templateUrl: './search-name-module.component.html',
  styleUrls: ['./search-name-module.css']
})
export class SearchNameModuleComponent implements OnInit {
    a = false;
    // learners
    public name: any = 'type..';
    public learners: any;
    public data: any;
    public errorMsg;
    public show: boolean;
    // ng-modal variable
    closeResult: string;

    constructor(
      private modalService: NgbModal,
      private learnersListService: LearnersService,
      private fb: FormBuilder,
      private router: Router
    ) {}

    // form-builder
    // learners information
    registrationFormL = this.fb.group({
      learnerId: [''],
      learnerName: [{ value: null, disabled: true }],
      lastName: [{ value: null, disabled: true }],
      middleName: [{ value: null, disabled: true }],
      age: [''],
      email: [{ value: null, disabled: true }],
      phone: [{ value: null, disabled: true }],
      payment: [''],
      schedule: [''],
      owning: [''],
      address: ['']
    });

    searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    get search() {
      return this.searchForm.get('search');
    }

    // searchEnter(event, content) {
    //   if (event.key === '') {
    //     open(content);
    //   }
    // }
  open(content) {
      // search learner
      this.learnersListService
        .getLearners(this.searchForm.value.search)
        .subscribe(data => {
<<<<<<< HEAD
          // return (console.log(data))
          if (!data['LearnerId']) {this.registrationFormL.value.learnerId = 0;}

          this.learners = data['Data'][0];
          this.data = data['Data'];

=======
          //return (console.log(data))
          if (!data['LearnerId']) {this.registrationFormL.value.learnerId = 0; console.log(this.learners)}
          this.learners = data['Data'][0];
          this.data = data['Data'];
          console.log(this.learners)
>>>>>>> f8e711f23203ba53fc29c6ac4d817adfc1425c18
          this.registrationFormL.patchValue({
            learnerId: this.learners.LearnerId,
            learnerName: this.learners.FirstName,
            lastName: this.learners.LastName,
            email: this.learners.Email,
            phone: this.learners.ContactNum,
            address: this.learners.Address
          });
<<<<<<< HEAD
          console.log('this.learners.LearnerId')
          this.onChangePath(this.learners.LearnerId);
=======

          // this.onChangePath(this.learners.LearnerId);


          if (this.data.length > 1) {
            this.show = true;
          } else {
            this.show = false;
          }
>>>>>>> f8e711f23203ba53fc29c6ac4d817adfc1425c18

          if (this.data.length > 1) {
            this.modalService
              .open(content, { ariaLabelledBy: 'modal-basic-title' })
              .result.then(
                result => {
                  this.closeResult = `Closed with: ${result}`;
                },
                reason => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
              );
          }
<<<<<<< HEAD
        },
          (error) =>
          // alert(error);
          console.log(error)
          );
=======
          this.onChangePath(this.learners.LearnerId);
        }, err => console.log(err));
>>>>>>> f8e711f23203ba53fc29c6ac4d817adfc1425c18
    }

    onChangePath(id){
      console.log(id);
<<<<<<< HEAD
      // this.router.navigate(['/payment/invoice', id]);
      this.router.navigate(['/payment/products/', id]);
      // this.router.navigate(['/payment/other', id]);
=======
      this.router.navigate(['/payment/invoice/', id]);
      // this.router.navigate(['/testcontent']);
>>>>>>> f8e711f23203ba53fc29c6ac4d817adfc1425c18
      console.log('route, ', this.router.url);
    }

    // middle name method
    selectChange(dis) {
      const i: number = dis.value;
      if (!isNaN(Number(i))) {
        this.registrationFormL.patchValue({
          learnerId: this.data[i].LearnerId,
          learnerName: this.data[i].FirstName,
          lastName: this.data[i].LastName,
          email: this.data[i].Email,
          phone: this.data[i].ContactNum
        });
        this.learners.learnerId = this.data[i].LearnerId;
        this.onChangePath(this.learners.learnerId);
      }
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  ngOnInit() {
  }

}
