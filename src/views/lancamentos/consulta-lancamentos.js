import React from "react";
import {withRouter} from "react-router-dom"
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";

import * as messages from '../../components/toastr';
class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        descricao: '',
        tipo: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do campo ano é obrigatório")
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.tipo,
            descricao: this.state.descricao,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }

        this.service
        .consultar(lancamentoFiltro)
        .then( resposta => {
            this.setState({lancamentos: resposta.data })
        }).catch(error => {
            console.log("error")
        })
    }

    deletar = (lancamento) => {
       this.service.deletar(lancamento.id)
       .then(response =>{
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento)
            lancamentos.splice(index,1)
            this.setState(lancamentos)
            
            messages.mensagemSucesso("Lancamento deletado com sucesso")
       }).catch(error =>{
            messages.mensagemErro("Erro ao deletar o lancamento")
       })
    }

    editar = (id) => {
        console.log('editar',id)
    }

    render(){
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipos() 

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" Label="Ano: *" >
                            <input type="text"
                                    id="inputAno"
                                    className='form-control'
                                    value={this.state.ano}
                                    onChange={e => this.setState({ano: e.target.value})}
                                    placeholder="Digite o ano"
                                    />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" Label="Mês: ">                           
                                <SelectMenu id="inputMes"
                                            className="form-control"
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            lista={meses}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputDesc" Label="Descrição: " >
                            <input type="text"
                                    id="inputDesc"
                                    className='form-control'
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite a descrição"
                                    />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" Label="Tipo de Lancamento: ">                           
                                <SelectMenu id="inputTipo" 
                                            className="form-control"
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            lista={tipos}/>
                            </FormGroup>
                            <br />
                            <button onClick={this.buscar} type="button" className="btn btn-success" >Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction={this.deletar}
                                              editAction={this.editar}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);