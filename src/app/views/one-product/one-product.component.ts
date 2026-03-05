import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public product: any) {}

}