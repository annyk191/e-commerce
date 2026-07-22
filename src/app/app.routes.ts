import { Routes } from '@angular/router';
import { ListaProdutos}from './features/produtos/lista-produtos/lista-produtos';
import { Carrinho } from './features/carrinho/carrinho/carrinho';
import { Home } from './features/home/home/home';

export const routes: Routes = [
    {
        path:'',
          component: Home,
    },
    {
        path:'produto',
        component: ListaProdutos,
    },
    {
         path:'carrinho',
          component: Carrinho,
    },
    {
        path:'**',
          redirectTo:'',
    },
];
