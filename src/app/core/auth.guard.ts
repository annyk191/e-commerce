import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth.servise";
import { inject} from "@angular/core";
import { Router } from "express";

export const authGuard: CanActivateFn = () => {
    const authService =inject(AuthService);
    const router = inject (Router);
    
    if (AuthService.usuarioLogado()){
        return true ;
    }
    return Router.createUrlTree(['/login']);
};