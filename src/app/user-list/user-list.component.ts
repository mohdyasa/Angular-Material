import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user/user.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService) { }
userList:any[]=[];
displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Address'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getUserList();
 
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
getUserList(){
  this.service.getUserList().subscribe(result => {
  this.getUserList=result;
  this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
}
}
