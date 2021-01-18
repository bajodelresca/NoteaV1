import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { ReadService } from 'src/app/services/read.service';
import { Map, tileLayer, marker } from 'leaflet';
import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  @Input("nota") nota: Nota;
  text: string;
  public newMarker: any;
  public showMap: boolean;
  public latitud = 0;
  public longitud = 0;
  public map: Map;
  constructor(private modalController: ModalController, private speak: ReadService) { }

  ngOnInit() {
    this.loadMap()
  }
  public exit() {
    this.modalController.dismiss();
  }

  read() {
    this.text = this.nota.texto
    this.speak.talk(this.text);
  }

  public loadMap() {
    this.latitud = this.nota.latitude;
    this.longitud = this.nota.longitude;
    if (this.longitud != null && this.latitud != null) {
      this.showMap = true;
      this.map = new Map("map").setView([this.latitud, this.longitud], 13);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
        .addTo(this.map);

      this.newMarker = marker([this.latitud, this.longitud], {
        draggable:
          true
      }).addTo(this.map);
      this.newMarker.bindPopup("Aquí esta mi coche").openPopup();
      setTimeout(()=>{
        this.map.invalidateSize();
      }, 400);
    }
  }
  
}