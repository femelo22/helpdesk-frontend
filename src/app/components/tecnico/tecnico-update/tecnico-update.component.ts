import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  } 


  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required); //campo requerido
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

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

  update(): void {
    console.log(this.tecnico);
    this.service.update(this.tecnico).subscribe(resposta => {
      console.log(resposta);
      this.toast.success('Técnico atualizado com sucesso!', 'Atualização');
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

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else {
      this.tecnico.perfis.push(perfil);
    } 
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid 
      && this.email.valid && this.senha.valid
  }



}
