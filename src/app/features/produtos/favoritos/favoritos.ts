import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

  favoritos = signal<string[]>([]);

  novoProduto = '';

  adicionarFavorito() {
    if (this.novoProduto.trim()) {
      this.favoritos.update(lista => [
        ...lista,
        this.novoProduto.trim()
      ]);

      this.novoProduto = '';
    }
  }

  removerFavorito(item: string) {
    this.favoritos.update(lista =>
      lista.filter(produto => produto !== item)
    );
  }
}