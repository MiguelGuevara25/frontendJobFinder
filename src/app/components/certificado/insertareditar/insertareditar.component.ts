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
import { ActivatedRoute, Params, Router,  RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      certificado: ['', Validators.required],
      entidad: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
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
          });
        });
      } else {
        this.cS.insert(this.certificado).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['certificados']);
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
}
