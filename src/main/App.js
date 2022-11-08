import React from "react";
import Rotas from "./rotas";
import NavBar from "../components/navbar";
import ProvedorAutenticao from "./provedorAutenticacao";

import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'   

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
class App extends React.Component {

  render(){
    return (
      <ProvedorAutenticao>
        <NavBar/>        
        <div className="container">
          <Rotas/>
      </div>
    </ProvedorAutenticao>
    ) 
  }

}

export default App;
