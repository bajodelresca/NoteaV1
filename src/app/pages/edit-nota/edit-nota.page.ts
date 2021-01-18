import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { NotasService } from 'src/app/services/notas.service';
import { ToastloadService } from 'src/app/services/toastload.service';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage {
  @Input("nota") nota: Nota;
  public task: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notasS: NotasService,        
    private tl:ToastloadService) {
    this.task = this.formBuilder.group({
      title:['',Validators.required],
      description:[''],
      latitude:[''],
    longitude:[''],
    })
  }
  ionViewDidEnter(){
    this.task.get('title').setValue(this.nota.titulo);
    this.task.get('description').setValue(this.nota.texto);
    this.task.get('latitude').setValue(this.nota.latitude);
    this.task.get('longitude').setValue(this.nota.longitude);
  }

  public async sendForm() {
    await this.tl.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value,
      latitude: this.nota.latitude,
      longitude: this.nota.longitude
    }
    this.notasS.actualizaNota(this.nota.id, data).then((respuesta) => {
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Nota Guardada", "success");
      this.tl.modalController.dismiss();
    }).catch((err) => {
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Error guardando nota", "danger");
    })
  }
  
}
