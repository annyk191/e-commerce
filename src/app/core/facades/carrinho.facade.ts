import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoFacade {

  private carrinhoService = inject(CarrinhoService);

  itensCarrinho = this.carrinhoService.itensCarrinho;

  quantidadeCarrinho = this.carrinhoService.quantidadeCarrinho;

  totalCarrinho = this.carrinhoService.totalCarrinho;

  adicionarProdutoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinhoService.adicionar(produto);
  }

  limparCarrinho() {
    this.carrinhoService.limpar();
  }
}
