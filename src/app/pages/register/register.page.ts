import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private apiService: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }

  public credentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  private register(){

    if(!this.credentials.first_name ||
      !this.credentials.last_name ||
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.password_confirm  ){

      const err = this.presentAlert('All fields are required');

      return err
      
    }

    if(this.credentials.password != this.credentials.password_confirm){
      const err = this.presentAlert("Password don't match");
      return err
    }

    const requestObject = {
      method: "POST",
      location: "users/register",
      body: this.credentials
    }  
  
    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.message == 'The provided email is already registered.'){
        return this.presentAlert('The provided email is already registered.');
      }
      console.log("This is from register.page.ts = ",val);
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
