import { Component,inject, signal } from '@angular/core';
import{ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, PrecoFormatadoPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  carrinhofacade = inject(CarrinhoService);

  compraFinalizada = signal(false);

  formulario = new FormGroup({
    nome: new FormControl('',[Validators.required,Validators.minLength(2), nomeSemNumeros]),
    email:new FormControl('',[Validators.required, Validators.email]),
    endereco:new FormControl('',[Validators.required, Validators.minLength(5)]),
  });

  finalizar(){

    this.compraFinalizada.set(false);

    if(this.carrinhofacade.carrinhoVazio()){
      console.log('Não é possível finalizar a compra com o carrinho vazio');
      return;
    }

    if(this.formulario.invalid){
      console.log('Formulário Inválido!');
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.value;
    const itens = this.carrinhofacade.itensCarrinho();
    const total = this.carrinhofacade.totalCarrinho();

    console.log('Compra finalizada com sucesso!');
     console.log('Dados do Formulario: ', dados);
     console.log('Itens no carrinho: ', itens);
     console.log('Total de compra: ', total);

     this.carrinhofacade.limpar();
     this.formulario.reset();
     this.compraFinalizada.set(true);
  }
}
function nomeSemNumeros(controle:AbstractControl):ValidationErrors | null {
  const valor = controle.value;
  if(!valor) return null;
  if(/\d/.test(valor)){
    return{numeroInvalido:true};
  }
  return null;
}


