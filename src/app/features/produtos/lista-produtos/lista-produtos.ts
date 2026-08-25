import { Component,} from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe} from '@angular/common';
import { produtosService} from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { RouterLink } from '@angular/router';
import { ProdutoLoja } from '../../../core/models/produto-Loja';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, RouterLink, MatAnchor],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //lista com dados - Array
produtos = signal<ProdutoLoja[]>([]);
carregando =signal(true);
produtoselecionado = signal <string | null>(null);
erro = signal <string | null>(null);

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
  )});

  ValorTotalFormatado = computed(()=> this.valorTotal().toFixed(2));
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

  this.carregarProdutos();

  effect(() =>{
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalprodutos()}) -Loja da Anny`;
    }
  });
}
//Metodo para criar um estado de seleção com signal string | null
produtoSelecionado = signal <string | null>(null);
// metodo para criar um estado para carrinho con signal
adicionarAocarrinho(produto:{nome: string; preco: number}){
  this.carrinhoFacade.adicionarProdutoCarrinho(produto);
}

carregarProdutos(){
  this.erro.set(null);
  this.carregando.set(true);
  this.produtosService.buscarProdutos().subscribe({
  next: (dados) =>{
    const produtos = this.produtosService.TransformarProdutos(dados);
    this.produtos.set(produtos);
    this.carregando.set(false);
  },
  error: (erro) =>{
    console.error('Erro ao carregar produtos', erro);
    this.erro.set('erro ao carregar produtos. por favor, tente novamente!');
    this.carregando.set(false);
  }
});

}

private produtosService = inject(produtosService);
public carrinhoFacade = inject(CarrinhoFacade);

quantidadecarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalcarrinho =this.carrinhoFacade.totalCarrinho;

}