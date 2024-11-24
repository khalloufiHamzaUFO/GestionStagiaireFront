import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators, FormGroup, NgForm , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private service:RegistrationService,private router:Router,private fb :FormBuilder,) { }

  user =new User()
  msg = " "

  ngOnInit(): void {
    this.service.getUsers().subscribe()
  }

  createForm(){
    // this.loginForm = this.f.group
  }

  
  onSubmit(){
    this.loginForm = this.fb.group({
    email: [''],
    motdepasse: ['']})
    this.service.LoginUser(this.user).subscribe(
      data=> {console.log("Responce received");
      (this.router.navigate(['/candidats']))
    },
      error=>{console.log("exception");
      this.msg='Informations incorrectes';

    })
  }

}



// gotoRegistration(){
//   this.router.navigate(['/signup'])
// }
