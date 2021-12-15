import { SET_PAGINA_OBRAS } from 'redux/types/administracion-comercial'

const initialState = {
    paginaObras: 1,
}

export const administracionComercialReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SET_PAGINA_OBRAS:
            return {
                ...state,
                paginaObras: action.payload,
            }
        default:
            return state
    }
}
