import { inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProdutoLoja } from "../models/produto-Loja";

type produtoApi = {

    title: string;
    price: number;
};

@Injectable ({providedIn: 'root'})

export class produtosService{
    private http = inject(HttpClient);
    private API = 'https://fakestoreapi.com/products';

    buscarProdutos(){
        return this.http.get<produtoApi[]>(this.API);
    }
    
    TransformarProdutos(dados: produtoApi[]):ProdutoLoja[] {
        return dados.map((produto) => ({
            nome: produto.title,
            preco: produto.price,
        }));
    }
}