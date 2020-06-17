import { ModalConfirmActionComponent } from './../modals/modal-confirm-action/modal-confirm-action.component';
import { ModalAddUpdateComponent } from './../modals/modal-add-update/modal-add-update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/models';
import { AutosService } from '../services/autos.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  page = 1;
  pageSize = 10;
  autos: Automovil[];
  constructor(private autosService: AutosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.autosService.getAutos().subscribe((response) => {
      this.autos = response.data;
    })
  }

  openModalEditar(auto: Automovil) {
    const modalRef = this.modalService.open(ModalAddUpdateComponent, { centered: true });
    modalRef.componentInstance.auto = auto;
    modalRef.componentInstance.accion = 'Editar';

    modalRef.result.then(
      (auto) => {
        this.autosService.updateAutos(auto).subscribe(response => console.log(response));
      },
      (reason) => {
        console.log(reason);
      }
    )
  }

  openModalConfirmarEliminar(auto: Automovil) {
    const modalRef = this.modalService.open(ModalConfirmActionComponent, {centered: true})
    modalRef.componentInstance.auto = auto;

    modalRef.result.then(
      (autoTemp) => {
        this.autosService.deleteAuto(autoTemp).subscribe(response => {
          console.log("Respuesta cuando se termina de eliminar un auto");
          console.log(response);
        });
      },
      (reason) => {
        console.log(reason);
      }
    )
  }
}
