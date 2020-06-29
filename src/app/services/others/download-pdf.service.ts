import { Injectable } from '@angular/core';

import * as jsPDF from "jspdf"
import 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {
  logo = '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'
  constructor() { }

  downloadPDF(learnerName: IInvoiceLearnerName, invoice: IInvoice ,branch) {
    let table_header = [['DESCRIPTION', "UNIT PRICE","QTY", 'AMOUNT']]
    let body = []
    let options = { columnWidth: 'auto' }
    let currentHeight: number = 90
    let interval: number = 8
    let rowHeight = 5; 
    let lineSpacing = { NormalSpacing: 12 }
    let startY = 120
    // let color = [41, 59, 68];
    let color = [230, 230, 230];
    let doc = new jsPDF({
      unit: 'mm',
    })
    // title
    doc.setFontSize(20);
    // doc.setTextColor(0, 0, 0)
    doc.setFillColor(...color)
    //doc.rect(14, 20, 183, 25, 'F')
    // doc.addImage(this.logo, 'PNG', 55, 20);
    doc.addImage(this.logo, 'PNG', 14, 20);
    doc.setTextColor(11, 58, 221);
    doc.text(`INVOICE`,160, 30);
    doc.setTextColor(0, 0, 0);
    //Title words
    doc.setFontSize(20);
    doc.text(`ABLE MUSIC STUDIO`,60, 30);
    doc.setFontSize(12);
    doc.text(`${branch.OrgName.toUpperCase()} BRANCH`,65, 37);

    // detail
    doc.setFontSize(8);
    doc.text(`${splitAddress(branch.Address).firstPart}`,15, 60);
    doc.text(`INVOICE DATE`, 100, 60)
    doc.text(`${formatDate(invoice.BeginDate.slice(0, 10))}`, 150, 60)    
    doc.text(`${splitAddress(branch.Address).secondPart}`, 15, 60+rowHeight);
    doc.text(`INVOICE NUMBER`, 100, 60+rowHeight)
    doc.text(`${invoice.InvoiceNum}`, 150, 60+rowHeight)    
    doc.text(` PHONE: ${branch.Phone}`, 15, 60+2*rowHeight);
    doc.text(`GST NUMBER`, 100, 60+2*rowHeight)    
    doc.text(`${branch.GstNum}`, 150, 60+2*rowHeight)        
    doc.text(` E-MAIL: ${branch.Email}`, 15, 60+3*rowHeight);
    if (invoice.DueDate) {
      doc.text(`PAYMENT DUE:`, 100, 60+3*rowHeight);
      doc.text(`${formatDate(invoice.DueDate.split("T")[0])}`, 150, 60+3*rowHeight);      
    }

    doc.setFontSize(10);
    // doc.setTextColor(255, 255, 255);
    doc.setFillColor(...color)
    doc.rect(14, 60+5*rowHeight-5, 183, 8, 'F')
    doc.text(`BILL To: `, 16, 60+5*rowHeight);
    doc.setFontSize(8);
    // doc.setTextColor(0, 0, 0);    
    doc.text(`${learnerName.firstName.toUpperCase()}  ${learnerName.lastName.toUpperCase()}`, 16, 65+6*rowHeight);   
    if (learnerName.Email)
      doc.text(`EMAIL:${learnerName.Email}`, 16, 65+7*rowHeight);  

    currentHeight -= interval;

    if (invoice.LessonFee>0) {
      currentHeight += interval
      body.push([invoice.CourseName, '$'+(invoice.LessonFee/invoice.LessonQuantity).toFixed(2),
        invoice.LessonQuantity, '$'+invoice.LessonFee.toFixed(2)])
    }
    if (invoice.ConcertFee) {
      currentHeight += interval
      // doc.text(`${invoice.ConcertFeeName}`, 20, currentHeight);
      // doc.text(`$${invoice.ConcertFee}`, 90, currentHeight);
      body.push([invoice.ConcertFeeName, '$'+invoice.ConcertFee.toFixed(2),1, '$'+invoice.ConcertFee.toFixed(2)])
    }

    if (invoice.NoteFee) {
      currentHeight += interval
      // doc.text(`${invoice.LessonNoteFeeName}`, 20, currentHeight);
      // doc.text(`$${invoice.NoteFee}`, 90, currentHeight);
      body.push([invoice.LessonNoteFeeName, '$'+invoice.NoteFee.toFixed(2), 1, '$'+invoice.NoteFee.toFixed(2)])
    }

    // if (invoice.Other1Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other1FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other1Fee}`, 90, currentHeight)
    //   body.push([invoice.Other1FeeName, '$'+invoice.Other1Fee.toFixed(2),1, '$'+invoice.Other1Fee.toFixed(2)])
    // }

    // if (invoice.Other2Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other2FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other2Fee}`, 90, currentHeight)
    //   body.push([invoice.Other2FeeName,'$'+invoice.Other2Fee.toFixed(2), 1, '$'+invoice.Other2Fee.toFixed(2)])
    // }

    // if (invoice.Other3Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other3FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other3Fee}`, 90, currentHeight)
    //   body.push([invoice.Other3FeeName, '$'+invoice.Other3Fee.toFixed(2),1, '$'+invoice.Other3Fee.toFixed(2)])
    // }
    for (let i=1; i<=18; i++){
      let col1= 'Other'+i+'FeeName';
      let col2 = 'Other'+i+'Fee';
      currentHeight = addItem(invoice,body,interval,currentHeight,col1,col2);
    }
    

    doc.setFontSize(16);
    doc.autoTable({
      head: table_header, body, options,
      startY,
      styles: { fillColor: [...color]},
      headerStyles: {
        fillColor: [...color],
        textColor: [0,0,0],
        // fontSize: 12
    },
    });
    startY = doc.autoTableEndPosY() + 10;
    doc.setFontSize(10);
    doc.text(`Subtotal:`, 155, startY );
    doc.text(`$ ${invoice.TotalFee.toFixed(2)}`, 180, startY );    
    doc.setFontSize(9);
    doc.text(`GST incl:`, 155, startY +=6);
    doc.text(`$ ${(getGst(invoice.TotalFee))}`, 180, startY);    
    doc.setFontSize(11);
    doc.text(`TOTAL:`, 155, startY += 6);
    doc.text(`$ ${invoice.TotalFee.toFixed(2)}`, 180, startY);    

    // doc.setTextColor(255, 255, 255);
    doc.setFillColor(...color)
    doc.rect(14, startY+=6, 183, 8, 'F')
    doc.setFontSize(11);
    doc.text(`Note:`, 16, startY+=6); 
    // doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);   
    doc.text(`1, Total payment due in 7 days`, 16, startY+=8);      
    doc.text(`2, Please include the invoice number with your payment`, 16, startY+=6); 

    doc.text(`ABLE MUSIC STUDIO ${branch.OrgName.toUpperCase()} BANK ACCOUNT DETAIL`, 16, startY+=8);
    doc.text(`BANK:${branch.BankName}`, 16, startY+=6);
    doc.text(`Account Number:${branch.BankAccountNo}`, 16, startY+=6);    
    doc.text(`If you have any questions about this invoice, please contact us immediately.`, 30, startY+=6);    
    // doc.save(`${learnerName.firstName}  ${learnerName.lastName}'s invoice`);
    doc.output('dataurlnewwindow'); 
  }


  downloadPDF_blob(learnerName: IInvoiceLearnerName, invoice: IInvoice ,branch) {
    let table_header = [['DESCRIPTION', "UNIT PRICE","QTY", 'AMOUNT']]
    let body = []
    let options = { columnWidth: 'auto' }
    let currentHeight: number = 90
    let interval: number = 8
    let rowHeight = 5; 
    let lineSpacing = { NormalSpacing: 12 }
    let startY = 120
    // let color = [41, 59, 68];
    let color = [230, 230, 230];
    let doc = new jsPDF({
      unit: 'mm',
    })
    // title
    doc.setFontSize(20);
    // doc.setTextColor(0, 0, 0)
    doc.setFillColor(...color)
    //doc.rect(14, 20, 183, 25, 'F')
    // doc.addImage(this.logo, 'PNG', 55, 20);
    doc.addImage(this.logo, 'PNG', 14, 20);
    doc.setTextColor(11, 58, 221);
    doc.text(`INVOICE`,160, 30);
    doc.setTextColor(0, 0, 0);
    //Title words
    doc.setFontSize(20);
    doc.text(`ABLE MUSIC STUDIO`,60, 30);
    doc.setFontSize(12);
    doc.text(`${branch.OrgName.toUpperCase()} BRANCH`,65, 37);

    // detail
    doc.setFontSize(8);
    doc.text(`${splitAddress(branch.Address).firstPart}`,15, 60);
    doc.text(`INVOICE DATE`, 100, 60)
    doc.text(`${formatDate(invoice.BeginDate.slice(0, 10))}`, 150, 60)    
    doc.text(`${splitAddress(branch.Address).secondPart}`, 15, 60+rowHeight);
    doc.text(`INVOICE NUMBER`, 100, 60+rowHeight)
    doc.text(`${invoice.InvoiceNum}`, 150, 60+rowHeight)    
    doc.text(` PHONE: ${branch.Phone}`, 15, 60+2*rowHeight);
    doc.text(`GST NUMBER`, 100, 60+2*rowHeight)    
    doc.text(`${branch.GstNum}`, 150, 60+2*rowHeight)        
    doc.text(` E-MAIL: ${branch.Email}`, 15, 60+3*rowHeight);
    if (invoice.DueDate) {
      doc.text(`PAYMENT DUE:`, 100, 60+3*rowHeight);
      doc.text(`${formatDate(invoice.DueDate.split("T")[0])}`, 150, 60+3*rowHeight);      
    }

    doc.setFontSize(10);
    // doc.setTextColor(255, 255, 255);
    doc.setFillColor(...color)
    doc.rect(14, 60+5*rowHeight-5, 183, 8, 'F')
    doc.text(`BILL To: `, 16, 60+5*rowHeight);
    doc.setFontSize(8);
    // doc.setTextColor(0, 0, 0);    
    doc.text(`${learnerName.firstName.toUpperCase()}  ${learnerName.lastName.toUpperCase()}`, 16, 65+6*rowHeight);   
    if (learnerName.Email)
      doc.text(`EMAIL:${learnerName.Email}`, 16, 65+7*rowHeight);  

    currentHeight -= interval;

    if (invoice.LessonFee>0) {
      currentHeight += interval
      body.push([invoice.CourseName, '$'+(invoice.LessonFee/invoice.LessonQuantity).toFixed(2),
        invoice.LessonQuantity, '$'+invoice.LessonFee.toFixed(2)])
    }
    if (invoice.ConcertFee) {
      currentHeight += interval
      // doc.text(`${invoice.ConcertFeeName}`, 20, currentHeight);
      // doc.text(`$${invoice.ConcertFee}`, 90, currentHeight);
      body.push([invoice.ConcertFeeName, '$'+invoice.ConcertFee.toFixed(2),1, '$'+invoice.ConcertFee.toFixed(2)])
    }

    if (invoice.NoteFee) {
      currentHeight += interval
      // doc.text(`${invoice.LessonNoteFeeName}`, 20, currentHeight);
      // doc.text(`$${invoice.NoteFee}`, 90, currentHeight);
      body.push([invoice.LessonNoteFeeName, '$'+invoice.NoteFee.toFixed(2), 1, '$'+invoice.NoteFee.toFixed(2)])
    }

    // if (invoice.Other1Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other1FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other1Fee}`, 90, currentHeight)
    //   body.push([invoice.Other1FeeName, '$'+invoice.Other1Fee.toFixed(2),1, '$'+invoice.Other1Fee.toFixed(2)])
    // }

    // if (invoice.Other2Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other2FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other2Fee}`, 90, currentHeight)
    //   body.push([invoice.Other2FeeName,'$'+invoice.Other2Fee.toFixed(2), 1, '$'+invoice.Other2Fee.toFixed(2)])
    // }

    // if (invoice.Other3Fee) {
    //   currentHeight += interval
    //   // doc.text(`${invoice.Other3FeeName}`, 20, currentHeight)
    //   // doc.text(`$${invoice.Other3Fee}`, 90, currentHeight)
    //   body.push([invoice.Other3FeeName, '$'+invoice.Other3Fee.toFixed(2),1, '$'+invoice.Other3Fee.toFixed(2)])
    // }
    for (let i=1; i<=18; i++){
      let col1= 'Other'+i+'FeeName';
      let col2 = 'Other'+i+'Fee';
      currentHeight = addItem(invoice,body,interval,currentHeight,col1,col2);
    }
    

    doc.setFontSize(16);
    doc.autoTable({
      head: table_header, body, options,
      startY,
      styles: { fillColor: [...color]},
      headerStyles: {
        fillColor: [...color],
        textColor: [0,0,0],
        // fontSize: 12
    },
    });
    startY = doc.autoTableEndPosY() + 10;
    doc.setFontSize(10);
    doc.text(`Subtotal:`, 155, startY );
    doc.text(`$ ${invoice.TotalFee.toFixed(2)}`, 180, startY );    
    doc.setFontSize(9);
    doc.text(`GST incl:`, 155, startY +=6);
    doc.text(`$ ${(getGst(invoice.TotalFee))}`, 180, startY);    
    doc.setFontSize(11);
    doc.text(`TOTAL:`, 155, startY += 6);
    doc.text(`$ ${invoice.TotalFee.toFixed(2)}`, 180, startY);    

    // doc.setTextColor(255, 255, 255);
    doc.setFillColor(...color)
    doc.rect(14, startY+=6, 183, 8, 'F')
    doc.setFontSize(11);
    doc.text(`Note:`, 16, startY+=6); 
    // doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);   
    doc.text(`1, Total payment due in 7 days`, 16, startY+=8);      
    doc.text(`2, Please include the invoice number with your payment`, 16, startY+=6); 

    doc.text(`ABLE MUSIC STUDIO ${branch.OrgName.toUpperCase()} BANK ACCOUNT DETAIL`, 16, startY+=8);
    doc.text(`BANK:${branch.BankName}`, 16, startY+=6);
    doc.text(`Account Number:${branch.BankAccountNo}`, 16, startY+=6);    
    doc.text(`If you have any questions about this invoice, please contact us immediately.`, 30, startY+=6);    
    // doc.save(`${learnerName.firstName}  ${learnerName.lastName}'s invoice`);
    // var re  = doc.output('arraybuffer'); 
    var re  = doc.output('blob');
    return re;
  }  
}
function splitAddress(address:string) {
  const [number, road, Suburb, city] = address.split(',');
  return {
      firstPart:number+','+road,
      secondPart:Suburb+(city!=null?','+city:'')        
  }
};
function addItem(invoice,body,interval,currentHeight,col1,col2) {
  if (invoice[col2] !=null && invoice[col2] !=0 )  {
    currentHeight += interval;
    body.push([invoice[col1], '$'+invoice[col2].toFixed(2),1, '$'+invoice[col2].toFixed(2)]);
  }
  return currentHeight;
};
function formatDate(strdate:string) {
  let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  var date = new Date(strdate);
  return (monthNames[date.getMonth()] + ' ' + date.getDate() + ' ' +  date.getFullYear())
};
function getGst(amount:number) {
  return (amount*0.15).toFixed(2);
};
export interface IInvoiceLearnerName {
  firstName: string
  lastName: string
  Email:string
}
export interface IBranch {
  OrgName: string
  Phone: string
  Email:string
  gstNum:string
  BankName:string
  BankAccountNo:string
  Address:string
}

export interface IInvoice {
  LessonQuantity?: number
  InvoiceNum:string
  CourseName: string
  LessonFee: number
  BeginDate?: string
  ConcertFeeName?: string
  ConcertFee?: number
  LessonNoteFeeName?: string
  NoteFee?: number
  Other1FeeName?: string
  Other1Fee?: number
  Other2FeeName?: string
  Other2Fee?: number
  Other3FeeName?: string
  Other3Fee?: number
  TotalFee: number
  DueDate?: string
  [propName: string]: any;
}
