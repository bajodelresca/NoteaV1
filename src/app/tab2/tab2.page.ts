import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { LocationService } from '../services/location.service';
import { NotasService } from '../services/notas.service';
import { ToastloadService } from '../services/toastload.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lang:any;
  latitude=0;
  longitude=0;
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,    
    private geolocation:LocationService,
    private tl:ToastloadService) {
    this.task = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })
  }
  public async sendForm() {
    await this.tl.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value
    }
    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: ''
      })
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Nota Guardada","success");
    }).catch((err) => {
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Error guardando nota","danger");
    })
  }

  public async car() {
    await this.tl.presentLoading();
    await this.geolocation.getPosition().then((resp) => {
      this.latitude=resp.coords.latitude
      this.longitude=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);});
    
      
    let data: Nota = {
      titulo: "Aquí he aparcado",
      texto: "Esta es la ubicacion",
      latitude: this.latitude,
      longitude: this.longitude
    }
    
    this.notasS.agregaNota(data).then((respuesta) => {
      this.task.setValue({
        title: '',
        description: '',
        latitude: '',
        longitude:''

      }) 
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Nota Guardada","success");
    }).catch((err) => {
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Nota Guardada","success");
    })
  }
  
  tituloPark():string{
    switch (this.lang.selected){
      case 'es':
        return "Aquí he aparcado"
        break;
      case 'en':
        return "Here is my car"
        break;
      default:
        return "Aquí he aparcado"
        break;
    }
  }

   textPark():string{
    switch (this.lang.selected){
      case 'es':
        return "Esta es la ubicacion"
        break;
      case 'en':
        return "This is the location"
        break;
      default:
        return "Esta es la ubicacion"
        break;
    }
  }
}

