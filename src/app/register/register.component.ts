import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../_services/user/user.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  countryData: any[];
  stateData: any[] = [];
  cityData: any[] = [];
  userList:any[]=[];
  filteredData: [] = [];
  renderedData: [] = [];
displayedColumns: string[] = ['FirstName', 'Email', 'Address','Actions'];
  dataSource:any;
  isLoaded: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private fb: FormBuilder, private service: UserService) {
    this.registerForm = fb.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
     // Address: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
     Address:[null, Validators.required],
     DOB: [null, Validators.required],
      Gender: [null, Validators.required],
      Email: [null, Validators.compose([Validators.required, Validators.email])],
      IsAccepted: [null],
      Country:['Select', Validators.required],
      State:['Select', Validators.required],
      City:['Select', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCountries();
    this.getUserList();
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
  }
  loadCountries() {
    this.service.getCountries().subscribe(result => {
      this.countryData = result.countries;
    })
  }
  fillState(value) {
    this.service.getState().subscribe(result => {
      this.stateData = result.states;
      this.stateData = this.stateData.filter(x => x.country_id == value)
    });
  }
  fillCity(value) {
    debugger
    this.service.getCity().subscribe(result => {
      console.log(result.cities);
      this.cityData = result.cities;
      this.cityData = this.cityData.filter(x => x.state_id == value)
     
    });
  }
  registerUser(){  
    this.service.addUser(this.registerForm.value).subscribe(result => {
      alert('Successfully saved');
    });
    this.getUserList();
  }
  resetForm()
  {
    this.registerForm.reset();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
getUserList(){
  this.service.getUserList().subscribe(result => {
  this.getUserList=result;
  this.dataSource = new MatTableDataSource(result);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.isLoaded = false;
  });
}
editUser(row:any){
  // this.service.getUserById(id).subscribe( result =>{
  //   this.registerForm.controls['FirstName'].setValue(result.FirstName);
  // });
  console.log(row);
}
deleteUser(id:number){
  this.service.deleteUser(id).subscribe(result =>{
  });
  this.getUserList();
  this.refreshTable();
}
private refreshTable() {
  // Refreshing table using paginator
  // Thanks yeager-j for tips
  // https://github.com/marinantonio/angular-mat-table-crud/issues/12
  this.paginator._changePageSize(this.paginator.pageSize);
}
}
