import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  

  constructor(private geolocation: Geolocation) {

  }
  async getPosition(){
    return this.geolocation.getCurrentPosition();
  }
  


}
