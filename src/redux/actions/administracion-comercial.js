import { SET_PAGINA_OBRAS } from 'redux/types/administracion-comercial'

export const setPaginaObras = pagina => {
    return {
        type: SET_PAGINA_OBRAS,
        payload: pagina,
    }
}
