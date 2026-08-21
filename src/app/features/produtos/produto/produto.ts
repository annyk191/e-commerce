import { Component,Output,EventEmitter, Input,} from '@angular/core';
import { UpperCasePipe,} from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ItemCarrinho } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})// adicionando a classe produto com as propriedades produto, 
export class Produto {
  @Input() nome: string ='';
  @Input() preco: number = 0;
//saida de dados de produtos selecionados para lista-produtos
 @Output() produtoSelecionado = new EventEmitter<string>();
selecionarProduto(){
  this.produtoSelecionado.emit(this.nome);
}
@Output() produtoAdicionado =new EventEmitter<{
  nome: string;
  preco: number;
}>();

adicionarAoCarrinho() {
  this.produtoAdicionado.emit({
    nome:this.nome,
    preco:this.preco,
  });
}
}
 