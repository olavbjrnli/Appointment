import { Component, OnInit, NgZone } from '@angular/core';
import roomModel from '../models/roomModel'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { v4 as uuid } from "uuid";
import { AngularFireStorage } from '@angular/fire/storage';
import { google } from "google-maps";



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
//Class made with help from Lecture 9 and lecture 11
export class AddRoomPage implements OnInit {

  

  postTitle : string
  imgUrl : string
  imgScr : string
  imgType : string
  info : string
  address : string
  cameraPreview: string = "";
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  closeList : boolean = false
  

  constructor(
    private afAuth: AngularFireAuth,
    private firestore : AngularFirestore,
    private router : Router,
    private toastController : ToastController,
    private camera: Camera,
    private firestorage: AngularFireStorage,
    public zone: NgZone,
    

  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {
      
  }
  
  
  async postRoomToFirebase() {
    //Determines if user wants to take picture or paste a link, and then sets the image to the selected choice. 
    const uploadedImageUrl = await this.uploadImageToFirestorage();
    if(this.imgType == "link"){
      console.log("hahha")
      this.imgUrl = this.imgScr
    } else {
      this.imgUrl = uploadedImageUrl
    }
    
    const loggedInUser =  this.afAuth.auth.currentUser.email;
    const newId = this.firestore.createId();
    
    /* Made with help from https://stackoverflow.com/questions/48541270/how-to-add-document-with-custom-id-to-firestore
    Post the created room to firebase
    */
    await this.firestore.collection("rooms").doc(newId).set({
      title: this.postTitle,
      imgUrl: this.imgUrl,
      isBooked: false,
      identification : newId,
      author: loggedInUser,
      info: this.info,
      address: this.address

    });
    this.postTitle = ""
    this.imgUrl = ""
    this.address = ""
    this.info = ""
    this.cameraPreview = ""
    this.router.navigate(['/tabs/rooms'])
    //this.presentToast()

  }
  //This method is taken from lesson 11 and i dont own the code presented here
  async takePicture() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    try {
      const imageData = await this.camera.getPicture(cameraOptions);
      this.cameraPreview = imageData;
    
    } catch (e) {
      console.log(e);
    }
  }
  //This method is taken from lesson 11 and i dont own the code presented here
  async uploadImageToFirestorage() {
    const fileName = `tds-${uuid()}.png`;
    console.log(fileName);
    const firestorageFileRef = this.firestorage.ref(fileName);
    const uploadTask = firestorageFileRef.putString(
      this.cameraPreview,
      'base64',
      { contentType: 'image/png' }
    );
    await uploadTask.then();
    return firestorageFileRef.getDownloadURL().toPromise();
    
  }
  //https://ionicframework.com/docs/api/toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your room was published!',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  /*This code is taken from user Kelpie278 at https://forum.ionicframework.com/t/using-google-places-api-and-autocomplete-with-ionic-4/155305/8
  I dont take credit for this code, but used it to get a better feeling of a more "complete" app.
  It uses the google maps API to get places, that i then store as the room adress.
  */
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  //Sets address to address from list, then closes list.
  selectSearchResult(item) {
    console.log(item)
    this.address = item.description
    this.closeList = true
  }
}

