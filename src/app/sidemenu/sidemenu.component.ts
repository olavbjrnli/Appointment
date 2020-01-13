import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  loggedInUser =  this.afAuth.auth.currentUser.email;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl : MenuController
  ) { }

  ngOnInit() {
    

  }
   //https://enappd.com/blog/email-authentication-with-firebase-in-ionic-4/38/
   logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  navigate() {
    this.router.navigate(['/tabs/booked-rooms'])
    this.menuCtrl.close()
  }


}
