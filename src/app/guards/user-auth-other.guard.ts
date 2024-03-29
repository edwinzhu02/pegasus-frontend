import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralRepoService } from '../services/repositories/general-repo.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthOtherGuard implements CanActivate {
  constructor(private authService: GeneralRepoService,
    private router: Router,){
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.checkLoginIn();
  }
  checkLoginIn(){
    if (localStorage.getItem('pathAuth')){
      return true;
    }
    else{
    this.router.navigate(['/login']);
      return false
    }
  }
}
