import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
Empresa: Empresa = new Empresa();

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
}
aceptar() {
    if (this.form.valid) {
      this.Empresa.id = this.form.value.idContrato;
      this.Empresa.name = this.form.value.startDate;
      this.Empresa.description = this.form.value.endDate;
      this.Empresa.sector = this.form.value.salary;
      this.Empresa.website = this.form.value.contractType;
      this.Empresa.address = this.form.value.address;
      this.Empresa.telephone = this.form.value.telephone;
      this.Empresa.mail = this.form.value.mail;
      this.Empresa.location = this.form.value.location;

      if (this.edicion) {
        this.eS.update(this.Empresa).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.Empresa).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['empresa']);
    }
  }
init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
           id:new FormControl(data.id),
           name: new FormControl(data.name),
           description: new FormControl(data.description),
           sector:new FormControl(data.sector),
           website: new FormControl(data.website),
           address: new FormControl(data.address),
           telephone:new FormControl(data.telephone),
           mail: new FormControl(data.mail),
           location: new FormControl(data.location),
           password:  new FormControl(data.password),
        });
      });
    }
  }

}


