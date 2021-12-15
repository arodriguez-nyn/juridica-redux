// Dependencias
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Contexto
import { AuthContextProvider } from 'context/AuthContext'

// Redux
import { Provider } from 'react-redux'
import store from './redux'

// Componentes
import Login from 'pages/Login'
import ListaExpeju from 'pages/juridica/ListaExpeju'
import FormularioExpeju from 'pages/juridica/FormularioExpeju'
import RutaProtegida from 'rutas/RutaProtegida'
import JuridicaLayout from 'componentes/Layout/JuridicaLayout'
import Exjuab from 'pages/auxiliares/Exjuab'
import Exjute from 'pages/auxiliares/Exjute'

const App = () => {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <Router basename={'/nynweb/'}>
                    <Switch>
                        <Route exact path='/login'>
                            <Login />
                        </Route>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <JuridicaLayout>
                            <RutaProtegida
                                exact
                                path='/expeju/lista'
                                component={ListaExpeju}
                            />
                            <RutaProtegida
                                exact
                                path='/expeju/formulario'
                                component={FormularioExpeju}
                            />
                            <RutaProtegida
                                exact
                                path='/exjute'
                                component={Exjute}
                            />
                            <RutaProtegida
                                exact
                                path='/exjuab'
                                component={Exjuab}
                            />
                        </JuridicaLayout>
                    </Switch>
                </Router>
            </AuthContextProvider>
        </Provider>
    )
}

export default App
