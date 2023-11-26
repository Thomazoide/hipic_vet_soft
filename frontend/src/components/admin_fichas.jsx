import {useState, useEffect} from 'react'
import { Container, Dropdown, Spinner } from 'react-bootstrap'

export default function AdminFichas({query}){
    //bloque variables

    const [selectedTeam, setSelectedTeam] = useState({})
    const [renderizar, setRenderizar] = useState(false)
    const [noTeams, setNoTeams] = useState(false)

    //bloque variables
    //bloque efectos

    useEffect( () => {
        if(Array.isArray(query.data)){
            if(query.data.length > 0){
                setRenderizar(true)
                setSelectedTeam(query.data[0])
            }else{
                setNoTeams(true)
                setRenderizar(false)
            }
        }
    }, [query] )

    //bloque efectos
    //bloque funciones

    const handleSelect = (e) => {
        let auxSel
        for(let p of query.data){
            if(p.cod_equipo === e){
                auxSel = p
            }
        }
        setSelectedTeam(auxSel)
    }

    //bloque funciones
    //bloque microcomponentes

    const TeamsData = () => {
        return(
            <Container>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant='success'>
                        Equipo: {selectedTeam.codigo}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            query.data.map( p => (
                                <Dropdown.Item eventKey={p.cod_equipo} key={p.cod_equipo}>
                                    {p.cod_equipo}
                                </Dropdown.Item>
                            ) )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                { selectedTeam.horses ?
                    <Container className='lista-caballos'>
                        <h3>Caballos con ficha</h3>
                        <Container className='ficha-info'>
                            {
                                selectedTeam.horses.map( h => {
                                    if(h.ficha[0]){
                                        return(
                                            <Container key={h.codigo_caballo} className='displayer'>
                                                <p className='minititle'>Nombre: {h.nombre}</p>
                                                <p>Codigo: {h.codigo_caballo}</p>
                                                <p>Peso: {h.ficha[0].peso['$numberDecimal']}</p>
                                                <p>Habilitado:  { h.ficha[0].habilitado ? <strong className='text-success'>SI</strong> : <strong className='text-danger'>NO</strong> } </p>
                                            </Container>
                                        )
                                    }
                                } )
                            }
                        </Container>
                        <hr/>
                        <h3>Caballos sin ficha</h3>
                        <Container className='spread-data'>
                            {
                                selectedTeam.horses.map( h => {
                                    if(!h.ficha[0]){
                                        return(
                                            <Container key={h.codigo_caballo} className='displayer'>
                                                <p className='minititle'>Nombre: {h.nombre}</p>
                                                <p>Codigo: {h.codigo_caballo}</p>
                                            </Container>
                                        )
                                    }
                                } )
                            }
                        </Container>
                    </Container>
                    : <Container className='lista-caballos'>
                        <h3 className='text-warning' >Equipo sin caballos...</h3>
                    </Container>
                }
            </Container>
        )
    }

    //bloque microcomponentes
    //bloque renderizado
    
    if(query.isError){
        return(
            <Container className='lista-caballos'>
                <h1>Error al obtener datos<br/>Se recomienda iniciar sesion nuevamente...</h1>
            </Container>
        )
    }

    if(query.data.length < 1){
        return(
            <Container className='lista-caballos'>
                <h1>No hay fichas creadas en ningun equipo</h1>
            </Container>
        )
    }

    return(
        <Container>
            {(query.isLoading || query.isFetching) ? <Spinner variant='success'/> : null}
            {(renderizar && !noTeams ) ? <TeamsData/> : null}
            {noTeams ? <Container className='lista-caballos'> <h3 className='text-warning'>No hay equipos creados...</h3> </Container> : null}
        </Container>
    )

    //bloque renderizado
}
