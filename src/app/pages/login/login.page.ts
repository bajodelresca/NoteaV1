import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private google: GooglePlus,
    private authS: AuthService, private router: Router, private flashlight: Flashlight) { }

  ngOnInit() {
    console.log("ESTOY AQUI")
    console.log(this.authS.isLogged())
    if (this.authS.isLogged()) {
      this.router.navigate(['/'])
    }
  }
 
  public async login() {
    let u = await this.authS.login();
    if (u.token != -1) {
      this.router.navigate(['/'])
    }
  }

}
