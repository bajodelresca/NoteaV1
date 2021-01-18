import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer:Renderer2;

  constructor(private rendererFactory:RendererFactory2, @Inject(DOCUMENT) private document:Document) { 
    this.renderer=this.rendererFactory.createRenderer(null,null);
  }
  themeMode=-1;

  changeTheme($event, mode) {
    console.log($event);
    this.themeMode = mode;
    if($event.detail.checked){
      switch(mode){
        case 0:
          document.body.classList.toggle('dark-theme');
          break;
        case 1:
          document.body.classList.toggle('blue-theme');
          break;
        case 2:
          document.body.classList.toggle('orange-theme');
          break;
      }
    } else {
      this.themeMode = -1;
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('blue-theme');
      document.body.classList.remove('orange-theme');
    }

}
}
