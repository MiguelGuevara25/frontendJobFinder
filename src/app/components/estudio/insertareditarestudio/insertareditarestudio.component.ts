import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estudio } from '../../../models/estudio';
import { EstudioService } from '../../../services/estudio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-insertareditarestudio',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertareditarestudio.component.html',
  styleUrl: './insertareditarestudio.component.css',
})
export class InsertareditarestudioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  estudio: Estudio = new Estudio();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EstudioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', Validators.required],
      centro: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.estudio.id = this.form.value.codigo;
      this.estudio.title_obtained = this.form.value.titulo;
      this.estudio.study_center = this.form.value.centro;
      this.estudio.start_date = this.form.value.fecha_inicio;
      this.estudio.end_date = this.form.value.fecha_fin;

      if (this.edicion) {
        this.eS.update(this.estudio).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.estudio).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }

      this.router.navigate(['/estudios']);
    } else {
      this.form.markAllAsTouched();
      // Forzar animación shake si hay error
      this.triggerShake('name');
      if (this.edicion) this.triggerShake('id');
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          titulo: new FormControl(data.title_obtained, Validators.required),
          centro: new FormControl(data.study_center, Validators.required),
          fecha_inicio: new FormControl(data.start_date, Validators.required),
          fecha_fin: new FormControl(data.end_date, Validators.required),
        });
      });
    }
  }

  triggerShake(controlName: string) {
    const field = document.querySelector(`.form-control-${controlName}`);
    if (field) {
      field.classList.remove('shake');
      void (field as HTMLElement).offsetWidth; // Fuerza reflow
      field.classList.add('shake');
    }
  }
}
