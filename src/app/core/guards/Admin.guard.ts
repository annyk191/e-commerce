import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthFacade } from "../facades/auth.facade";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthFacade);
    if(!authService.usuarioLogado()){
        return router.createUrlTree(['/login']);
    }
    if(!authService.admin()){
        return router.createUrlTree(['/acesso-negado']);
    }
    return true;
    
}