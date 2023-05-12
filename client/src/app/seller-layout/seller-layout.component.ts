import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-seller-layout',
  templateUrl: './seller-layout.component.html',
  styleUrls: ['./seller-layout.component.css']
})
export class SellerLayoutComponent implements OnInit {

  loading: boolean = true
  

  constructor (
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser() {
    const user = this.authService.user;

    if (!user) {
      this.authService.logout();
    } else {
      this.loading = false
    }

  }


}
