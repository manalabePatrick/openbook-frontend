import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AvatarsPage } from 'src/app/modals/avatars/avatars.page';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  avatar:string = "2";
  constructor(private apiService: ApiService, private alertController: AlertController, private router: Router, private storage: LocalStorageService, private modalController: ModalController) { }

  ngOnInit() {
  }

  public credentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    avatar: ''
  }

  changeAvatar(){
    this.presentModal();
  }

  public register(){

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

    this.credentials.avatar = this.avatar;
    const requestObject = {
      method: "POST",
      location: "users/register",
      body: this.credentials
    }  

    this.apiService.makeRequest(requestObject).then((val) => {
      if(val.token) {
          this.storage.setToken(val.token);
          this.storage.setUserId(val.user._id);
          this.storage.userName = val.user.name;
          this.storage.user = val.user;
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarsPage,
      cssClass: 'avatar-modal-css'
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data){
      this.avatar = data;
    }
  }



}
