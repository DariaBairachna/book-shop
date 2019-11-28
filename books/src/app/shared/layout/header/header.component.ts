import { Component, OnInit } from '@angular/core';
import { LocalSlorageService, AuthentificationService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthentificationService) { }

  ngOnInit() {
  }
  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);


  }

}
