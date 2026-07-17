import { Component,Output,EventEmitter, Input,} from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
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
}
 