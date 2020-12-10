import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotasService } from './services/notas.service';
import { EditNotaPage } from './pages/edit-nota/edit-nota.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from './services/auth.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Shake } from '@ionic-native/shake/ngx';
@NgModule({
  declarations: [AppComponent,EditNotaPage],
  entryComponents: [EditNotaPage],
  imports: [BrowserModule, 
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    NotasService,
    NativeStorage,
    GooglePlus,
    AuthService,
    Flashlight,
    Shake,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
