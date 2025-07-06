import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ofertadetrabajo } from '../ofertadetrabajo.component';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarofertadetrabajo',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,],
  templateUrl: './insertareditarofertadetrabajo.component.html',
  styleUrl: './insertareditarofertadetrabajo.component.css'
})
export class InsertareditarofertadetrabajoComponent {
form: FormGroup = new FormGroup({});
Ofertadetrabajo: Ofertadetrabajo = new Ofertadetrabajo();

id: number = 0;
edicion: boolean = false;

  constructor(
    private oS: OfertadetrabajoService,
    private FormBuilder: FormBuilder,
    private Router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

  this.form = this.FormBuilder.group({
  id:[''],
  name:['', Validators.required],
  salary:['', Validators.required],
  contractType: ['', Validators.required],
  experience: ['', Validators.required],
  location:['', Validators.required],
  });
}

  aceptar() {
    if (this.form.valid) {
      this.Ofertadetrabajo.id = this.form.value.id;
      this.Ofertadetrabajo.name = this.form.value.startDate;
      this.Ofertadetrabajo.salary = this.form.value.endDate;
      this.Ofertadetrabajo.contractType = this.form.value.salary;
      this.Ofertadetrabajo.experience = this.form.value.contractType;
      this.Ofertadetrabajo.location = this.form.value.address;

      if (this.edicion) {
        this.oS.update(this.Ofertadetrabajo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      } else {
        this.oS.insert(this.Ofertadetrabajo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      }
      this.Router.navigate(['ofertadetrabajo']);
    }
  }
init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
           id:new FormControl(data.id),
           name: new FormControl(data.name),
           salary: new FormControl(data.salary),
           contractType:new FormControl(data.contractType),
           experience: new FormControl(data.experience),
           location: new FormControl(data.location),

        });
      });
    }
  }
}


