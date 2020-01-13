import { Component, OnInit } from '@angular/core';
import roomModel  from '../models/roomModel'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'


@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.page.html',
  styleUrls: ['./booked-rooms.page.scss'],
})
export class BookedRoomsPage implements OnInit {

  loggedInUser =  this.afAuth.auth.currentUser.email;
  private rooms$: Observable<roomModel[]>;
  

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    
   }

  ngOnInit() {
    this.rooms$ = this.firestore.collection("rooms", ref => ref.where( "bookedBy", '==', this.loggedInUser)).valueChanges() as Observable<roomModel[]>;

  }
  navRoomDetails(tappedRoom : roomModel) {

    
    let navigationExtras: NavigationExtras = {
      state: {
        post: tappedRoom
      }
    };
    this.router.navigate(['tabs/rooms-detail'], navigationExtras)

  }

}
