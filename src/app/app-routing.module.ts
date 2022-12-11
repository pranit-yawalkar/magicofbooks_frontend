import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookStoreComponent } from './components/book-store/book-store.component';
import { CompletedListComponent } from './components/completed-list/completed-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', component: HeaderComponent, outlet: 'header' },
  { path: '', component: FooterComponent, outlet: 'footer' },
  { path: 'about', component: AboutComponent },
  { path: 'books', component: BookStoreComponent },
  { path: 'user/wishlist', component: WishlistComponent },
  { path: 'user/completed-list', component: CompletedListComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'admin-dashboard', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'user-dashboard', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
