import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Curso } from '../../../models/curso';
import { Empresa } from '../../../models/empresa';
import { MatSelectModule } from '@angular/material/select';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id:number =0
  edicion: boolean = false;

  constructor(
    private cS: CursoService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private eS: EmpresaService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void{
    this.route.params.subscribe((data:Params)=> {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
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
    });
  }
  aceptar(): void{
    if(this.form.valid){
      this.curso.idCurso= this.form.value.idCurso;
      this.curso.tituloCurso= this.form.value.tituloCurso;
      this.curso.descripcionCurso= this.form.value.descripcionCurso;
      this.curso.plataformaCurso= this.form.value.plataformaCurso;
      this.curso.linkCurso=this.form.value.linkCurso;
      this.curso.empresa=this.form.value.empresa.id;
      if(this.edicion){
        this.cS.update(this.curso).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      } else{
        this.cS.insert(this.curso).subscribe(()=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['cursos'])
    }
  }
  init(){
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCurso: new FormControl(data.idCurso),
          tituloCurso: new FormControl(data.tituloCurso),
          descripcionCurso: new FormControl(data.descripcionCurso),
          plataformaCurso: new FormControl(data.plataformaCurso),
          linkCurso: new FormControl(data.linkCurso),
          empresa: new FormControl(data.empresa),
        });
      });
    }
  }
  }

