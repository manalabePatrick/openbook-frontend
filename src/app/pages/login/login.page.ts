import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public credentials = {
    email: '',
    password: '',
  }

  private login(){

    if(!this.credentials.email || !this.credentials.password ){

      const err = this.presentAlert('All fields are required');
      return err

    }

    this.authService.loginUser(this.credentials).then((val) =>{
      console.log(val);
    });    
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
