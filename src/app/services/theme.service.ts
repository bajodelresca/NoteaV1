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

  
}
