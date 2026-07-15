import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos =[
    {nome:'teclado gamer', preco:299.99},
    {nome:'Mouse', preco:199.99},
    {nome:'monitor', preco:899.99},
    {nome:'desktop', preco:569.99},
    {nome:'headsert', preco:56.99},
  ]
}
