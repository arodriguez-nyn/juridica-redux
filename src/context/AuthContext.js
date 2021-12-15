import React, { useState, createContext } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [paginaActual, setPaginaActual] = useState(null)

    const guardaUsuario = usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario))
        setUsuario(usuario)
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                paginaActual,
                guardaUsuario,
                setPaginaActual,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
