import { useContext, useState, useEffect } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import {
    guardaExjuab,
    borrarExjuab,
    obtenerRegistrosExjuab,
} from 'services/exjuab'

// Estado global
import { useSelector, useDispatch } from 'react-redux'
import {
    setRegistroActualExjuab,
    setOrdenacionExjuab,
} from 'redux/actions/juridica'
import AuthContext from 'context/AuthContext'

// Hooks
import useNavegacionExjuab from 'hooks/navegacion/useNavegacionExjuab'

// Componentes
import Alerta from 'componentes/Alerta'
import FiltroListaExjuab from 'componentes/filtros/FiltroListaExjuab'
import ModalLoading from 'componentes/modales/ModalLoading'
import FormularioExjuab from 'componentes/auxiliares/exjuab/FormularioExjuab'
import ListaExjuab from 'componentes/auxiliares/exjuab/ListaExjuab'
import Navegacion from 'componentes/Navegacion'

import './styles.css'

const Exjuab = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [lista, setLista] = useState([])
    const { usuario } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const { ordenacionExjuab, filtroExjuab, registroActualExjuab } =
        useSelector(state => state.juridicaReducer)
    const { guardaUsuario } = useContext(AuthContext)
    const listaOrdenacion = ['Abogado', 'Abogado Desc']
    const tabla = 'exjuab'

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
        registro = { codabo: 0, descri: '' }
    ) => {
        accion !== 'Volver' && setLoading(true)

        guardaExjuab(registro, registroActualExjuab).then(respuesta => {
            accion !== 'Volver' && setLoading(false)

            const { success } = respuesta

            if (success) {
                dispatch(
                    setRegistroActualExjuab(
                        respuesta.request.response.dsEXJUAB.ttEXJUAB[0]
                    )
                )

                actualizarVista(filtroExjuab, paginaExjuab, ordenacionExjuab)
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
        borrarExjuab(registroActual)
            .then(() => {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Registro eliminado correctamente',
                })
                // setPaginaExjuab(paginaExjuab ? paginaExjuab : 1)
                actualizarVista(filtroExjuab, paginaExjuab, ordenacionExjuab)
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

        obtenerRegistrosExjuab(filtro).then(
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
                    const lista = request.response.dsEXJUAB.ttEXJUAB
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
                console.log('error ListaExjuab', error)
                return error
            }
        )
    }

    const obtieneRegistroActual = registro => {
        dispatch(setRegistroActualExjuab(registro))
    }

    const modificaOrdenacion = campo => {
        let campoOrdenacion = ''
        switch (campo) {
            case 'Abogado':
                campoOrdenacion = {
                    nombre: 'NOMBRE',
                    descripcion: 'Abogado',
                }
                break
            case 'Abogado Desc':
                campoOrdenacion = {
                    nombre: 'NOMBRE DESC',
                    descripcion: 'Abogado Desc',
                }
                break
        }
        setOrderBy(campoOrdenacion.nombre)
        dispatch(setOrdenacionExjuab(campoOrdenacion))
    }

    // Hook para la paginación
    const {
        paginaExjuab,
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
    } = useNavegacionExjuab({
        obtenerRegistros,
        tabla,
    })

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!usuario) return

        if (ordenacionExjuab && ordenacionExjuab.nombre)
            setOrderBy(ordenacionExjuab.nombre)

        actualizarVista(filtroExjuab, paginaExjuab, ordenacionExjuab)
    }, [usuario, filtroExjuab, ordenacionExjuab])

    useEffect(() => {
        dispatch(setRegistroActualExjuab(null))
    }, [])

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <ModalLoading mostrarModal={loading} />
            <div className='contenedor'>
                <h1 className='contenedor__h1'>
                    Mantenimiento de Abogados de Expedientes Judiciales
                </h1>
                {mensaje && (
                    <Alerta mensaje={mensaje.texto} tipo={mensaje.tipo} />
                )}

                <div className='contenedor__main'>
                    <FormularioExjuab
                        registroActual={registroActualExjuab}
                        guardarRegistro={guardarRegistro}
                        setMensaje={setMensaje}
                        obtieneRegistroActual={obtieneRegistroActual}
                    />
                    <div className='lista'>
                        <h2 className='contenedor__main__h2'>
                            Lista de Abogados de Expedientes
                        </h2>
                        <FiltroListaExjuab actualizarVista={actualizarVista} />
                        {lista && (
                            <Navegacion
                                campoOrdenacion={ordenacionExjuab}
                                ordenacion={listaOrdenacion}
                                paginaActual={paginaExjuab}
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

                        <ListaExjuab
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

export default Exjuab
