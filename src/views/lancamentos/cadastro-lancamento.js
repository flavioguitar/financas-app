import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";

import * as messages from '../../components/toastr';

import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo} = this.state;
        
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id};

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }
    
    atualizar = () => {  

        const { descricao, valor, mes, ano, tipo,status , usuario, id} = this.state;
        
        const lancamento = { descricao, valor, mes, ano, tipo, id,usuario, status, id};

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data,atualizando: true})

                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }


    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value})
    }

    render(){

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento': 'Cadastro de Lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup label="Descrição: *" id="inputDescricao">
                            <input type="text"
                                   id="inputDescricao"
                                   className='form-control'
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}
                            />
                    </FormGroup>
                    </div>                   
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <FormGroup label="Ano: *" id="inputAno">
                            <input type="number"
                                   id="inputAno"
                                   name="ano"
                                   className='form-control'
                                   value={this.state.ano}
                                   onChange={this.handleChange}
                            />
                    </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup label="Mês: *" id="inputMes">
                        <SelectMenu id="inputMes"
                                    value={this.state.mes}
                                    name="mes"
                                    onChange={this.handleChange}
                                    lista={meses} className="form-control" />
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-4">
                        <FormGroup label="Valor: *" id="inputValor">
                            <input type="number"
                                   id="inputValor"
                                   className='form-control'
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                            <FormGroup label="Tipo: *" id="inputTipo">
                                <SelectMenu id="inputTipo"
                                    name="tipo"
                                    value={this.state.tipo}
                                    onChange={this.handleChange}
                                    lista={tipos} className="form-control" />
                            </FormGroup>
                    </div>

                    <div className="col-md-4">
                            <FormGroup label="Status: *" id="inputStatus">
                                <input type="text"
                                    name="status"
                                    value={this.state.status}                                    
                                 className="form-control" disabled></input>
                            </FormGroup>
                    </div>                   
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} className="btn btn-dark">Atualizar</button>
                            ) : (
                                <button onClick={this.submit} className="btn btn-success">Salvar</button>
                            )

                        }                       
                    
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
                    </div>                       
                </div>
            </Card>

        )
    }

}

export default withRouter(CadastroLancamentos);