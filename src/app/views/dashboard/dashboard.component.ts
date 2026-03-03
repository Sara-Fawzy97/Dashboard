import { Component } from '@angular/core';
import { ProductsServiceService } from '../../shared/services/products-service.service';
import { UsersService } from '../../shared/services/users.service';
import { Chart } from 'chart.js/auto';
import { MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, style, animate, transition } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,  CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
   animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DashboardComponent {

show=false
  totalProducts = 0;
  totalUsers = 0;

  constructor(private productService: ProductsServiceService, private usersService: UsersService) {}

  ngOnInit() {
  
    this.loadStats();
    this.createChart();
    this.show=true
  }

  loadStats() {
    this.productService.getProducts().subscribe(res => {
      this.totalProducts = res.total;
      // console.log(this.totalProducts);
    });

    this.usersService.getUsers().subscribe(res => {
      this.totalUsers = res.total;
      // console.log(this.totalUsers);
    });
  }

 createChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Revenue',
          data: [1000, 2000, 1500, 3000, 2500],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37,99,235,0.2)',
          tension: 0.4
        }]
      }
    });
}
}