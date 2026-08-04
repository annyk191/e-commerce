import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const HttpInterceptor: HttpInterceptorFn = (req, next) =>{

    console.log('interceptando requisitação: ', req.url);

  const token = 'fake-token-jwt';
  const novaReq = req.clone({
    setHeaders: {
        authorization: 'bearer ${token}',
    },
  });
return next (novaReq). pipe(
    tap({
        next: (event) =>console.log('responde: ', event),
        error: (error) =>console.error('Error de Requisição: ', error)
    }),
    catchError((error) =>{
        console.error('ERRO GLOBAL:', error);
        if (error.status === 401){
            console.warn('usuario não autorizado!');
        }
        if (error.status ===500){
            console.warn ('erro interno do servidor!');
        }
        return throwError(() =>error);
    }),
  );
};