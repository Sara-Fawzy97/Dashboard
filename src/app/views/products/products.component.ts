// products.component.ts
import { Component, signal } from '@angular/core';
import {  Product } from '../../interface/Product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsServiceService } from '../../shared/services/products-service.service';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OneProductComponent } from '../one-product/one-product.component';
import { AddProductComponent } from '../add-product/add-product.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  total = signal(0);
  page = signal(1);
  limit = 8;
  searchQuery = signal('');
  selectedCategory = signal('');
  category = signal('All');
searchTerm = signal('')
  categories = ['All', 'Beauty', 'Electronics', 'Clothing', 'Home'];

  constructor(private productsService: ProductsServiceService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const skip = (this.page() - 1) * this.limit;
    this.productsService.getProductsPaginate(this.limit,skip).subscribe({
      next: (res: any) => {
        this.products.set(res.products);
        this.total.set(res.total);
        
        this.totalPages = Math.ceil(this.total() / this.limit);
      }
    });
  }
totalPages:number=0

  onSearchChange() {
    this.page.set(1);
    this.loadProducts();
  }

  onCategoryChange() {
    this.page.set(1);
    this.loadProducts();
  }

  nextPage() {
    if (this.page() * this.limit < this.total()) {
      this.page.update(p => p + 1);
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadProducts();
    }
  }

  openProduct(product: Product) {

  const dialogRef=this.dialog.open(OneProductComponent, {
    data: product,
    width: '500px',
        panelClass: 'custom-dialog'
  });
  
  dialogRef.afterClosed().subscribe(result =>{

   if(!result) return;

    // لو المنتج اتعدل
    if(result.id){

      this.products.update(products =>
        products.map(p => p.id === result.id ? result : p)
      );

    }
       if(result.deletedId){

      this.products.update(products =>
        products.filter(p => p.id !== result.deletedId)
      );

    }

})

}

//to add new product
openAddProduct(){
 const dialogRef = this.dialog.open(AddProductComponent,{
   width:'500px'
 })

 dialogRef.afterClosed().subscribe(product=>{

   if(product){

     this.products.update(p => [...p, product])

   }

 })

}

}


