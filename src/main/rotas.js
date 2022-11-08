import  React from 'react';

import Login from '../views/login';
import CadastrarUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import consultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamento';
import { AuthConsumer } from './provedorAutenticacao';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

function RotaAutenticada({ component: Component,isUsuarioAutenticado, ...props }){
    return (
        <Route {...props} render = { (componentProps) => {
            if(isUsuarioAutenticado){
              return (
                <Component {...componentProps} />
              )  
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: { from:componentProps.location}} } />
                )
            }
        } } />
    )
}
function Rotas(props){
    console.log('props',props)
    return (
        <HashRouter>
            <Switch>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrarUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={consultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch> 
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>    
        {
         (context) =>
         (<Rotas isUsuarioAutenticado={context.isAutenticado} />)
        
        }
    </AuthConsumer>
)