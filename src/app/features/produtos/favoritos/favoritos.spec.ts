import { Component, inject } from '@angular/core';

import { FavoritosService } from '../../../core/services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {

  private favoritosService = inject(FavoritosService);

  favoritos = this.favoritosService.favoritos;

  removerFavorito(produtoId: string): void {
    this.favoritosService.remover(produtoId);
  }

}