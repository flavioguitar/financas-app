import React from "react";
import {withRouter} from "react-router-dom"
import Card from "../components/card";
import FormGroup from "../components/form-group";
import SelectMenu from "../components/selectMenu";

class ConsultaLancamentos extends React.Component{

    render(){
        const meses = [
            {label: 'Selecione...', value:''},
            {label: 'Janeiro', value:'1'},
            {label: 'Fevereiro ', value:'2'},
            {label: 'Março', value:'3'},
            {label: 'Abril', value:'4'},
            {label: 'Maio', value:'5'},
            {label: 'Junho', value:'6'},
            {label: 'Julho', value:'7'},
            {label: 'Agosto', value:'8'},
            {label: 'Setembro', value:'9'},
            {label: 'Outubro', value:'10'},
            {label: 'Novembro', value:'11'},
            {label: 'Dezembro', value:'12'}
        ]

        const tipos = [
            {label: 'Selecione...', value:''},
            {label: 'Despesas', value:'DESPESA'},
            {label: 'Receitas', value:'RECEITA'}
        ]

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" Label="Ano: *" >
                            <input type="text"
                                    id="inputAno"
                                    className='form-control'
                                    placeholder="Digite o ano"
                                    />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" Label="Mês: ">                           
                                <SelectMenu id="inputMes" className="form-control" lista={meses}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" Label="Tipo de Lancamento: ">                           
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos}/>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);