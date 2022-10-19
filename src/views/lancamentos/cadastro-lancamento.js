import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";

import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    render(){

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title="Cadastro de Lançamento">
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup label="Descrição: *" id="inputDescricao">
                            <input type="text"
                                   id="inputDescricao"
                                   className='form-control'
                                   //onChange={e => this.setState({email: e.target.value})}
                            />
                    </FormGroup>
                    </div>                   
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <FormGroup label="Ano: *" id="inputAno">
                            <input type="text"
                                   id="inputAno"
                                   className='form-control'
                                   //onChange={e => this.setState({email: e.target.value})}
                            />
                    </FormGroup>
                    </div>
                    <div className="col-md-6">
                    <FormGroup label="Mês: *" id="inputMes">
                        <SelectMenu id="inputTipo" lista={meses} className="form-control" />
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-4">
                        <FormGroup label="Valor: *" id="inputValor">
                            <input type="text"
                                   id="inputValor"
                                   className='form-control'
                                   //onChange={e => this.setState({email: e.target.value})}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                            <FormGroup label="Tipo: *" id="inputTipo">
                                <SelectMenu id="inputTipo" lista={tipos} className="form-control" />
                            </FormGroup>
                    </div>

                    <div className="col-md-4">
                            <FormGroup label="Status: *" id="inputStatus">
                                <input type="text" className="form-control" disabled></input>
                            </FormGroup>
                    </div>                   
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success">Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>                       
                </div>
            </Card>

        )
    }

}

export default withRouter(CadastroLancamentos);