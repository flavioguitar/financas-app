import  React from 'react'

import Login from '../views/login'
import CadastrarUsuario from '../views/cadastroUsuario'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrarUsuario} />
            </Switch> 
        </HashRouter>
    )
}

export default Rotas