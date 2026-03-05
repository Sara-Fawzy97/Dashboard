import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductsServiceService } from '../../shared/services/products-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule,FormsModule],
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public product: any,private productsService:ProductsServiceService,private dialogRef: MatDialogRef<OneProductComponent>) {}
 
  editMode = false;
  selectedImage: string = '';

 enableEdit(){
    this.editMode = true;
  }

deleteProduct() {

  if(confirm('Are you sure you want to delete this product?')){

    this.productsService.deleteProuct(this.product.id).subscribe(() => {
      alert('Product deleted');
      this.dialogRef.close({deletedId: this.product.id});
    });

  }

}

editProduct(){

  this.productsService.updateProduct(this.product.id,this.product).subscribe(()=>{

    alert("Product updated");
this.dialogRef.close(this.product);
  })

}
}
