import { useState, useEffect } from 'react'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import { setFiltroExjute, setCamposFiltroExjute } from 'redux/actions/juridica'

import './styles.css'

const FiltroListaExjute = ({ actualizarVista }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [filtroExpandido, setFiltroExpandido] = useState(false)
    const dispatch = useDispatch()
    const camposFiltroExjute = useSelector(state => state.camposFiltroExjute)
    const [inputFiltro, setInputFiltro] = useState(
        camposFiltroExjute
            ? {
                  descri: camposFiltroExjute.DESCRI,
              }
            : {
                  descri: '',
              }
    )
    const { descri } = inputFiltro

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    /* Declaramos esta función porque la pide el hook */
    const handleSubmit = e => {
        e.preventDefault()

        setFiltroExpandido(false)

        // Montamos los filtros
        const filtroTemas =
            inputFiltro.descri === ''
                ? ''
                : `DESCRI MATCHES '*${inputFiltro.descri}*'`
        let ablFilter = ''
        if (filtroTemas !== '') {
            ablFilter = `${filtroTemas} `
        }

        // Guardamos en el contexto para recuperarlo al reentrar en la pantalla
        dispatch(
            setCamposFiltroExjute({
                DESCRI: inputFiltro.descri,
            })
        )

        actualizarVista(ablFilter, 1, '')
        dispatch(setFiltroExjute(ablFilter))
    }

    const handleChange = e => {
        setInputFiltro({
            ...inputFiltro,
            [e.target.name]: e.target.value,
        })
    }

    const handleLimpiar = () => {
        setFiltroExpandido(false)
        setInputFiltro({
            descri: '',
        })
        actualizarVista('', 1, '')
        setFiltroExjute('')
    }

    useEffect(() => {
        camposFiltroExjute &&
            setInputFiltro({
                descri: camposFiltroExjute.DESCRI,
            })
    }, [camposFiltroExjute])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className='contenedor-filtro'>
            <header className='contenedor-filtro__header'>
                <h1 className='contendor-filtro__h1'>Filtros</h1>
                <span
                    className='contendor-filtro__toggle'
                    onClick={() => setFiltroExpandido(!filtroExpandido)}
                >
                    <i className='fas fa-bars fa-lg'></i>
                </span>
            </header>
            {filtroExpandido && (
                <form onSubmit={handleSubmit}>
                    <main className='contenedor-filtro__main'>
                        <div className='grid col-2'>
                            <div>
                                <label htmlFor='filtro-tema'>
                                    Descripción Tema
                                </label>
                                <input
                                    id='filtro-tema'
                                    className='form__input'
                                    name='descri'
                                    value={descri}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </main>
                    <footer className='contenedor-filtro__footer'>
                        <button className='btn' width='120px' type='submit'>
                            Aplicar
                        </button>
                        <button
                            className='btn contenedor-filtro__last-btn'
                            type='button'
                            onClick={handleLimpiar}
                        >
                            Limpiar
                        </button>
                    </footer>
                </form>
            )}
        </div>
    )
}

export default FiltroListaExjute
