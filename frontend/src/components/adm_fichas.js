import {useState, useRef, useEffect} from 'react'
import { useQuery } from 'react-query'
import { Container, Button, Spinner, Dropdown} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'


export default function AdminFichas(){
    const {user} = useAuthContext()
    const [equipos, setEquipos] = useState([])
    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedHorse, setSelectedHorse] = useState({})
    const [selectedFicha, setSelectedFicha] = useState({})
    const [isFichaSelected, setIsFichaSelected] = useState(false)
    const [isTeamSelected, setIsTeamSelected] = useState(false)
    const [isHorseSelected, setIsHorseSelected] = useState(false)
    const [filteredHorses, setFilteredHorses] = useState([])
    const [horses, setHorses] = useState([])
    const [fne, setFne] = useState(false)
    
    const caballos = useQuery({
        queryKey: ['caballos'],
        queryFn: async () => {
            const res = (await axios.get('http://localhost:4444/api/caballos', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })).data
            console.log(res)
            let arr = []
            res.forEach( (h) => {
                arr.push(h.codigo_equipo)
            } )
            arr = [...new Set(arr)]
            console.log(arr)
            setSelectedTeam(arr[0])
            setEquipos(arr)
            setIsTeamSelected(true)
            return res
        }
    })
    const fichas = useQuery({
        queryKey: ['fichas'],
        queryFn: async () => {
            const res = (await axios.get('http://localhost:4444/api/fichas', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })).data
            return res
        }
    })

    useEffect( () => {
        if(isTeamSelected){
            filtrarCaballos(selectedTeam)
        }
    }, [selectedTeam] )

    useEffect( () => {
        if(isHorseSelected){
            autoSeleccion()
        }
    }, [filteredHorses] )

    const autoSeleccion = () => {
        setIsFichaSelected(false)
        let auxHorse = selectedHorse
        //let auxFichas = fichas.data
        let resSel = null
        for(let f of fichas.data){
            if(auxHorse.codigo_caballo === f.codigo){
                resSel = f
            }
        }
        if(resSel != null){
            setSelectedFicha(resSel)
            setIsFichaSelected(true)
            setFne(false)
        }else{
            setIsFichaSelected(false)
            setFne(true)
        }
    }

    const filtrarCaballos = (st) => {
        console.log(caballos.data)
        setIsHorseSelected(false)
        //let auxHorses = caballos.data
        let arr = []
        for(let h of caballos.data){
            if(h.codigo_equipo === st){
                arr.push(h)
            }
        }
        console.log(arr)
        setSelectedHorse(arr[0])
        setIsHorseSelected(true)
        setFilteredHorses(arr)
    }

    const onSelection = (e) => {
        setIsTeamSelected(false)
        console.log(e)
        setSelectedTeam(e)
        filtrarCaballos(e)
        setIsTeamSelected(true)

    }

    const onHorseSelection = (e) => {
        setIsHorseSelected(false)
        setIsFichaSelected(false)
        let auxFichas = fichas.data
        let resSel = null
        auxFichas.forEach( f => {
            if(f.codigo === e){
                resSel = f
            }
        } )
        let selHs = null
        for(let h of caballos.data){
            if(h.codigo_caballo === e){
                selHs = h
            }
        }
        if(resSel){
            setSelectedHorse(selHs)
            setSelectedFicha(resSel)
            setIsHorseSelected(true)
            setIsFichaSelected(true)
            setFne(false)
        }else{
            setSelectedHorse(selHs)
            setFne(true)
            setIsFichaSelected(false)
        }
    }

    const BotonEquipos = () => {
        return(
            <Dropdown onSelect={onHorseSelection}>
                <Dropdown.Toggle variant='success' size='sm' >
                    {selectedHorse.nombre} | {selectedHorse.codigo_caballo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        filteredHorses.map( h => (
                            <Dropdown.Item eventKey={h.codigo_caballo} key={h.codigo_caballo}> {h.nombre} | {h.codigo_caballo} </Dropdown.Item>
                        ) )
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const SeccionFicha = () => {
        return(
            <Container className='seccion-ficha'>
                    <p className='minititle'> Peso: {selectedFicha.peso['$numberDecimal']} </p>
                    <hr/>
                    <Container className='ficha-info'>
                        <Container className='displayer'>
                            <p className='minititle'> Exámenes </p>
                            <ul>
                                {
                                    selectedFicha.examenes.map( (e, i) => (
                                        <li key={i}>
                                            <Container>
                                                <p> Fecha: {e.fecha} </p>
                                                <p> Tipo: {e.tipo} </p>
                                                <hr/>
                                            </Container>
                                        </li>
                                    ) )
                                }
                            </ul>
                        </Container>
                        <Container className='displayer'>
                            <p className='minititle'> vacunaciones </p>
                            <ul>
                                {
                                    selectedFicha.vacunaciones.map( (e, i) => (
                                        <li key={i}>
                                            <Container>
                                                <p> Fecha: {e.fecha} </p>
                                                <p> Tipo: {e.tipo} </p>
                                                <hr/>
                                            </Container>
                                        </li>
                                    ) )
                                }
                            </ul>
                        </Container>
                        <Container className='displayer'>
                            <p className='minititle'> Cirujías </p>
                            <ul>
                                {
                                    selectedFicha.operaciones.map( (e, i) => (
                                        <li key={i}>
                                            <Container>
                                                <p> Fecha: {e.fecha} </p>
                                                <p> Tipo: {e.tipo} </p>
                                                <hr/>
                                            </Container>
                                        </li>
                                    ) )
                                }
                            </ul>
                        </Container>
                    </Container>
                </Container>
        )
    }

    if(caballos.isLoading || fichas.isLoading){
        return(
            <Container className='preps-info'>
                <Container>
                    <Spinner variant='success'/>
                </Container>
            </Container>
        )
    }

    if(caballos.isError || fichas.isError){
        return(
            <Container className='preps-info'>
                <Container>
                    <Spinner variant='success'/>
                </Container>
            </Container>
        )
    }

    if(caballos.isFetching || fichas.isFetching){
        return(
            <Container className='preps-info'>
                <Container>
                    <Spinner variant='success'/>
                </Container>
            </Container>
        )
    }

    if(caballos.data && fichas.data){
        return(
            <Container>
                <Container className='botones-admin'>
                    <Container className='boton-admin'>
                        <p>Selección de equipo</p>
                        <Dropdown onSelect={onSelection} >
                            <Dropdown.Toggle variant='success' size='sm' >
                                {selectedTeam}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    equipos.map( e => (
                                        <Dropdown.Item  eventKey={e} key={e}> {e} </Dropdown.Item>
                                    ) )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <Container className='boton-admin'>
                        <p>Selección de caballo</p>
                        {
                            isTeamSelected ? <BotonEquipos/> : <Spinner variant='success' size='sm'/>
                        }
                    </Container>
                </Container>
                <hr/>
                <Container className='lista-caballos'>
                    <Container className='list'>
                        { isHorseSelected ? <Container className='data'>
                            <p> Nombre: {selectedHorse.nombre} </p>
                            <p> Propietario: {selectedHorse.propietario} </p>
                        </Container> : null}
                    </Container>
                    <hr/>
                    {
                        isFichaSelected ? <SeccionFicha/> : <Spinner variant='success' size='lg' />
                    }
                    {
                        fne ? <Container>
                            <h3>Ficha no existente...</h3>
                        </Container> : null
                    }
                </Container>
            </Container>
        )
    }
}