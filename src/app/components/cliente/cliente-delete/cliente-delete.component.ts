import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  } 

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private parmRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.parmRoute.snapshot.paramMap.get('id'); //PEGAR O PARAMETRO QUE ESTÁ VINDO NA URL
    this.findById();
  }


  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      console.log(resposta);
      this.cliente = resposta;
      this.cliente.perfis = resposta.perfis
    });
  }

  delete(): void {
    console.log(this.cliente);
    this.service.delete(this.cliente.id).subscribe(resposta => {
      console.log(resposta);
      this.toast.success('Cliente deletado com sucesso!', 'Delete');
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
