import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';
import { NotaPage } from '../pages/nota/nota.page';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private myCollection: AngularFirestoreCollection<any>;

  constructor(private fire: AngularFirestore, private user: AuthService,private modalController: ModalController) {
    this.myCollection = fire.collection<any>(environment.userCollection).doc(this.user.getUser().userId).collection(environment.notasColletion);
  }
  loadCollection() {
    this.myCollection = this.fire.collection<any>(environment.userCollection).doc(this.user.getUser().userId).collection(environment.notasColletion);
  }
  /**
   * 
   * @param nuevaNota 
   */
  agregaNota(nuevaNota: Nota): Promise<any> {
    return this.myCollection.add(nuevaNota);
  }
  /**
   * 
   * @param id 
   */
  leeNota(id: any): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.myCollection.doc(id).get();
  }
  /**
   * 
   */
  leeNotas(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.myCollection.get();
  }
  /**
   * 
   * @param id 
   * @param nuevaNota 
   */
  actualizaNota(id: any, nuevaNota: Nota): Promise<void> {
    return this.myCollection.doc(id).set(nuevaNota);
  }
  /**
   * Realiza la lectura de firebase de una nota dada por una clave
   * @param id la clave del documento (nota) a leer
   * @returns devuelve un observable con la iformación de la nota seleccionada
   */
  borraNota(id: any): Promise<void> {
    return this.myCollection.doc(id).delete();
  }

  leeNotasPorCriterio(titulo: string): Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.myCollection.doc(titulo).get();
  }

  public async abrirnota(nota: Nota) {
    const modal = await this.modalController.create({
      component: NotaPage,
      cssClass: 'my-custom-note',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }
  
}

