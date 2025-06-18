import { Certificado } from "./certificado";

export class Curso{
    idCurso: number=0;
    tituloCurso: string='';
    descripcionCurso: string='';
    plataformaCurso: string='';
    linkCurso: string='';
    empresa:Certificado= new Certificado();
}