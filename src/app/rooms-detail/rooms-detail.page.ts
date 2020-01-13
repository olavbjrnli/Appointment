import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import roomModel from '../models/roomModel'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore, database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.page.html',
  styleUrls: ['./rooms-detail.page.scss'],
})
export class RoomsDetailPage implements OnInit {
  
  private rooms : roomModel
  
  
  comment : string
  rating : number
  currentRating
  loggedInUser =  this.afAuth.auth.currentUser.email;
  firebaseRef

  //https://angularfirebase.com/lessons/star-ratings-system-with-firestore/
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private firestore : AngularFirestore,
    private toastController : ToastController,
   

  ) {
    //Made with big help from lesson 6. Stores the data that we got from the navigation from the list of rooms
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
      this.rooms = this.router.getCurrentNavigation().extras.state.post as roomModel;
      this.firebaseRef = this.firestore.collection("rooms").doc(this.rooms.identification)
      
    }
    });
   }

  ngOnInit() { 
    
    //this.roomRating()
  }
  update() {
    this.firebaseRef.update({ isBooked : true, bookedBy : this.loggedInUser})
    this.router.navigate(['/tabs/rooms']) 
    this.presentToast()
  }
  //https://ionicframework.com/docs/api/toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your room was booked',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  /*//https://www.npmjs.com/package/ionic4-star-rating
  logRatingChange(rating){
    this.rating = rating
} */
delete() {
  
  this.firebaseRef.delete()
  this.router.navigate(['/tabs/rooms']) 
  
  
  }
unbook() {
  
  this.firebaseRef.update({ isBooked : false, bookedBy : ""})
  this.router.navigate(['/tabs/rooms']) 
  }

  /* postComment() {
  //this.firestore.collection("rooms").doc(this.rooms.identification).
  console.log(this.rating)
  this.firestore.collection("comments").add ({
  comment : this.comment,
  rating : this.rating,
  author : this.rooms.author,
  roomId : this.rooms.identification

  });
  this.firebaseRef.update({
    comment: firestore.FieldValue.arrayUnion(this.comment),
    rating: firestore.FieldValue.arrayUnion(this.rating)
});

} // https://stackoverflow.com/questions/32854021/multiplying-array-elements-with-javascript
 
roomRating() {
  let Array = this.rooms.rating
  let total = 1
  let ratingWithNumber

  for (var i = 0; i  < Array.length; i++) {
      total += Array[i];
      ratingWithNumber = total / this.rooms.rating.length
      this.currentRating = ratingWithNumber.toFixed(1)
  }
  
 }*/ 
}
  
