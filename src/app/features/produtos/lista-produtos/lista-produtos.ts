import { Component,} from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //lista com dados - Array
  produtos = signal([
    {nome: 'teclado gamer', preco:299.99},
    {nome: 'Mouse', preco:199.99},
    {nome: 'monitor', preco:899.99},
    {nome: 'desktop', preco:569.99},
    {nome: 'headsert', preco:56.99},
  ]);
  //!função para exibir selecionados pelo usuario no console
  exibirProduto(nome: string){
    console.log('Produto selecionado:', nome);
  }
  //!função que adicionar produto usando metodo update()
  adicionarproduto(){
    this.produtos.update(listaAtual => [
      ... listaAtual,
      {nome:'playstation 5',preco:3000},
    ]);
  }
  //!função que contabiliza a quantidade de produtos ma lista
  totalprodutos = computed(() => this.produtos().length);
  // função que calcula o valor total de produtos usando metodo cumputed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0
  )}
);
}
