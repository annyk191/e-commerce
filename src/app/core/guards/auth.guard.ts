import { CanActivateFn } from "@angular/router";
import { AuthFacade } from "../facades/auth.facade";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

    export const authGuard: CanActivateFn = () => {
        
        const authService = inject(AuthFacade);
        const router = inject(Router);

        if (authService.usuarioLogado()){
            return true;
        }
        return router.createUrlTree(['/login']);
    };