import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-boardmodel',
  templateUrl: './boardmodel.component.html',
  styleUrls: ['./boardmodel.component.css']
})
export class BoardmodelComponent implements OnInit {
  
  @Input() params; 
  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.params);
  }
  closeSelf (){
    this.modalService.dismissAll();  
  }
}
