import  React from 'react';

import Login from '../views/login';
import CadastrarUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import consultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamento';

import { Route, Switch, HashRouter } from 'react-router-dom';

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrarUsuario} />
                <Route path="/consulta-lancamentos" component={consultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id" component={cadastroLancamentos} />                
            </Switch> 
        </HashRouter>
    )
}

export default Rotas