import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../Interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales:Animal[]=[];
  audio = new Audio(); 
  time: any;
  order:boolean=false;
  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }


  reproducir(animal:Animal){
    this.pausar(animal);
    if(animal.reproduciendo){
      animal.reproduciendo=false;
      return;
    }
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

   this.time = setTimeout(()=> animal.reproduciendo=false, animal.duracion*1000)
  }

  private pausar(animalSel:Animal){
    clearTimeout(this.time);
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let animal of this.animales) {
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo=false;
      }
    }
  }

  borrar(i:number){
    this.animales.splice(i, 1)
  }

  doRefresh(refresher: Refresher){


    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 2000);
  }

  reorder(indices:any){
    this.animales= reorderArray(this.animales, indices)
  }
}
