import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  displayedColumns = ['image','name','email','phone','age','company'];

  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

    const skip = this.currentPage * this.pageSize;

    this.usersService.getUsersPagination(this.pageSize, skip)
      .subscribe((res:any) => {
        this.users = res.users;
        this.totalUsers = res.total;
      });
  }

  onPageChange(event: PageEvent) {

    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadUsers();
  }

}