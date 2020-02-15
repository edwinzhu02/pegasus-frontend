import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-parent-Registration-Form',
  templateUrl: './parent-Registration-Form.component.html',
  styleUrls: ['./parent-Registration-Form.component.css']
})
export class ParentRegistrationFormComponent implements OnInit {
  public parentRegForm: FormGroup
  parent = []
  get parentForm() { return this.parentRegForm.get('parentForm') as FormArray; }
  @Input() command
  @Input() whichLearner
  @Input() newLearner
  constructor(private fb: FormBuilder, ) { }

  ngOnInit() {
    console.log(this.newLearner)
    this.parentRegForm = this.fb.group({
      parentForm: this.fb.array([])
    });
    this.setForm()
  }

  setForm() {
    if (this.command == 1) {
     this.parentForm.push(
       this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', ],
        Relationship: ['', Validators.required],
        ContactNum: [this.newLearner.value.ContactNum, Validators.required],
        Email: [this.newLearner.value.Email, [Validators.required, Validators.email]]
      }));
    }
    else if (this.command == 2) {
     this.whichLearner.Parent.map(p => {
      this.parentForm.push(
        this.fb.group({
          FirstName: [p.FirstName ? p.FirstName : '', Validators.required],
          LastName: [p.LastName ? p.LastName : '', ],
          Relationship: [p.Relationship ? p.Relationship : '', Validators.required],
          ContactNum: [p.ContactNum ? p.ContactNum : '', Validators.required],
          Email: [p.Email ? p.Email : '', [Validators.required, Validators.email]]
        }))
      })
     }

  }

  resetParent() {
    this.parentForm.reset();
  }
  deleteParent(i) {
    this.parentForm.removeAt(i);
  }
  addParent() {
    this.parentForm.push(
      this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Relationship: ['', Validators.required],
        ContactNum: ['', Validators.required],
        Email: ['', Validators.required, Validators.email],
      })
    );
    // console.log('addParent', this.parentForm.value)
  }
}
