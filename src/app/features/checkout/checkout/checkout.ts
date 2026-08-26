import { Component, inject, signal } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule,ValidationErrors,Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

type PedidoFinalizado = {
  codigo: number;
  cliente: string;
  email: string;
  quantidadeItens: number;
  total: number;
  itens: ItemCarrinho[];
};

function nomeSemNumeros(
  controle: AbstractControl
): ValidationErrors | null {
  const valor = controle.value;
  if (!valor) {
    return null;
  }
  if (/\d/.test(valor)) {
    return { numeroInvalido: true };
  }
  return null;
}

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    PrecoFormatadoPipe
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  carrinhoFacade = inject(CarrinhoFacade);
  // Guarda os dados do pedido finalizado para exibir confirmação real na tela.
  pedidoFinalizado = signal<PedidoFinalizado | null>(null);
  formulario = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      nomeSemNumeros
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    endereco: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  finalizar() {
    this.pedidoFinalizado.set(null);
    if (this.carrinhoFacade.carrinhoVazio()) {
      console.log(
        'Não é possível finalizar uma compra com o carrinho vazio.'
      );
      return;
    }

    if (this.formulario.invalid) {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched();
      return
    }

    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();

    // Cria um resumo simples do pedido
    // antes de limpar o carrinho.
    const pedido: PedidoFinalizado = {
      codigo: Date.now(),
      cliente: dados.nome ?? '',
      email: dados.email ?? '',
      quantidadeItens: itens.length,
      total,
      itens,
    };

    console.log('Compra finalizada com sucesso!');
    console.log('Pedido:', pedido);
    console.log('Dados do formulário:', dados);

    // Após finalizar, o carrinho global é limpo.
    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.pedidoFinalizado.set(pedido);
  }

}