import {
    SET_PAGINA_EXPEJU,
    SET_PAGINA_EXJUAB,
    SET_PAGINA_EXJUTE,
    SET_PAGINA_EXJURE,
    SET_REGISTRO_ACTUAL_EXPEJU,
    SET_FILTRO_EXPEJU,
    SET_CAMPOS_FILTRO_EXPEJU,
    SET_ORDENACION_EXPEJU,
    SET_REGISTRO_ACTUAL_EXJUTE,
    SET_FILTRO_EXJUTE,
    SET_CAMPOS_FILTRO_EXJUTE,
    SET_ORDENACION_EXJUTE,
    SET_REGISTRO_ACTUAL_EXJUAB,
    SET_FILTRO_EXJUAB,
    SET_CAMPOS_FILTRO_EXJUAB,
    SET_ORDENACION_EXJUAB,
} from 'redux/types/juridica'

export const setPaginaExpeju = pagina => {
    return {
        type: SET_PAGINA_EXPEJU,
        payload: pagina,
    }
}

export const setPaginaExjuab = pagina => {
    return {
        type: SET_PAGINA_EXJUAB,
        payload: pagina,
    }
}

export const setPaginaExjute = pagina => {
    return {
        type: SET_PAGINA_EXJUTE,
        payload: pagina,
    }
}

export const setPaginaExjure = pagina => {
    return {
        type: SET_PAGINA_EXJURE,
        payload: pagina,
    }
}

export const setRegistroActualExpeju = registro => {
    return {
        type: SET_REGISTRO_ACTUAL_EXPEJU,
        payload: registro,
    }
}

export const setFiltroExpeju = filtro => {
    return {
        type: SET_FILTRO_EXPEJU,
        payload: filtro,
    }
}

export const setCamposFiltroExpeju = campos => {
    return {
        type: SET_CAMPOS_FILTRO_EXPEJU,
        payload: campos,
    }
}

export const setOrdenacionExpeju = camposOrdenacion => {
    return {
        type: SET_ORDENACION_EXPEJU,
        payload: camposOrdenacion,
    }
}

export const setRegistroActualExjute = registro => {
    return {
        type: SET_REGISTRO_ACTUAL_EXJUTE,
        payload: registro,
    }
}

export const setFiltroExjute = filtro => {
    return {
        type: SET_FILTRO_EXJUTE,
        payload: filtro,
    }
}

export const setCamposFiltroExjute = campos => {
    return {
        type: SET_CAMPOS_FILTRO_EXJUTE,
        payload: campos,
    }
}

export const setOrdenacionExjute = camposOrdenacion => {
    return {
        type: SET_ORDENACION_EXJUTE,
        payload: camposOrdenacion,
    }
}

export const setRegistroActualExjuab = registro => {
    return {
        type: SET_REGISTRO_ACTUAL_EXJUAB,
        payload: registro,
    }
}

export const setFiltroExjuab = filtro => {
    return {
        type: SET_FILTRO_EXJUAB,
        payload: filtro,
    }
}

export const setCamposFiltroExjuab = campos => {
    return {
        type: SET_CAMPOS_FILTRO_EXJUAB,
        payload: campos,
    }
}

export const setOrdenacionExjuab = camposOrdenacion => {
    return {
        type: SET_ORDENACION_EXJUAB,
        payload: camposOrdenacion,
    }
}
