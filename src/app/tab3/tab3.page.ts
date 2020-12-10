import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private flashlight: Flashlight,
    private authS: AuthService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController) {
         
  }
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  
  
  public async botonlinterna(){
    await this.presentLoading();
    if (this.flashlight.isSwitchedOn()) {      
      this.flashlight.switchOff()
      this.loadingController.dismiss();
      this.presentToast("Linterna apagada","success");
    }else{
      this.flashlight.switchOn()
      this.loadingController.dismiss();
      this.presentToast("Linterna encendida","success");
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: "crescent"
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }
}