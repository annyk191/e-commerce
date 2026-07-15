import { Component,input,output,EventEmitter, Input,} from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})// adicionando a classe produto com as propriedades produto, 
export class Produto {
  @Input() nome: string ='';
  @Input() nome: number = 0;
}
