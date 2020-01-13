import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { ComponentsModule } from '../components.module';

//Made with help from  https://ionicacademy.com/tab-bar-ionic-4/ and https://www.youtube.com/watch?v=_BnCRIZ1nDk
const routes: Routes = [
  {
    path: '',
    component: TabsPage, 
    children: [
      { path: 'homePage', 
      loadChildren: '../home-page/home-page.module#HomePagePageModule' 
    },
    { path: 'rooms', 
    loadChildren: '../rooms/rooms.module#RoomsPageModule' 
    },
    { path: 'add-room', 
    loadChildren: '../add-room/add-room.module#AddRoomPageModule' 
    },
    { path: 'booked-rooms', 
    loadChildren: '../booked-rooms/booked-rooms.module#BookedRoomsPageModule'
    },
    { path: 'rooms-detail', 
    loadChildren: '../rooms-detail/rooms-detail.module#RoomsDetailPageModule'
    },
    {
      path: '',
      redirectTo: 'homePage',
      pathMatch: 'full'
    }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
