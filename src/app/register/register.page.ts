import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { auth} from 'firebase/app'  
import { Router } from '@angular/router';
//import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username : string = ""
  password : string = ""
  confirmPassword : string = ""
  wrongPass : string = ""

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    //public alertController: AlertController
    ) { }

  ngOnInit() {

  }

  // register function that prints errormessage if passwords doesnt match. if correct, create user with firebase. 
  async register() {
    const { username, password, confirmPassword } = this
    if(password !== confirmPassword) {
      return this.wrongPass = "the passwords doesnt match. Please try again"  
      //console.error("The passwords doesnt match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      this.router.navigate(['/login'])
      console.log(res)
    }  catch(error) {
      console.dir(error)
    }
  }
  
}
