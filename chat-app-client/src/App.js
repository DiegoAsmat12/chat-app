import './App.css';
import { withRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Main from './Componentes/Main';
import FormularioLogin from './Componentes/FormularioLogin';
import FormularioRegister from './FormularioRegister';

function App() {
  return (
    <div className='container'>
      <Switch>
        <Route exact path={"/register"} render={(routerProps) => <FormularioRegister {...routerProps}/>}/>
        <Route exact path={"/login"} render={(routerProps) => <FormularioLogin {...routerProps}/>}/>
        <Route path={"/"} render={(routerProps) => <Main {...routerProps}/>}/>
      </Switch> 
    </div>

  );
}

export default withRouter(App);
