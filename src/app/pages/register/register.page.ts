import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private apiService: ApiService, private alertController: AlertController, private router: Router, private storage: LocalStorageService) { }

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

    if( !this.credentials.first_name ||
      !this.credentials.last_name ||
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.password_confirm){

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
      if(val.token) {
          this.storage.setToken(val.token);
          this.storage.setUserId(val.user._id);
          this.router.navigate(['/library']);
          return;
      }
      if(val.message) { 
        this.presentAlert('The provided email is already registered.');
      }
  });
  
    // this.apiService.makeRequest(requestObject).then((val) => {
    //   if(val.message == 'The provided email is already registered.'){
    //     return this.presentAlert('The provided email is already registered.');
    //   }
    //   console.log(val);
    //   //this.router.navigate(['/folder/Inbox']);
    // });
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
