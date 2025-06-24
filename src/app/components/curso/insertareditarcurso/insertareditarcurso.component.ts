/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Curso } from '../../../models/curso';
import { Empresa } from '../../../models/empresa';
import { MatSelectModule } from '@angular/material/select';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';


@Component({
  selector: 'app-insertareditarcurso',
    providers: [provideNativeDateAdapter()],

  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,MatSelectModule ],
  templateUrl: './insertareditarcurso.component.html',
  styleUrl: './insertareditarcurso.component.css'
})
export class InsertareditarcursoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  curso :Curso= new Curso();
  listaEmpresas: Empresa[]=[]

  constructor(
    private cS: CursoService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private eS: EmpresaService
  ){}

  ngOnInit(): void{
    this.form= this.formBuilder.group({
      idCurso:[''],
      tituloCurso:['', Validators.required],
      descripcionCurso:['', Validators.required],
      plataformaCurso:['', Validators.required],
      linkCurso:['', Validators.required],
      empresa: ['', Validators.required],
    });
    this.eS.list().subscribe(data=>{
      this.listaEmpresas=data
    })
  }
}*/
