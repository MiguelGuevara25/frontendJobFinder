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
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarempresa',
  imports: [MatInputModule,
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
  empresa: Empresa = new Empresa();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      sector: ['', Validators.required],
      website: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      mail: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.empresa.id = this.form.value.idContrato;
      this.empresa.name = this.form.value.startDate;
      this.empresa.description = this.form.value.endDate;
      this.empresa.sector = this.form.value.salary;
      this.empresa.website = this.form.value.contractType;
      this.empresa.address = this.form.value.address;

      if (this.edicion) {
        this.eS.update(this.empresa).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.empresa).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['contratos']);
    }
  }

}

