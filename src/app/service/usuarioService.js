import ApiService from "../apiservice";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }


    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    obterSaldoPorUsuarioMes(id){
        return this.get(`/${id}/saldoMes`)
    }

    salvar(usuario){
       return this.post("/",usuario)
    }
}

export default UsuarioService;