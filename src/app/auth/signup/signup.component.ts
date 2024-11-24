import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user =new User()
  users: User[] = [];
  constructor(private service:RegistrationService,private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe()
  }

  onSubmit(f:NgForm){
    this.service.registerUser(f.value).subscribe((result) => {
      this.router.navigate(['/signin']);
      this.ngOnInit(); 
     });
  }
}
