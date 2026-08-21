import { ItemCarrinho } from "./item-carrinho";

export type pedidoFinalizado ={
    codigo:number;
    cliente:string;
    quantidadeItens:number;
    total:number;
    itens:ItemCarrinho[];
}