import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  baseUrl="https://dummyjson.com"
  constructor(private http:HttpClient) { }


   getProducts() {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

 getProductsPaginate(limit: number = 10, skip: number = 0): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`);
}

  getProductByCategory(category: string) {
    return this.http.get<any>(`${this.baseUrl}/products/category/${category}`);
  }

  searchProducts(query: string) {
    return this.http.get<any>(`${this.baseUrl}/products/search?q=${query}`);
  }

  addNewProduct(product: any) {
    return this.http.post<any>(`${this.baseUrl}/products/add`, product);
  }

  updateProduct(id: number, updatedData: any) {
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, updatedData);
  }

  deleteProuct(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }
}
