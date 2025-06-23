import { Routes } from '@angular/router';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarComponent } from './components/usuario/insertareditar/insertareditar.component';

export const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuarioComponent,
        children: [
            {
                path: '', component: ListarUsuarioComponent
            },
            {
                path: 'registrar', component: InsertareditarComponent
            }
        ],
    }
];
