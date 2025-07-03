import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Router } from 'express';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-insertareditarempresa',
  imports: [   MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,],
  templateUrl: './insertareditarempresa.component.html',
  styleUrl: './insertareditarempresa.component.css'
})
export class InsertareditarempresaComponent implements OnInit {
form: FormGroup = new FormGroup({});
entrevista: Empresa = new Empresa();

id: number = 0;
edicion: boolean = false;

  constructor(
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
  id:[''],
  name:['', Validators.required],
  description:['', Validators.required],
  sector: ['', Validators.required],
  website: ['', Validators.required],
  address:['', Validators.required],
  telephone:['', Validators.required],
  mail: ['', Validators.required],
  location: ['', Validators.required],
    });
 aceptar() {
    if (this.form.valid) {
      this.Empresa.id = this.form.value.idContrato;
      this.Empresa.name = this.form.value.startDate;
      this.Empresa.description = this.form.value.endDate;
      this.Empresa.sector = this.form.value.salary;
      this.Empresa.website = this.form.value.contractType;
      this.Empresa.address = this.form.value.address;

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

} }
