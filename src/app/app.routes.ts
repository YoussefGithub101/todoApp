import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { authGuard } from './Route Guard/auth.guard';
export const routes: Routes = [
    {path:'home',component:TodoListComponent ,canActivate: [authGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'Login', component:LoginComponent },
    {path:'Register',component:RegisterComponent},
    {path:'**',component:RegisterComponent},


];
