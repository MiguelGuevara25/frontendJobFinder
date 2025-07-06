import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Detalle } from '../../../models/detalles';
import { DetallesService } from '../../../services/detalles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';
import { Estudio } from '../../../models/estudio';
import { Habilidad } from '../../../models/habilidad';
import { Certificado } from '../../../models/certificado';
import { EstudioService } from '../../../services/estudio.service';
import { HabilidadService } from '../../../services/habilidad.service';
import { CertificadoService } from '../../../services/certificado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurriculumService } from '../../../services/curriculum.service';
import { Curriculum } from '../../../models/curriculum';

@Component({
  selector: 'app-insertar-editar-detalle',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatButton,
  ],
  templateUrl: './insertar-editar-detalle.component.html',
  styleUrl: './insertar-editar-detalle.component.css',
})
export class InsertarEditarDetalleComponent {
  form: FormGroup = new FormGroup({});
  detalle: Detalle = new Detalle();
  experiencias: Experiencia[] = [];
  estudios: Estudio[] = [];
  habilidades: Habilidad[] = [];
  curriculums: Curriculum[] = [];
  certificados: Certificado[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: DetallesService,
    private eS: ExperienciaService,
    private esS: EstudioService,
    private hS: HabilidadService,
    private cuS: CurriculumService,
    private ceS: CertificadoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      experiencias: ['', Validators.required],
      estudios: ['', Validators.required],
      habilidades: ['', Validators.required],
      curriculums: ['', Validators.required],
      certificados: ['', Validators.required],
    });

    this.eS.list().subscribe((data) => {
      this.experiencias = data;
    });

    this.esS.list().subscribe((data) => {
      this.estudios = data;
    });

    this.hS.list().subscribe((data) => {
      this.habilidades = data;
    });

    this.ceS.list().subscribe((data) => {
      this.certificados = data;
    });

    this.cuS.listar().subscribe((data) => {
      this.curriculums = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.detalle.id = this.form.value.id;
      this.detalle.experiencias.id = this.form.value.experiencias;
      this.detalle.estudios.id = this.form.value.estudios;
      this.detalle.habilidades.id_habilidad = this.form.value.habilidades;
      this.detalle.curriculums.idCurriculum = this.form.value.curriculums;
      this.detalle.certificados.idCertificado = this.form.value.certificados;

      if (this.edicion) {
        this.cS.update(this.detalle).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.detalle).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['detalles']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          experiencias: new FormControl(data.experiencias.id),
          estudios: new FormControl(data.estudios.id),
          habilidades: new FormControl(data.habilidades.id_habilidad),
          curriculums: new FormControl(data.curriculums.idCurriculum),
          certificados: new FormControl(data.certificados.idCertificado),
        });
      });
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/detalles']);
  }
}
