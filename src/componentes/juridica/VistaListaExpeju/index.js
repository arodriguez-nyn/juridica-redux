import { formateaFecha } from 'helpers'

const VistaListaExpeju = ({
    lista,
    numeroRegistros,
    handleClick,
    handleDelete,
    handleNuevo,
    handleClickExport,
}) => {
    return (
        <>
            <div className='contenedor__main'>
                <h2 className='contenedor__main__h2'>Lista de Expedientes</h2>
                <table className='tabla'>
                    <thead className='tabla__thead'>
                        <tr>
                            <th className='tabla__th'>Tema</th>
                            <th className='tabla__th'>Expediente</th>
                            <th className='tabla__th'>Abogado</th>
                            <th className='tabla__th'>Responsable</th>
                            <th className='tabla__th'>Recurso</th>
                            <th className='tabla__th'>Estado</th>
                            <th className='tabla__th'>Fecha Tope</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(registro => (
                            <tr className='tabla__tr' key={registro.NUMEXP}>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.DESCRIPCION_TEMA}
                                </td>
                                <td
                                    className='tabla__td align-right'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.CODEXP}
                                </td>

                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NOMBRE_ABOGADO}
                                </td>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NOMBRE_RESPONSABLE}
                                </td>
                                <td
                                    className='tabla__td'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.NUMREC}
                                </td>
                                <td
                                    className='tabla__td align-center'
                                    onClick={() => handleClick(registro)}
                                >
                                    {registro.ESTADO}
                                </td>
                                <td
                                    className='tabla__td align-center'
                                    onClick={() => handleClick(registro)}
                                >
                                    {formateaFecha(registro.FECTOP)}
                                </td>
                                <td
                                    className='tabla__td table__del-th'
                                    onClick={() => handleDelete(registro)}
                                    title='Eliminar registro'
                                >
                                    <i className='far fa-trash-alt'></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <footer className='contenedor__footer'>
                    {numeroRegistros !== 0 && (
                        <span>{`${numeroRegistros} ${
                            numeroRegistros > 0 ? 'registros' : 'registro'
                        }`}</span>
                    )}
                    <div className='buttons-footer'>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleNuevo}
                        >
                            Alta
                        </button>
                        <button
                            className='btn footer__btn'
                            type='button'
                            onClick={handleClickExport}
                        >
                            Excel
                        </button>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default VistaListaExpeju
