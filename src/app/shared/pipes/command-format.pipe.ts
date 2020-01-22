import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commandFormat'
})
export class CommandFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value){
      case 0:
        return 'Add new';
      case 1:
        return 'Details';
      case 2:
        return 'Edit';
      case 3:
        return 'Delete';
      // '4' has been used in CourseClass, so this does the distinction.
      case 5:
        return 'Receipt Detail';
      case 6: //use for learner profile 
          return 'Invoices Detail';        
    }
  }

}
