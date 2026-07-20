import { Component,} from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
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
    this.produtoSelecionado.set(nome);
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
//!função que substituir a lista usando o metodo set()
substituirproduto(){
  this.produtos.set([
    {nome:'teclado', preco: 50 },
    {nome:'mouse', preco: 15 },
    {nome:'monitor', preco: 500 },
    {nome:'desktop', preco: 1500 },
    {nome:'headset', preco: 30 },
  ]);
}
//metodo para monitorar alterações em tempo real usando effect()
constructor(){
  effect(() =>{
    console.log('lista de produtos alterados: ', this.produtos());
  });
  effect(() =>{
    console.log('valor Total atualizado: ', this.valorTotal);
  });
  effect(() =>{
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalprodutos()}) - Loja da Anny`;
    }
  });
}
//Metodo para criar um estado de seleção com signal string | null
produtoSelecionado = signal <string | null>(null);
}
