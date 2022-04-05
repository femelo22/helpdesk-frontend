import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  } 

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private parmRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.tecnico.id = this.parmRoute.snapshot.paramMap.get('id'); //PEGAR O PARAMETRO QUE ESTÁ VINDO NA URL
    this.findById();
  }


  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      console.log(resposta);
      this.tecnico = resposta;
      this.tecnico.perfis = resposta.perfis
    });
  }

  delete(): void {
    console.log(this.tecnico);
    this.service.delete(this.tecnico.id).subscribe(resposta => {
      console.log(resposta);
      this.toast.success('Técnico deletado com sucesso!', 'Delete');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if(ex.error.erros) {
        ex.error.erros.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.error);
      }
    })
  }

}
