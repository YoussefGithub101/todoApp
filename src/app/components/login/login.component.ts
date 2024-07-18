import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error: string = '';
    errors: string = '';
    hidebutton:boolean =false;
    constructor(private _UserService: UserService, public _router: Router){

    }

    forms: FormGroup = new FormGroup(
      {
            email: new FormControl("yousseffredy10@gmail.com", [Validators.required, Validators.email]),
            password: new FormControl("123456", [Validators.required, Validators.minLength(6)]),
      })

login(forms: FormGroup) {
  this.hidebutton=true

      if (forms.valid) {
            this._UserService.loginn(forms.value).subscribe((response) => {
                  if (response.message == "success") {
                        localStorage.setItem("data", response.data)
                        this._UserService.saveUserData()
                        this._router.navigate([''])
                        this.hidebutton=false
                        let timerInterval: any
                        Swal.fire({
                              title: 'Login successfully',
                              html: 'Welcome to the todo app .',
                              timer: 3000,
                              timerProgressBar: true,
                              didOpen: () => {
                                    Swal.showLoading()
                                    const b: any = Swal.getHtmlContainer()?.querySelector('b')
                                    timerInterval = setInterval(() => {
                                         /*  b.textContent = Swal.getTimerLeft() */
                                    }, 100)
                              },
                              willClose: () => {
                                    clearInterval(timerInterval)
                              }
                        }).then((result) => {
                              /* Read more about handling dismissals below */
                              if (result.dismiss === Swal.DismissReason.timer) {
                                    console.log('I was closed by the timer')
                              }
                        })

                  }
                  else if (response.message == "please signup") {
                        this.error = response.message;
                        this.hidebutton=false
                        Swal.fire({
                              icon: "error",
                              title: "Email Not Found please <br> Sign up",
                        });
                  }
                  else if (response.message == "wrong password") {
                        this.errors = response.message;
                        Swal.fire({
                              icon: "error",
                              title: "Email OR Password Wrong",
                        });
                  }
            })
      }
}

}


