import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  displayedColumns = [
    'image',
    'name',
    'email',
    'phone',
    'age',
    'company',
    'actions'
  ];

  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }


  //DISPLAY USERS
  loadUsers() {

    const skip = this.currentPage * this.pageSize;

    this.usersService
      .getUsersPagination(this.pageSize, skip)
      .subscribe((res: any) => {

        this.users = res.users.map((u: any) => ({
          ...u,
          name: u.firstName + ' ' + u.lastName
        }));

        this.totalUsers = res.total;
      });
  }

  onPageChange(event: PageEvent) {

    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadUsers();
  }

  // ADD USER
  openAddUserDialog() {

    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        const newUser = {
            id: Math.floor(Math.random() * 100000),
          ...result,
          name: result.firstName + ' ' + result.lastName,
          image: 'https://i.pravatar.cc/150',
          company: 'New Company'
        };

        this.users = [newUser, ...this.users];

      }

    });

  }

  // EDIT USER
  editUser(user: any) {

    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        const index = this.users.findIndex(u => u.id === user.id);

        if (index !== -1) {

          this.users[index] = {
            ...this.users[index],
            ...result,
            name: result.firstName + ' ' + result.lastName
          };

          this.users = [...this.users];
        }

      }

    });

  }

  // DELETE USER
  deleteUser(id: number) {

    if (confirm('Delete this user?')) {

      this.usersService.deleteUser(id).subscribe(() => {

        this.users = this.users.filter(u => u.id !== id);

      });

    }

  }

}