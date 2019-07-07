import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-payment-product-modal',
  templateUrl: './admin-payment-product-modal.component.html',
  styleUrls: ['./admin-payment-product-modal.component.css']
})
export class AdminPaymentProductModalComponent implements OnInit {
  @Input() adminPaymentList;

  public SoldTransaction: Array<any>;
  
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {    
    this.SoldTransaction = this.adminPaymentList.SoldTransaction;    
    console.log(this.SoldTransaction);
  }

}
