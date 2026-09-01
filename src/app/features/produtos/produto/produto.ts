import { Component,Output,EventEmitter, Input,inject} from '@angular/core';
import { UpperCasePipe,} from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { FavoritosService } from '../../../core/services/favoritos.service';


@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule, ],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})// adicionando a classe produto com as propriedades produto, 
export class Produto {

  private favoritosService = inject(FavoritosService);

  @Input() nome = '';
  @Input() preco = 0;

  @Output() produtoSelecionado = new EventEmitter<string>();
  @Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();

   selecionarProduto(): void {
    this.produtoSelecionado.emit(this.nome);
  }

  adicionarAoCarrinho(): void {
    this.produtoAdicionado.emit({
      nome: this.nome,
      preco: this.preco
    });
  }

 adicionarFavorito(): void {
  if (this.estaFavorito()) {
    this.favoritosService.remover(this.nome);
  } else {
    this.favoritosService.adicionar(this.nome);
  }
}

  removerFavorito(): void {
    this.favoritosService.remover(this.nome);
  }

  estaFavorito(): boolean {
    return this.favoritosService.estaFavorito(this.nome);
  }

 
}