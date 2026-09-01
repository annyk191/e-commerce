import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritos = signal<string[]>([]);

  listaFavoritos = this.favoritos.asReadonly();
  
  adicionar(produto: string): void {
    this.favoritos.update(lista => {
      if (lista.includes(produto)) {
        return lista;
      }
      return [...lista, produto];
    });
  }
  remover(produto: string): void {
    this.favoritos.update(lista =>
      lista.filter(item => item !== produto)
    );
  }
  estaFavorito(produto: string): boolean {
    return this.favoritos().includes(produto);
  }
  limpar(): void {
    this.favoritos.set([]);
  }
}