import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private apiService: ApiService) { }

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

    const requestObject = {
      method: "POST",
      location: "users/login",
      body: this.credentials
    }  

    this.apiService.makeRequest(requestObject).then((val) =>{
      console.log("Logged in val=", val);
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
