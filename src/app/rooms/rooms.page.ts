import { Component, OnInit } from '@angular/core';
import roomModel  from '../models/roomModel'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
//This class has been made with big help from lesson 6. 
export class RoomsPage implements OnInit {

  
  rooms$: Observable<roomModel[]>;
  rooms : roomModel

  constructor(
    private firestore: AngularFirestore,
    private router: Router,

  ) { }

  ngOnInit() {
    //https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
    this.rooms$ = this.firestore.collection("rooms", ref => ref.where('isBooked', '==', false)).valueChanges() as Observable<roomModel[]>;
    
  }
  //Made with big help from lesson 6. 
  navRoomDetails(tappedRoom : roomModel) {

    
    let navigationExtras: NavigationExtras = {
      state: {
        post: tappedRoom
      }
    };
    this.router.navigate(['tabs/rooms-detail'], navigationExtras)

  }
  getRating() {
   
  }
}
