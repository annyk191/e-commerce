import { Component, signal,inject } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { FavoritosService } from '../../../core/services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css' })

  export class FavoritosComponent { 
    favoritosService = inject(FavoritosService);
    favoritos = signal<string[]>([]); novoProduto = ''; 
    adicionarFavorito(): void {
  const produto = this.novoProduto.trim();

  if (produto) {
    this.favoritosService.adicionar(produto);
    this.novoProduto = '';
  }
}
removerFavorito(item: string): void {
  this.favoritosService.remover(item);
}
  }

