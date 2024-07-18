import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  name: string = "";
  islogin: boolean = false;

  constructor(public _userService: UserService,private router: Router){

  }
  ngOnInit(): void {
    this._userService.userData.subscribe(() => {
      if (this._userService.userData.getValue() != null) {
        this.islogin = true;
   
        console.log(this.name)

      }
      else {
        this.islogin = false;


      }
    })
  }
  ngOnDestroy() {
    this._userService.saveUserData().unsubscribe();
  }

  logOut() {
    this._userService.logOut()
  
  }
}
