import  React from 'react';

import Login from '../views/login';
import CadastrarUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import consultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamento';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

const isUsuarioAutenticado = () => {
    return false;
}

function RotaAutenticada({ component: Component, ...props }){
    return (
        <Route {...props} render = { (componentProps) => {
            if(isUsuarioAutenticado()){
              return (
                <Component {...componentProps} />
              )  
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: {from:componentProps.location}} } />
                )
            }
        } } />
    )
}
function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <RotaAutenticada path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrarUsuario} />
                <RotaAutenticada path="/consulta-lancamentos" component={consultaLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch> 
        </HashRouter>
    )
}

export default Rotas