import { Automovil } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-update',
  templateUrl: './modal-add-update.component.html',
  styleUrls: ['./modal-add-update.component.css']
})
export class ModalAddUpdateComponent implements OnInit {
  accion: string;
  auto: Automovil = {} as Automovil;
  modeloDesde: number;
  modeloHasta: number;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.auto.modelos){
      this.modeloDesde = this.auto.modelos[0];
      this.modeloHasta = this.auto.modelos[this.auto.modelos.length-1];
    }
  }
  onSubmit(){
    this.activeModal.close(this.auto);
  }
  generateModels(){
    let generatedModels: number[] = [];
    if(this.modeloDesde > this.modeloHasta){
      console.log('El año desde no puede ser mayor al año hasta.');
      return;
    }

    let i: number = this.modeloDesde;
    while(i <= this.modeloHasta){
      generatedModels.push(i);
      ++i;
    }
    this.auto.modelos = generatedModels;
  }
}
