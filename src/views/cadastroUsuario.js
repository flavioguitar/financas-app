import  React from 'react'

import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastrarUsuario extends React.Component{

    state = {
        nome:'',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    cadastrar = () =>{
        console.log('nome:', this.state.nome);
        console.log('email:', this.state.email);
        console.log('senha:', this.state.senha);
        console.log('senhaRepeticao:', this.state.senhaRepeticao);
    
    
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