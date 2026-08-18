import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.servise';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {

  private router = inject(Router);
  private autheService = inject(AuthService);

  sair(){
    this.autheService.logout();
    this.router.navigateByUrl('/login');
    return;
  }
}
