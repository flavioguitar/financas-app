import  React from 'react'

import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import UsuarioService from '../app/service/usuarioService';
import { mensagemErro,mensagemSucesso } from '../components/toastr';

class CadastrarUsuario extends React.Component{

    state = {
        nome:'',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    constructor(){
        super();
        this.service = new UsuarioService()
    }

    validar(){

        const msgs = [];

        if(!this.state.nome){
            msgs.push('Campo nome é obrigatório.')
        }

        if(!this.state.email){
            msgs.push('Campo E-mail é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um E-mail válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao ){
            msgs.push('Campo a senha 2x.')
        }else if(this.state.senha !== this.state.senhaRepeticao ){
            msgs.push('Senhas não conferem...')
        }

        return msgs;

    }

    cadastrar = () =>{     
        const msgs = this.validar();

        if(msgs && msgs.length > 0 ){

            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });

            return false
        } 

        const usuario = {
            nome:  this.state.nome,
            email:  this.state.email,
            senha:  this.state.senha
        }

        this.service.salvar(usuario)
            .then( response => {       
                mensagemSucesso('Usuário Cadastrado com Sucesso!!')
                this.props.history.push('/Login')
            }).catch( error => {               
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {

        this.props.history.push('/Login')
    }

    render(){
        return(

                <Card title="Cadastro de Usuário">     
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component"> 
                                <FormGroup label="Nome: *" htmlfor="inputNome">
                                    <input type="text"
                                           id="inputNome"
                                           className='form-control'
                                           name="nome" 
                                           onChange={e => this.setState({nome: e.target.value})}
                                           />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlfor="inputEmail">
                                    <input type="text"
                                           id="inputEmail"
                                           className='form-control'
                                           name="Email" 
                                           onChange={e => this.setState({email: e.target.value})}
                                           />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlfor="inputSenha">
                                    <input type="password"
                                           id="inputSenha"
                                           className='form-control'
                                           name="Senha" 
                                           onChange={e => this.setState({senha: e.target.value})}
                                           />
                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlfor="inputRepitaSenha">
                                    <input type="password"
                                           id="inputRepitaSenha"
                                           className='form-control'
                                           name="Senha" 
                                           onChange={e => this.setState({senhaRepeticao: e.target.value})}
                                           />
                                </FormGroup>
                                <button type="button" onClick={this.cadastrar} className='btn btn-success'>Salvar</button>
                                <button type="button"  onClick={this.cancelar} className='btn btn-danger'>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
           
        )
    }
}

export default withRouter(CadastrarUsuario)