import { useState } from 'react'

// Componentes
import Menu from 'componentes/Menu'
import Header from 'componentes/Header'

import './styles.css'

const JuridicaLayout = ({ children }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [showMenu, setShowMenu] = useState(false)

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <Header />
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            <main className={`solares-layout ${showMenu ? 'menu--show' : ''}`}>
                {children}
            </main>
        </>
    )
}

export default JuridicaLayout
