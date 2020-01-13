import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'  
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
//Class made with 
export class LoginPage implements OnInit {

  username: string
  password: string

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    
  }
  //https://enappd.com/blog/email-authentication-with-firebase-in-ionic-4/38/
  async login() {
    const { username, password} = this
    try {
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
    .then(res => {
      if (res.user) {
        console.log(res.user);
        this.router.navigate(['/tabs']);
      } 
    })
    } catch(err) {
      
    }
  }
  navigate() {
    this.router.navigate(['/register'])
  }
  //https://ionicframework.com/docs/api/toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Wrong password',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}

