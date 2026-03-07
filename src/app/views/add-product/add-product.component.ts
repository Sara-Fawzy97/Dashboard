import { Component } from '@angular/core';
import { Product } from '../../interface/Product';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsServiceService } from '../../shared/services/products-service.service';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  // productsService: any;

  constructor(private dialogRef: MatDialogRef<AddProductComponent>, private productsService: ProductsServiceService) { }

  product: Product = {
  id: 0,
  title: '',
  price: 0,
  category: '',
  description: '',
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  thumbnail: '',
  images: []
  // image: ''
};

addProduct(){

 this.productsService.addNewProduct(this.product)
 .subscribe((newProduct)=>{

   this.dialogRef.close(newProduct)

 })

}
}
