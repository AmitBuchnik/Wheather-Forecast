import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhetherDetailsComponent } from './whether-details/whether-details.component';
import { FavoirtesComponent } from './favoirtes/favoirtes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home/:name', component: WhetherDetailsComponent },
  { path: 'home', component: WhetherDetailsComponent },
  { path: 'favorites', component: FavoirtesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
