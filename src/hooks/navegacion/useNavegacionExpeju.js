import { useState, useEffect } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setPaginaExpeju } from 'redux/actions/juridica'

import { contarRegistros } from 'services/common'

const useNavegacionExpeju = ({ tabla, defaultOrderBy, obtenerRegistros }) => {
    const dispatch = useDispatch()
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [numeroRegistros, setNumeroRegistros] = useState(0)
    const [ablFilter, setAblFilter] = useState('')
    const [orderBy, setOrderBy] = useState(defaultOrderBy)
    const [numeroLineas, setNumeroLineas] = useState(10)
    const { paginaExpeju } = useSelector(state => state.juridicaReducer)

    const handleSiguiente = () => {
        const pagina =
            paginaExpeju < numeroPaginas ? paginaExpeju + 1 : numeroPaginas

        dispatch(setPaginaExpeju(pagina))
    }

    const handleAnterior = () => {
        const pagina = paginaExpeju > 1 ? paginaExpeju - 1 : paginaExpeju

        dispatch(setPaginaExpeju(pagina))
    }

    const handlePrimero = () => {
        dispatch(setPaginaExpeju(1))
    }

    const handleUltimo = () => {
        dispatch(setPaginaExpeju(numeroPaginas))
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
            setNumeroRegistros(null)
        }
    }

    useEffect(async () => {
        /* Tenemos que poner específicamente !== null porque si está en blanco
            no funciona la llamada condicional */
        if (ablFilter !== null && paginaExpeju !== 0) {
            actualizarVista(ablFilter, paginaExpeju, orderBy)
        }
    }, [ablFilter, paginaExpeju, numeroLineas, orderBy])

    return {
        paginaExpeju,
        numeroPaginas,
        numeroRegistros,
        setPaginaExpeju,
        numeroLineas,
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

export default useNavegacionExpeju
