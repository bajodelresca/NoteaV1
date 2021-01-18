import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';
import { Usuario } from '../model/usuario';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ToastloadService } from '../services/toastload.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  lang:any;
  
  themeMode=-1;


  usuario: Usuario;

  constructor(private flashlight: Flashlight,
    private authS: AuthService,
    private router: Router,
    private theme: ThemeService,
    private translate:TranslateService,
    private language:LanguageService,
    private tl:ToastloadService) {
    this.usuario = authS.user;
    

  }
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }


  public async botonlinterna() {
    await this.tl.presentLoading();
    if (this.flashlight.isSwitchedOn()) {
      this.flashlight.switchOff()
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Linterna apagada", "success");
    } else {
      this.flashlight.switchOn()
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Linterna encendida", "success");
    }
  }
  switchtheme($event,mode){
    this.theme.changeTheme($event,mode);
  }
  

  

  
lnga=this.language.selected;
switchLanguage($event) {
  this.language.setLanguage($event.target.value);
  console.log($event.target.value);
}
}