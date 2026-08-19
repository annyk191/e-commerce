import { Injectable,inject } from "@angular/core";
import { CarrinhoService } from "../services/carrinho.service";

type  ItemCarrinho = {
    nome:string;
    preco: number;
}
@Injectable({providedIn: 'root'})

export class carrinhoFacade {

    private  carrinhoService = inject(CarrinhoService);

    itenscarrinho = this.carrinhoService.itens;
    quantidadecarrinho =this.carrinhoService.quantidadeitens;
    totalcarrinho =this.carrinhoService.totalitens;
    carrinhoVazio =this.carrinhoService.carrinhoVazio;

    adicionarProdutoCarrinho(produto: ItemCarrinho){
        this.carrinhoService.adicionar(produto);
    }

    limparCarrinho(){
        this.carrinhoService.limpar();
    }
}