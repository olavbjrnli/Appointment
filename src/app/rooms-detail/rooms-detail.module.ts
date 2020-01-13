import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic4-star-rating';

import { RoomsDetailPage } from './rooms-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoomsDetailPage]
})
export class RoomsDetailPageModule {}
