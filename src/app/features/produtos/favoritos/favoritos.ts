import { Component,signal} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListaProdutos } from "../lista-produtos/lista-produtos";
 
@Component({
  selector:'app-favoritos',
  standalone: true,
  imports:[FormsModule],
  templateUrl:'./favoritos.html',
  styleUrl:'./favoritos.css'
})
export class Favoritos{
  favoritos = signal<string[]>([]);
  novoProduto ="";
   
  adicionarFavorito(): void {
    const produto = this.novoProduto.trim();

       if (produto) {
      this.favoritos.update(lista => [...lista, produto]);
      this.novoProduto = '';
    }
  }

  removerFavorito(item: string): void {
    this.favoritos.update(lista =>
      lista.filter(produto => produto !== item)
    );
  }
}