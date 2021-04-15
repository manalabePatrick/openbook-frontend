import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private apiService: ApiService, private router: Router, private storage: LocalStorageService) { }

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

    let requestObject = {
      method: "POST",
      location: "users/login",
      body: this.credentials
    }

  this.apiService.makeRequest(requestObject).then((val) => {
    if(val.token) {
        this.storage.setToken(val.token);
        this.storage.setUserId(val.user._id);
        this.router.navigate(['/library']);
        return;
    }
    if(val.message) { this.presentAlert(val.message); }
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
