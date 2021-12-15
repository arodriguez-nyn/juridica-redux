import { useContext, useEffect } from 'react'

// Dependencias
import { Route, Redirect } from 'react-router-dom'

// Contexto
import AuthContext from 'context/AuthContext'

const RutaProtegida = ({ component: Component, ...props }) => {
    const { usuario, guardaUsuario } = useContext(AuthContext)

    useEffect(() => {
        const usuarioLocalStorage = localStorage.getItem('usuario', usuario)
        if (usuarioLocalStorage) {
            guardaUsuario(JSON.parse(usuarioLocalStorage))
        }
    }, [])

    return (
        <Route
            {...props}
            render={props =>
                usuario ? <Component {...props} /> : <Redirect to='/' />
            }
        />
    )
}

export default RutaProtegida
