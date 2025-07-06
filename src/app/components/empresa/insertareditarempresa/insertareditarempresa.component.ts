import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Empresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarempresa',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './insertareditarempresa.component.html',
  styleUrl: './insertareditarempresa.component.css',
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

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
      this.empresa.id = this.form.value.id;
      this.empresa.name = this.form.value.name;
      this.empresa.description = this.form.value.description;
      this.empresa.sector = this.form.value.sector;
      this.empresa.website = this.form.value.website;
      this.empresa.address = this.form.value.address;
      this.empresa.telephone = this.form.value.telephone;
      this.empresa.mail = this.form.value.mail;
      this.empresa.location = this.form.value.location;

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
      this.router.navigate(['empresa']);
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          description: new FormControl(data.description),
          sector: new FormControl(data.sector),
          website: new FormControl(data.website),
          address: new FormControl(data.address),
          telephone: new FormControl(data.telephone),
          mail: new FormControl(data.mail),
          location: new FormControl(data.location),
        });
      });
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });

    this.router.navigate(['empresa']);
  }
}
