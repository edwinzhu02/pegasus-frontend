import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mondayDateInWeekByDate'
})
export class MondayDateInWeekByDatePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    const day = date.getDay();
    switch (day) {
      case 0:
        date.setDate(date.getDate() - 6);
        return date;
      case 1:
        date.setDate(date.getDate() );
        return date;
        break;
      case 2:
        date.setDate(date.getDate() - 1);
        return date;
        break;
      case 3:
        date.setDate(date.getDate() - 2);
        return date;
        break;
      case 4:
        date.setDate(date.getDate() - 3);
        return date;
        break;
      case 5:
        date.setDate(date.getDate() - 4);
        return date;
        break;
      case 6:
        date.setDate(date.getDate() - 5);
        return date;
        break;
    }
  }

}
