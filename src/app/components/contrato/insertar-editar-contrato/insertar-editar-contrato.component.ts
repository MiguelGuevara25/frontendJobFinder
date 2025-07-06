import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Contrato } from '../../../models/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario';
import { Postulacion } from '../../../models/postulacion';
import { PostulacionService } from '../../../services/postulacion.service';
import { UsuarioService } from '../../../services/usuario.service';

const fechasValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const inicio = control.get('fecha_inicio')?.value;
  const fin = control.get('fecha_fin')?.value;

  if (inicio && fin && new Date(fin) < new Date(inicio)) {
    return { fechaFinInvalida: true };
  }

  return null;
};

@Component({
  selector: 'app-insertar-editar-contrato',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatButton,
  ],
  templateUrl: './insertar-editar-contrato.component.html',
  styleUrl: './insertar-editar-contrato.component.css',
})
export class InsertarEditarContratoComponent {
  form: FormGroup = new FormGroup({});
  contrato: Contrato = new Contrato();
  empresas: Empresa[] = [];
  listUsuario: Usuario[] = [];
  listPostulacion: Postulacion[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private pS: PostulacionService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cS: ContratoService,
    private eS: EmpresaService,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group(
      {
        id: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        salary: ['', Validators.required],
        contractType: ['', Validators.required],
        usuarios: ['', Validators.required],
        postulacion: ['', Validators.required],
        empresa: ['', Validators.required],
      },
      { validators: fechasValidator }
    );

    this.eS.list().subscribe((data) => {
      this.empresas = data;
    });

    this.pS.list().subscribe((data) => {
      this.listPostulacion = data;
    });

    this.uS.listar().subscribe((data) => {
      this.listUsuario = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.contrato.id = this.form.value.id;
      this.contrato.startDate = this.form.value.startDate;
      this.contrato.endDate = this.form.value.endDate;
      this.contrato.salary = this.form.value.salary;
      this.contrato.contractType = this.form.value.contractType;
      this.contrato.usuarios.idUsuario = this.form.value.usuarios;
      this.contrato.postulacion.id = this.form.value.postulacion;
      this.contrato.empresa.id = this.form.value.empresa;

      if (this.edicion) {
        this.cS.update(this.contrato).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);

            this.snackBar.open('¡Entrevista actualizada con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      } else {
        this.cS.insert(this.contrato).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);

            this.snackBar.open('¡Entrevista registrada con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }
      this.router.navigate(['contratos']);
    }
  }

  triggerShake(controlName: string) {
    const field = document.querySelector(`.form-control-${controlName}`);
    if (field) {
      field.classList.remove('shake');

      setTimeout(() => {
        field.classList.add('shake');
      }, 10);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          startDate: new FormControl(data.startDate),
          endDate: new FormControl(data.endDate),
          salary: new FormControl(data.salary),
          contractType: new FormControl(data.contractType),
          usuarios: new FormControl(data.usuarios.idUsuario),
          postulacion: new FormControl(data.postulacion.id),
          empresa: new FormControl(data.empresa.id),
        });
      });
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/contratos']);
  }
}
