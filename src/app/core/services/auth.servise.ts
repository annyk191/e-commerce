import { Injectable, signal, computed } from "@angular/core";

type Usuario ={
    email:string;
    perfil:string;
}

@Injectable({
    providedIn:'root'
})

export class AuthService{
    private usuario = signal<Usuario | null>(null);
    private tokenjwt = signal<string | null>(null);


//!COMPUTED
usuarioAtual = computed(() => this.usuario());
usuarioLogado = computed(() => this.usuario() ! == null);
token = computed(() => this.tokenjwt());

login(){}

logout(){
    this.usuario.set(null);
    this.tokenjwt.set(null);
}

obterToken(): string | null {
    return this.tokenjwt();
}

}