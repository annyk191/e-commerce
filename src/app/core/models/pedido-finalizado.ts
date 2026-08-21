import { ItemCarrinho } from "./item-carrinho";

export type pedidoFinalizado ={
    codigo:number;
    email:string;
    cliente:string;
    quantidadeItens:number;
    total:number;
    itens:ItemCarrinho[];
}