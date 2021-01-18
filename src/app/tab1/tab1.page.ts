import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { NotaPage } from '../pages/nota/nota.page';
import { Shake } from '@ionic-native/shake/ngx';
import { ToastloadService } from '../services/toastload.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public searchTerm: string = "";
  public listaNotas = [];
  public items: any;

  constructor(private notasS: NotasService, private modalController: ModalController,
    private nativeStorage: NativeStorage,
    private authS: AuthService,
    private router: Router,
    private alertController: AlertController,
    private shake: Shake,
    private tl:ToastloadService) {
      this.shake.startWatch().subscribe(data => {
        this.router.navigate(['/tabs/tab2'])
        });      


  }

  setFilteredItems(ev: any) {
  }

  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que quieres borrar la nota?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.borraNota(id);
        }
      }]
    });

    await alert.present();
  }

  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.cargaDatos();
   
    this.nativeStorage.setItem('myitem', { property: 'value', anotherProperty: 'anotherValue' })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  ionViewDidEnter() {
    this.notasS.loadCollection();
    this.cargaDatos();
  }

  public cargaDatos($event = null) {

    try {
      this.notasS.leeNotas()
        .subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas = [];
          info.forEach((doc) => {
            let nota = {
              id: doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
            this.items = this.listaNotas;
          });
          //Ocultar loading
          console.log(this.listaNotas);
          if ($event) {
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }
  public borraNota(id: any) {
    this.notasS.borraNota(id).then(() => {
      //Ya está borrada
      let tmp = [];
      this.listaNotas.forEach((nota) => {
        if (nota.id != id) {
          tmp.push(nota)
        }
      })
      this.listaNotas = tmp;
      this.items = this.listaNotas;
      
      this.tl.loadingController.dismiss();
      this.tl.presentToast("Nota eliminada correctamente", "success");
    })
      .catch(err => {
        //Error
      })
  }
  async editaNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }
  
  public openNote(nota: Nota){
    this.notasS.abrirnota(nota);
  }

 
  
  
  getItems(ev: any) {
    const val = ev.target.value;
    this.items = this.listaNotas;
    if (val && val.trim() != '') {
      this.items = this.items.filter((data) => {
        return (data.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  
  
}