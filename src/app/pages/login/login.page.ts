import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private apiService: ApiService, private router: Router) { }

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
      if(val.message == "Incorrect Password."){
        return this.presentAlert("Incorrect Password.")
      }

      this.router.navigate(['/folder/Inbox']);
      //console.log("Logged in val=", val);
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
