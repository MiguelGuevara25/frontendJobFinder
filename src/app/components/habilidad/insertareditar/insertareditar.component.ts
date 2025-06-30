import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Habilidad } from '../../../models/habilidad';
import { HabilidadService } from '../../../services/habilidad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarHabilidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  habilidad: Habilidad = new Habilidad();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private hS: HabilidadService,
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
      id: [''],
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÉÁÍÓÚñÑ\\s]+$')],
      ],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.habilidad.id_habilidad = this.form.value.id;
      this.habilidad.nombre = this.form.value.name;

      if (this.edicion) {
        this.hS.update(this.habilidad).subscribe(() => {
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
      } else {
        this.hS.insert(this.habilidad).subscribe(() => {
          this.hS.list().subscribe((data) => {
            this.hS.setList(data);
          });
        });
      }

      this.router.navigate(['/habilidades']);
    } else {
      this.form.markAllAsTouched();
      // Forzar animación shake si hay error
      this.triggerShake('name');
      if (this.edicion) this.triggerShake('id');
    }
  }

  init() {
    if (this.edicion) {
      this.hS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id_habilidad),
          name: new FormControl(data.nombre, [
            Validators.required,
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'),
          ]),
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

  soloLetras(event: KeyboardEvent) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  cancelar() {
    this.router.navigate(['/habilidades']);
  }
}
