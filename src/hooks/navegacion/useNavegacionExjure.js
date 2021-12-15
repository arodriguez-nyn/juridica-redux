import { useState, useEffect } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExjure } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExjure = ({ tabla, obtenerRegistros }) => {
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExjure } = useSelector(state => state.juridicaReducer)
    const dispatch = useDispatch()

    const handleSiguiente = () => {
        const pagina =
            paginaExjure < numeroPaginas ? paginaExjure + 1 : numeroPaginas

        dispatch(setPaginaExjure(pagina))
    }

    const handleAnterior = () => {
        const pagina = paginaExjure > 1 ? paginaExjure - 1 : paginaExjure

        dispatch(setPaginaExjure(pagina))
    }

    const handlePrimero = () => {
        dispatch(setPaginaExjure(1))
    }

    const handleUltimo = () => {
        dispatch(setPaginaExjure(numeroPaginas))
    }

    const modificaNumeroLineas = lineas => {
        setNumeroLineas(lineas)
    }

    const actualizarVista = async (ablFilter = '', pagina = 1) => {
        const filtro = {
            skip: numeroLineas * (pagina - 1),
            top: parseInt(numeroLineas),
            filter: ablFilter,
            sort: [orderBy],
        }

        try {
            await obtenerRegistros(filtro)
            await contarRegistros(ablFilter, tabla).then(numeroRegistros => {
                if (numeroRegistros < numeroLineas) {
                    setNumeroPaginas(1)
                } else if (numeroRegistros % numeroLineas === 0) {
                    setNumeroPaginas(Math.round(numeroRegistros / numeroLineas))
                } else {
                    setNumeroPaginas(
                        Math.trunc(numeroRegistros / numeroLineas) + 1
                    )
                }
                setNumeroRegistros(numeroRegistros)
            })
        } catch (error) {
            setNumeroPaginas(1)
            setNumeroRegistros(1)
        }
    }

    useEffect(async () => {
        /* Tenemos que poner específicamente !== null porque si está en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaExjure !== 0) {
            actualizarVista(ablFilter, paginaExjure, orderBy)
        }
    }, [ablFilter, paginaExjure, numeroLineas, orderBy])

    return {
        paginaExjure,
        numeroPaginas,
        numeroRegistros,
        numeroLineas,
        setPaginaExjure,
        setAblFilter,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        setNumeroPaginas,
        setNumeroRegistros,
        modificaNumeroLineas,
        actualizarVista,
    }
}

export default useNavegacionExjure
