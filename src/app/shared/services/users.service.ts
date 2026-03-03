import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
baseUrl="https://dummyjson.com"
  constructor(private http: HttpClient) { 
  }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  searchUsers(query: string) {
    return this.http.get<any>(`${this.baseUrl}/users/search?q=${query}`);
  }
  getUsersCart(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}/carts`);
  }
addNewUser(user: any) {
    return this.http.post<any>(`${this.baseUrl}/users/add`, user);
  }

  updateUser(id: number, updatedData: any) {
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, updatedData);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`);
  }
  searchUser(query: string) {
    return this.http.get<any>(`${this.baseUrl}/users/search?q=${query}`);
  }

}
