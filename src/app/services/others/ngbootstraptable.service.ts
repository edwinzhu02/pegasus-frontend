import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgbootstraptableService {

  /*********************************************
    columnOrderControl, stored a number, the number stand the asec or dsec
      if number is odd: sort in asec
      if number is even: sort in dsec 
  **********************************************/
  public columnOrderControl: number;

  /*********************************************
    previousOrderBy, stored the previous order that pass to this service
      if number previous equal to current, means sort by the same column
  **********************************************/
  public previousOrderBy = null;

  constructor() { }

  /*********************************************
    sorting method
    receive 3 parameters: 
      listToOrder --> object list to be sorted
      orderBy --> which column to order (eg: FirstName,LastName ....) !!★!! orderBy must as same as the obj name in listToOrder
      orderControls? --> is a optional param, it only exist when router has this param
  **********************************************/
  sorting(listToOrder: Array<any>, orderBy: string, orderControls?: number) {
    this.getColumnOrderControl(orderBy, orderControls);
    listToOrder.sort(this.compare(orderBy))
    return this.columnOrderControl;
  }

  /*********************************************
      searching method
      receice 3 parameters:
        listToSearch --> in whitch list to search
        searchBy --> search in which columns (eg: FirstName,LastName ....) !!★!! searchBy must as same as the obj name in listToSearch
        searchStr --> searching string
    **********************************************/
  searching(listToSearch: Array<any>, searchBy: string, searchStr: string) {
    let temList = [];
    for (let i of listToSearch) {
      let searchByFilter = i[searchBy].toLowerCase();
      let searchStrFilter = searchStr.toLowerCase().split(" ");
      if (i[searchBy] !== null) {
        if (temList.indexOf(i) == -1) {
          if (this.judgesearch(searchStrFilter, searchByFilter)) {
            temList.push(i)
          }
        }
      }
    }
    return temList;
  }
 
  // Judge all key words selected could be found, return true.
  judgesearch(StrFilter, ByFilter) {
    let bool = [];
    for (var j = 0; j < StrFilter.length; j++) {
      if (ByFilter.search(StrFilter[j]) !== -1) {
        bool[j] = true;
      } else {
        bool[j] = false;
      }
    }
    if (JSON.stringify(bool).search("false") == -1) {
      // -1 means fail to find 'false'
      return true;
    } else {
      return false;
    }
  }

  ///////////////////////////////////////methods that implement sorting and searching/////////////////////////////////////////
  /*
    assign value to columnOrderControl
  */
  getColumnOrderControl(orderBy, orderControls?) {
    if (orderControls !== undefined) {
      this.columnOrderControl = orderControls;
    }
    else if (this.previousOrderBy !== orderBy) {
      this.columnOrderControl = 1;
    }
    else {
      this.columnOrderControl++;
    }
    this.previousOrderBy = orderBy;
  }

  /*
    algorithm of sorting, DO NOT alter anything in this method  
  */
  compare(orderBy): any {
    let that = this;
    return function (obj1, obj2) {
      let val1 = obj1[orderBy];
      let val2 = obj2[orderBy];
      //if value%2 is 0, then sort in asec
      if (that.columnOrderControl % 2 == 0) {
        //if has null value, put it at the end of list
        if (val1 == null) {
          return 1;
        }
        else if (val2 == null) {
          return -1;
        }
        else if (val1 < val2) {
          return 1;
        }
        else if (val1 > val2) {
          return -1;
        }
        else {
          return 0;
        }
      }
      //else, sort in dsec
      else {
        //if has null value, put it at the end of list
        if (val1 == null) {
          return 1;
        }
        else if (val2 == null) {
          return -1;
        }
        else if (val1 > val2) {
          return 1;
        }
        else if (val1 < val2) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }
  }
}
