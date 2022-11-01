import React from "react";
import {withRouter} from "react-router-dom"
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";

import * as messages from '../../components/toastr';

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';


class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        descricao: '',
        tipo: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
            mes: this.state.mes,
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

    AbrirConfirmacao = (lancamento) => {

        this.setState({ showConfirmDialog: true,lancamentoDeletar: lancamento })

    }

    CancelarDelecao = () => {
        this.setState({ showConfirmDialog: false,lancamentoDeletar: {} })
    }

    deletar = (lancamento) => {
       this.service.deletar(this.state.lancamentoDeletar.id)
       .then(response =>{
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index,1)
            this.setState(lancamentos)

            messages.mensagemSucesso("Lancamento deletado com sucesso")
            this.setState({ showConfirmDialog: false,lancamentoDeletar: {} })
       }).catch(error =>{
            messages.mensagemErro("Erro ao deletar o lancamento")
       })
    }

    editar = (id) => {
        
       this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    cadastrarLancamento = () => {

        this.props.history.push('/cadastro-lancamentos')       
    }

    alterarStatus = (lancamento,status) => {
        this.service
            .alterarStatus(lancamento.id,status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamentos});
                }

                messages.mensagemSucesso("Status atualizado com sucesso");
            })
    }

    render(){
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipos()
        
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.CancelarDelecao} 
                        className="p-button-secondary"/>
            </div>
        );

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
                            <button onClick={this.buscar} 
                                    type="button"
                                    className="btn btn-success" >
                                        <i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.cadastrarLancamento} 
                                    type="button" 
                                    className="btn btn-danger">
                                        <i className="pi pi-plus"></i>  Cadastrar</button>                            
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deleteAction={this.AbrirConfirmacao}
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({showConfirmDialog: false}) }>
                                Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);