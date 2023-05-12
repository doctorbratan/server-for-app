import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  loading: boolean = true
  
  constructor (
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser() {
    const user = this.authService.user;

    if (!user || user.status == "seller") {
      this.authService.logout();
    } else {
      this.loading = false
    }

  }

}
