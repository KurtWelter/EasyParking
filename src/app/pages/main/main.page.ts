import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  id!:number;
  nombre!:string;
  parkings = [
    {
      name: 'Estacionamiento Las Condes ',
      location: 'Calle 1',
      price: '$100.000',
    },
    {
      name: 'Estacionamiento Ñuñoa ',
      location: 'Avenida 2',
      price: '$80.000',
    },
    { name: 'Estacionamiento Macul ', location: 'Plaza 3', price: '82.000' },
    {
      name: 'Estacionamiento La Reina ',
      location: 'Calle 4',
      price: '$95.000',
    },
    {
      name: 'Estacionamiento Providencia ',
      location: 'Avenida 5',
      price: '$80.000',
    },
    {
      name: 'Estacionamiento La Florida ',
      location: 'Plaza 6',
      price: '$75.000',
    },
  ];

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['id']){
      this.id = state['id'];
      this.nombre = state['nombre'];
    }
  }

  ngOnInit() {
    console.log(this.id);
  }

  getBackgroundGradient(name: string): string {
    return `linear-gradient(to right, #FF4500, #FF6347)`;
  }

  goToPay(selectedParking: any): void {
    this.router.navigate(['/pago', selectedParking.name]);
  }
}
