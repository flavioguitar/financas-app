import  React from 'react';

import Login from '../views/login';
import CadastrarUsuario from '../views/cadastroUsuario';
import Home from '../views/home';

import { Route, Switch, HashRouter } from 'react-router-dom';

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrarUsuario} />
            </Switch> 
        </HashRouter>
    )
}

export default Rotas