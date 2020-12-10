import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { NotasService } from 'src/app/services/notas.service';

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
    public loadingController: LoadingController,
    public toastController: ToastController,
    private modalController: ModalController) {
    this.task = this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    })
  }
  ionViewDidEnter(){
    this.task.get('title').setValue(this.nota.titulo);
    this.task.get('description').setValue(this.nota.texto)
  }

  public async sendForm() {
    await this.presentLoading();
    let data: Nota = {
      titulo: this.task.get('title').value,
      texto: this.task.get('description').value
    }
    this.notasS.actualizaNota(this.nota.id, data).then((respuesta) => {
      this.loadingController.dismiss();
      this.presentToast("Nota Guardada", "success");
      this.modalController.dismiss();
    }).catch((err) => {
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota", "danger");
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: "crescent" 
    });
    await loading.present();
  }
  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
}
