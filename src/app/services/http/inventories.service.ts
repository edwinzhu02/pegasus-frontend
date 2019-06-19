import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {
  private baseUrl: any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addNew(data): any {
    return this.http.post(this.baseUrl + 'StockOrder', data)
  }
  /* For dropdown options*/
  getProdts() {
    return this.http.get(this.baseUrl + 'Product');
  }
  getOrgs() {
    return this.http.get(this.baseUrl + 'Orgs');
  }
  getQtyPriceReceipt() {
    return this.http.get(this.baseUrl + 'StockOrder');
  }
  getStaff() {
    return this.http.get(this.baseUrl + 'Staff');
  }
}