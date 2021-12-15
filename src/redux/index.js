import { createStore, combineReducers } from 'redux'
import { juridicaReducer } from 'redux/reducers/juridica'
import { administracionComercialReducer } from 'redux/reducers/administracion-comercial'

const rootReducer = combineReducers({
    juridicaReducer,
    administracionComercialReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
