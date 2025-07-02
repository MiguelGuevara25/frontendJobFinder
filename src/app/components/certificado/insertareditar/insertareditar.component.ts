import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Certificado } from '../../../models/certificado';
import { CertificadoService } from '../../../services/certificado.service';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,

    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarCertificadoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  certificado: Certificado = new Certificado();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: CertificadoService,
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
      codigo: [''],
      certificado: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(150)]],
      entidad: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(150)]],
      fecha_emision: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
    const fechaEmision = new Date(this.form.value.fecha_emision);
    const fechaVencimiento = new Date(this.form.value.fecha_vencimiento);
    const hoy = new Date();

    this.form.get('fecha_emision')?.setErrors(null);
    this.form.get('fecha_vencimiento')?.setErrors(null);

    let hayError = false;

    // Validación: fecha de emisión no puede ser futura
    if (fechaEmision > hoy) {
      this.form.get('fecha_emision')?.setErrors({ fechaFutura: true });
      hayError = true;
    }

    // Validación: vencimiento no puede ser antes que emisión
    if (fechaVencimiento < fechaEmision) {
      this.form.get('fecha_vencimiento')?.setErrors({ antesDeEmision: true });
      hayError = true;
    }

    if (hayError) {
      return; 
    }
      this.certificado.idCertificado = this.form.value.codigo;
      this.certificado.nombreCertificado = this.form.value.certificado;
      this.certificado.entidadEmisoraCertificado = this.form.value.entidad;
      this.certificado.fechaEmisionCertificado = this.form.value.fecha_emision;
      this.certificado.fechaVencimientoCertificado =
        this.form.value.fecha_vencimiento;
      if (this.edicion) {
        this.cS.update(this.certificado).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Se actualizó correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/certificados'], {
              state: { mensaje: 'Se actualizó correctamente', recargar: true },
            });
          });
        });
      } else {
        this.cS.insert(this.certificado).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Se registró correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/certificados'], {
              state: { mensaje: 'Se registró correctamente', recargar: true },
            });
          });
        });
      }
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCertificado),
          certificado: new FormControl(data.nombreCertificado),
          entidad: new FormControl(data.entidadEmisoraCertificado),
          fecha_emision: new FormControl(data.fechaEmisionCertificado),
          fecha_vencimiento: new FormControl(data.fechaVencimientoCertificado),
        });
      });
    }
  }
  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/certificados']);
  }
}
