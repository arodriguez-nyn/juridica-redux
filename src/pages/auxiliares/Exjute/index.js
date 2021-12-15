import { useContext, useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import {
    guardaExjute,
    borrarExjute,
    obtenerRegistrosExjute,
} from 'services/exjute'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import {
    setRegistroActualExjute,
    setOrdenacionExjute,
} from 'redux/actions/juridica'
import AuthContext from 'context/AuthContext'

// Hooks
import useNavegacionExjute from 'hooks/navegacion/useNavegacionExjute'

// Componentes
import Alerta from 'componentes/Alerta'
import FiltroListaExjute from 'componentes/filtros/FiltroListaExjute'
import ModalLoading from 'componentes/modales/ModalLoading'
import FormularioExjute from 'componentes/auxiliares/exjute/FormularioExjute'
import ListaExjute from 'componentes/auxiliares/exjute/ListaExjute'
import Navegacion from 'componentes/Navegacion'

import './styles.css'

const Exjute = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const { ordenacionExjute, filtroExjute, registroActualExjute } =
        useSelector(state => state.juridicaReducer)
    const { guardaUsuario } = useContext(AuthContext)
    const listaOrdenacion = ['Tema', 'Tema Desc']
    const tabla = 'exjute'

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const gestionErrores = mensaje => {
        const inicio = mensaje.indexOf(':') + 2
        const fin = mensaje.indexOf('(') - 1
        setMensaje({
            tipo: 'error',
            texto: mensaje.substring(inicio, fin),
        })
    }

    const guardarRegistro = (
        accion = '',
        registro = { codtem: 0, descri: '' }
    ) => {
        accion !== 'Volver' && setLoading(true)

        guardaExjute(registro, registroActualExjute).then(respuesta => {
            accion !== 'Volver' && setLoading(false)

            const { success } = respuesta

            if (success) {
                dispatch(
                    setRegistroActualExjute(
                        respuesta.request.response.dsEXJUTE.ttEXJUTE[0]
                    )
                )
                // obtenerRegistros(filtroActualExjute)

                actualizarVista(filtroExjute, paginaExjute, ordenacionExjute)
                accion !== 'Volver' &&
                    setMensaje({
                        tipo: 'exito',
                        texto: 'Registro guardado correctamente',
                    })
                accion === 'Volver' && history.push('/expeju/formulario')
            } else {
                const error = respuesta.request.response._errors[0]._errorMsg
                gestionErrores(error)
            }
        })
    }

    const borrarRegistro = registroActual => {
        borrarExjute(registroActual)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                // setPaginaExjute(paginaExjute ? paginaExjute : 1)
                actualizarVista(filtroExjute, paginaExjute, ordenacionExjute)
            })
            .catch(error => {
                console.log(error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al eliminar el registro',
                })
            })
    }

    const obtenerRegistros = (filtro = '') => {
        if (!usuario) return

        setLista(null)
        setLoading(true)

        obtenerRegistrosExjute(filtro).then(
            jsdo => {
                setLoading(false)
                if (!jsdo) {
                    // Sesión caducada
                    guardaUsuario(null)
                    history.push('/')
                    return
                }

                const { success, request } = jsdo
                if (success) {
                    const lista = request.response.dsEXJUTE.ttEXJUTE
                    if (lista) {
                        setLista(lista)
                    } else {
                        setLista(null)
                    }
                }
                return jsdo
            },
            error => {
                setLoading(false)
                console.log('error ListaExjute', error)
                return error
            }
        )
    }

    const obtieneRegistroActual = registro => {
        dispatch(setRegistroActualExjute(registro))
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Tema':
                campoOrdenacion = {
                    nombre: 'DESCRI',
                    descripcion: 'Tema',
                }
                break
            case 'Tema Desc':
                campoOrdenacion = {
                    nombre: 'DESCRI DESC',
                    descripcion: 'Tema Desc',
                }
                break
        }
        setOrderBy(campoOrdenacion.nombre)
        dispatch(setOrdenacionExjute(campoOrdenacion))
    }

    // Hook para la paginación
    const {
        paginaExjute,
        numeroPaginas,
        numeroRegistros,
        numeroLineas,
        setOrderBy,
        handlePrimero,
        handleSiguiente,
        handleAnterior,
        handleUltimo,
        modificaNumeroLineas,
        actualizarVista,
    } = useNavegacionExjute({
        obtenerRegistros,
        tabla,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) return

        if (ordenacionExjute && ordenacionExjute.nombre)
            setOrderBy(ordenacionExjute.nombre)

        actualizarVista(filtroExjute, paginaExjute, ordenacionExjute)
    }, [usuario, filtroExjute, ordenacionExjute])

    useEffect(() => {
        dispatch(setRegistroActualExjute(null))
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Temas de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}

                <div className='contenedor__main'>
                    <FormularioExjute
                        registroActual={registroActualExjute}
                        guardarRegistro={guardarRegistro}
                        setMensaje={setMensaje}
                        obtieneRegistroActual={obtieneRegistroActual}
                    />
                    <div className='lista'>
                        <h2 className='contenedor__main__h2'>
                            Lista de Temas de Expedientes
                        </h2>
                        <FiltroListaExjute actualizarVista={actualizarVista} />
                        {lista && (
                            <Navegacion
                                campoOrdenacion={ordenacionExjute}
                                ordenacion={listaOrdenacion}
                                paginaActual={paginaExjute}
                                numeroPaginas={numeroPaginas}
                                numeroLineas={numeroLineas}
                                handleAnterior={handleAnterior}
                                handleSiguiente={handleSiguiente}
                                handlePrimero={handlePrimero}
                                handleUltimo={handleUltimo}
                                modificaNumeroLineas={modificaNumeroLineas}
                                modificaOrdenacion={modificaOrdenacion}
                            />
                        )}

                        <ListaExjute
                            lista={lista}
                            numeroRegistros={numeroRegistros}
                            borrarRegistro={borrarRegistro}
                            obtieneRegistroActual={obtieneRegistroActual}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exjute
