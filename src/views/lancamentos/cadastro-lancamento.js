import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";

import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        console.log(this.state)
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
            <Card title="Cadastro de Lançamento">
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
                        <button onClick={this.submit} className="btn btn-success">Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>                       
                </div>
            </Card>

        )
    }

}

export default withRouter(CadastroLancamentos);