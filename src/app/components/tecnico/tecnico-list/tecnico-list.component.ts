import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  id: number;
  nome: string;
  cpf: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, nome: 'Hydrogen', cpf: '1.0079', email: 'H' },
  { id: 2, nome: 'Helium', cpf: '4.0026', email: 'He' },
  { id: 3, nome: 'Lithium', cpf: '6.941', email: 'Li' },
  { id: 4, nome: 'Beryllium', cpf: '9.0122', email: 'Be' },
  { id: 5, nome: 'Boron', cpf: '10.811', email: 'B' },
  { id: 6, nome: 'Carbon', cpf: '12.0107', email: 'C' }
];
