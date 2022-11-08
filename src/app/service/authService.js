import React from "react";
import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO='_usuario_logado'

class AuthService extends React.Component{

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){

        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario){       
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);

    }

    static obterUsuarioAutenticado(){
        LocalStorageService.obterItem(USUARIO_LOGADO);
    }
}

export default AuthService;