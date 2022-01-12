import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
  isAdmin = false;
  isProfessor = false;
  userType: any = "";
  //showDashboard = false;
  tokenName: any = "sads";
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userType = this.tokenStorageService.getUserType();
    console.log(this.userType);
    if (this.isLoggedIn) {
      //this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/login']);
    }

    if(this.userType === "admin"){
      this.isAdmin = true;
    }
    else if(this.userType === "profesor"){
      this.isProfessor = true;
    }
  }

  getUserName(): string {
    this.tokenName = this.tokenStorageService.getUserEmail();
    return this.tokenName;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('');
    this.isLoggedIn = false;
  }
}
