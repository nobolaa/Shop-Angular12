import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DominicodeComponent } from './pages/dominicode/dominicode.component';

const routes: Routes = [
  {path:'dominicode', component: DominicodeComponent},
  {path:'**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
