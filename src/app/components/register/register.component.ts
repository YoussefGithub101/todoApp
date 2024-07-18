import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error: string | undefined;
  form: FormGroup;
  hidebutton:boolean =false;
  constructor(private _UserService: UserService,public _router: Router){
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
 



  dub(form: FormGroup) {
    this.hidebutton =true;
    if (form.valid) {
      this._UserService.register(form.value).subscribe((response) => {
        if (response.message == "register successfully") {
          this._router.navigate(['Login'])
          this.hidebutton =false;
          Swal.fire("Register successfully ", "Welcome to the todo app", "success");
        }
        else {
          this.error = "this Email is " + " " + response.message;
          this.hidebutton =false;
          Swal.fire({
            icon: "error",
            title: "Email Already Used",
          });

        }
      })
    }

  }
}
