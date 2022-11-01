import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

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

    validar(usuario){

        const erros = [];

        if(!usuario.nome){
            erros.push('Campo nome é obrigatório.')
        }

        if(!usuario.email){
            erros.push('Campo E-mail é obrigatório.')
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um E-mail válido.')
        }

        if(!usuario.senha || !usuario.senhaRepeticao ){
            erros.push('Campo a senha 2x.')
        }else if(usuario.senha !== usuario.senhaRepeticao ){
            erros.push('Senhas não conferem...')
        }

        if(erros && erros.length > 0){
            
            throw new ErroValidacao(erros);
        }

        return erros;
    }
}

export default UsuarioService;