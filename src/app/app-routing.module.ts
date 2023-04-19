import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UsersBlogComponent } from './component/users-blog/users-blog.component';

const routes: Routes = [
  { path : 'admin' ,  component : AdminComponent},
  { path : 'login' ,  component : LoginComponent},
  { path : 'register' , component : RegisterComponent},
  { path : 'createPost' , component : CreatePostComponent},
  { path : 'usersblog/:id' , component:UsersBlogComponent},
  { path :  '' ,       component : DashboardComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
