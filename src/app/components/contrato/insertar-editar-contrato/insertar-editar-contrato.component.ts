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
import { Contrato } from '../../../models/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-insertar-editar-contrato',
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
  templateUrl: './insertar-editar-contrato.component.html',
  styleUrl: './insertar-editar-contrato.component.css',
})
export class InsertarEditarContratoComponent {
  form: FormGroup = new FormGroup({});
  contrato: Contrato = new Contrato();
  empresas: Empresa[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: ContratoService,
    private eS: EmpresaService,
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
      idContrato: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      salary: ['', Validators.required],
      contractType: ['', Validators.required],
      empresa: ['', Validators.required],
    });

    this.eS.list().subscribe((data) => {
      this.empresas = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.contrato.id = this.form.value.idContrato;
      this.contrato.startDate = this.form.value.startDate;
      this.contrato.endDate = this.form.value.endDate;
      this.contrato.salary = this.form.value.salary;
      this.contrato.contractType = this.form.value.contractType;
      this.contrato.empresa = this.form.value.empresa;

      if (this.edicion) {
        this.cS.update(this.contrato).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.contrato).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['contratos']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idContrato: new FormControl(data.id),
          startDate: new FormControl(data.startDate),
          endDate: new FormControl(data.endDate),
          salary: new FormControl(data.salary),
          contractType: new FormControl(data.contractType),
          empresa: new FormControl(data.empresa.id),
        });
      });
    }
  }
}
