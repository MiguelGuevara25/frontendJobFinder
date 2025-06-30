import { Curso } from "./curso";
import { Usuario } from "./usuario";

export class InscripcionCurso{
idInscripcion: number=0;
fechaInscripcionCurso: Date= new Date();
progresoInscripcionCurso: string="";
curso: Curso= new Curso();
usuario: Usuario= new Usuario();
}