import { Component, OnInit } from '@angular/core';
import { NgbootstraptableService } from 'src/app/services/others/ngbootstraptable.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LearnersService } from 'src/app/services/http/learners.service';
import {  LearnerUpdateModalComponent } from '../learner-update-modal/learner-update-modal.component';
import {LearnerDeleteModalComponent } from '../learner-delete-modal/learner-delete-modal.component';
import {LearnerDetailModalComponent } from '../learner-detail-modal/learner-detail-modal.component';

@Component({
  selector: 'app-admin-learner-list',
  templateUrl: './admin-learner-list.component.html',
  styleUrls: ['./admin-learner-list.component.css']
})
export class AdminLearnerListComponent implements OnInit {
    //what columns showed in the info page, can get from back-end in the future. must as same as database
  public columnsToShow: Array<string> = ['FirstName', 'LastName', 'Gender', 'ContactNum', 'Email'];

  //learners data from servers
  public learnerList: Array<any>;

  //learner list copy. Using in searching method, in order to initialize data to original
  public learnerListCopy: Array<any>;

   //how many datas in learnerList
   public learnerListLength: number; 

  //errorMessage
  errorMessage:string;

  //search by which columns, determine by users
  public columnsToSearch: Array<string> = [];
  public currentPage: number = 1;
  public pageSize: number = 10;

  constructor(
    private LearnerListService: LearnersService,
    private ngTable: NgbootstraptableService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getDataFromServer()
  }


  //get data from server
  getDataFromServer() {
    this.LearnerListService.getLearnerList().subscribe(
      (res) =>  {
        console.log(res)
      //@ts-ignore
       this.learnerList = res.Data;
       //@ts-ignore
       this.learnerListCopy = this.learnerList;
       //@ts-ignore
       this.learnerListLength=res.Data.length;
       
      },
    (err) => {
      console.log(err); this.errorMessage="Wrong"
    }
    )
  }

  /*
    sort method
  */
 onSort(orderBy) {
  console.log(orderBy)
  this.ngTable.sorting(this.learnerList, orderBy);
}

  /*
    search method
  */
 onSearch(event) {
  if (this.columnsToSearch.length == 0) {
    return;
  }
  else {
    let searchString = event.target.value;
    this.learnerList = this.ngTable.searching(this.learnerListCopy, this.columnsToSearch, searchString);
    this.learnerListLength = this.learnerList.length;
  }
}

 /*
    Insert space before capital letter.
      eg: FirstName --> First Name 
  */
 AddSpaceInString(strToAdd) {
  return strToAdd.replace(/(?=[A-Z])/g, ' ');
}

 /*
    let user decide in which column to search 
  */
 showSearchingSelection(event) {
  let dropDownObj = document.getElementById('t_info_search_by_btn');
  event.target.attributes.flag = !event.target.attributes.flag;

  if (event.target.attributes.flag == true) {
    let searchingInputObj = document.getElementById('searchingInput');
    searchingInputObj['value'] = null;
    dropDownObj.style.display = 'inline-block';
  }
  else {
    dropDownObj.style.display = 'none';
  }
}


 ///////////////////////////////////////handler of angular-bootstrap modals/////////////////////////////////////
  /*
    pop up modals, when need to pop up a modal, call this method
    commands:
      0 --> Add new
      1 --> show details/show more
      2 --> Edit/update
      3 --> delete
  */
 popUpModal(command, whichLearner) {
  switch (command) {
    case 0:
      this.updateModal(command, whichLearner);
      break;
    case 1:
      this.detailModal(command, whichLearner)
      break;
    case 2:
      this.updateModal(command, whichLearner);
      break;
    case 3:
      this.deleteModal(command, whichLearner);
      break;
  }
}

/*
  update modal
*/
updateModal(command, whichLearner) {
  const modalRef = this.modalService.open(LearnerUpdateModalComponent, { size: 'lg' });
  let that = this;
  modalRef.result.then(that.refreshPage(that,command));
  modalRef.componentInstance.command = command;
  modalRef.componentInstance.whichLearner = whichLearner;
}

/*
  delete modal
*/
deleteModal(command, whichLearner) {
  const modalRef = this.modalService.open(LearnerDeleteModalComponent);
  let that = this;
  modalRef.result.then(that.refreshPage(that,command));
  modalRef.componentInstance.command = command;
  modalRef.componentInstance.whichLearner = whichLearner;
}

/*
  detail modal
*/
detailModal(command, whichLearner) {
  const modalRef = this.modalService.open(LearnerDetailModalComponent, { size: 'lg' });
  modalRef.componentInstance.command = command;
  modalRef.componentInstance.whichLearner = whichLearner;
}

/*
  After data modified(delete,add,update), refresh the page
*/
refreshPage(pointer,command) {
  return function () {
    let refreshFlag, learnerToDelete;
    [refreshFlag, learnerToDelete] = pointer.refreshService.getRefreshRequest();
    if (refreshFlag == true && command == 3) {
      //
      pointer.learnerList.forEach(function (current) {
        if (current.LearnerId === learnerToDelete) {
          pointer.learnerList.splice(pointer.learnerList.findIndex(i => i.TeacherId === learnerToDelete), 1)
          pointer.learnerListLength--;
        }
      })
    }
    else{
      pointer.getDataFromSever();
    }
  }
}
}
