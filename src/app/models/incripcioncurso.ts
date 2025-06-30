import { Curso } from "./curso";

export class InscripcionCurso{
    idInscripcion: number=0;
    fechaInscripcionCurso: Date=new Date();
    progresoInscripcionCurso: string='';
    curso: Curso = new Curso();
}   