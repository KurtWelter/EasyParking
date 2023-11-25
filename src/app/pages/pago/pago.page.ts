import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToMain() {
    this.router.navigate(['main']);
  }
}
