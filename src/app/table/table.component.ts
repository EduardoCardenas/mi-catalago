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
  constructor( private autoService: AutosService) { }

  ngOnInit(): void {
    this.autoService.getAutos().subscribe((response) => {
      this.autos = response.data;
    })
  }
  
}
