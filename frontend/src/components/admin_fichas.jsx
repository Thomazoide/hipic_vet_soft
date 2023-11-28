import {useState, useEffect} from 'react'
import { Container, Dropdown, Spinner } from 'react-bootstrap'

export default function AdminFichas({query}){
    //bloque variables

    const [selectedTeam, setSelectedTeam] = useState({})
    const [equipos, setEquipos] = useState(null)
    const [renderizar, setRenderizar] = useState(false)
    const [noTeams, setNoTeams] = useState(false)
    const [verRazon, setVerRazon] = useState(null)

    //bloque variables
    //bloque efectos

    useEffect( () => {
        if(query.data){
            const qd = query.data.filter( t => ( t.prep !== 'open' && !Array.isArray(t) ) )
            if(Array.isArray(qd)){
                for(let t of qd){
                    if(t.horses[0]){
                        for(let h of t.horses){
                            const arr = []
                            if(h.ficha[0]){
                                for(let e of h.ficha[0].examenes) arr.push(e)
                                for(let e of h.ficha[0].vacunaciones) arr.push(e)
                                for(let e of h.ficha[0].operaciones) arr.push(e)
                            }
                            if(arr[0]){
                                h.razon = arr.reduce( (maxFechaObjeto, objeto) => {
                                    const fechaObjeto = new Date( objeto.cod.split('_')[1] )
                                    const fechaMax = new Date( maxFechaObjeto.cod.split('_')[1] )
                                    return fechaObjeto > fechaMax ? objeto : maxFechaObjeto
                                }, arr[0] )
                            }
                        }
                    }
                }
                console.log(qd)
                setEquipos(qd)
                setNoTeams(false)
                setRenderizar(true)
                setSelectedTeam(qd[0])
            }
        }else{
            setNoTeams(true)
            setRenderizar(false)
        }
        
    }, [query] )

    //bloque efectos
    //bloque funciones

    const toggleVerRazon = (e) => {}

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
                {equipos ? <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant='success'>
                        Equipo: {selectedTeam.codigo}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='team-dropdown' >
                        {
                            equipos.map( p => (
                                <Dropdown.Item eventKey={p.codigo} key={p.codigo}>
                                    {p.codigo}
                                </Dropdown.Item>
                            ) )
                        }
                    </Dropdown.Menu>
                </Dropdown>: <Spinner variant='success' size='sm'/> }
                { selectedTeam.horses[0] ?
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
                                                <button className='btn-info' > <strong className='text-dark'>?</strong> </button>
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

    return(
        <Container>
            {(query.isLoading || query.isFetching) ? <Spinner variant='success'/> : null}
            {(renderizar && !noTeams ) ? <TeamsData/> : null}
            {noTeams ? <Container className='lista-caballos'> <h3 className='text-warning'>No hay equipos creados...</h3> </Container> : null}
        </Container>
    )

    //bloque renderizado
}
