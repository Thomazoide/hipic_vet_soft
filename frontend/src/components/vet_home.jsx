import {useEffect, useState, useRef} from 'react'
import {Container, Button, ButtonGroup, Modal, Form, Toast, Spinner, Dropdown} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import cfg from '../cfg.json'

export default function VetHome({query}){
    //seccion variables

    const {user} = useAuthContext()
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const [render, setRender] = useState(false)
    const [noHorses, setNoHorses] = useState(false)
    const [verModal, setVerModal] = useState(false)
    const [selectedHorse, setSelectedHorse] = useState(null)
    const [filteredHorses, setFilteredHorses] = useState(null)
    const [corrales, setCorrales] = useState(null)
    const [selectedCr, setSelectedCr] = useState(null)
    const peso = useRef(null)
    const isHab = useRef(null)


    //seccion variables
    //seccion efectos

    useEffect( () => {
        if(query.data){
            if(query.data.horses[0]){
                const crls = []
                query.data.horses.forEach( h => {
                    crls.push(h.codigo_corral)
                } )
                const fths = query.data.horses.filter( h => h.codigo_corral === crls[0] )
                setFilteredHorses(fths)
                setCorrales(crls)
                setSelectedCr(crls[0])
                setSelectedHorse(fths[0])
                setRender(true)
            }else{
                setNoHorses(true)
            }
        }
    }, [query] )

    //seccion efectos
    //seccion funciones

    const toggleModal = () => setVerModal(!verModal)

    const mostrarModal = () => setVerModal(true)

    const toggleExito = () => setExito(!exito)

    const toggleError = () => setError(!error)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const aux = {
            codigo: selectedHorse.codigo_caballo,
            peso: peso.current.value,
            habilitado: isHab.current.value,
            examenes: [],
            vacunaciones: [],
            operaciones: []
        }
        try{
            await axios.post(cfg.ruta+'/api/fichas', aux, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                setExito(true)
                toggleModal()
                query.refetch()
            } )
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    const handleSelection = (e) => {
        for(let h of query.data.horses){
            if(h.codigo_caballo === e.target.value){
                setSelectedHorse(h)
            }
        }
    }

    const handleCrSelect = (e) => {
        setSelectedCr(e)
        const fths = query.data.horses.filter( h => h.codigo_corral === e )
        setSelectedHorse(fths[0])
        setFilteredHorses(fths)
    }

    //seccion funciones
    //seccion microcomponentes
    
    const SuccessToast = () => {
        return(
            <Container>
                <Toast show={exito} onClose={toggleExito} bg='success'>
                    <Toast.Header>
                        <strong>Completado</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        Operacion exitosa...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    const ErrorToast = () => {
        return(
            <Container>
                <Toast show={error} onClose={toggleError} bg='danger'>
                    <Toast.Header>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        Error en la operacion...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    //seccion microcomponentes
    //seccion renderizado

    if(query.isError || query.isLoadingError || query.isfetchingError){
        return(
            <Container className='lista-caballos'>
                <h3 className='text-warning'>
                    Error al cargar datos<br/>Se recomienda iniciar sesión nuevamente...
                </h3>
            </Container>
        )
    }

    return(
        <>
            {exito ? <SuccessToast/> : null}
            {error ? <ErrorToast/> : null}
            {query.isLoading || query.isFetching ? <Spinner variant='success'/> : null}
            { corrales ? <Container>
                <Dropdown onSelect={handleCrSelect} >
                    <Dropdown.Toggle variant='success' >
                        Corral: {selectedCr}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            corrales.map( c => (
                                <Dropdown.Item eventKey={c} key={c}>
                                    {c}
                                </Dropdown.Item>
                            ) )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <hr/>
                { selectedCr && filteredHorses && render ? 
                <Container className='bloque'>
                    <Container className='opciones'>
                        <ButtonGroup>
                            {
                                filteredHorses.map( h => (
                                    <Button key={h.codigo_caballo} variant='success' value={h.codigo_caballo} onClick={handleSelection}> {h.nombre} | {h.codigo_caballo} </Button>
                                ) )
                            }
                        </ButtonGroup>
                    </Container> 
                    
                    <Container className='lista-caballos'>
                        <Container className='list'>
                            <Container className='data'>
                                <p className='minititle'> {selectedHorse.nombre} </p>
                                <p>Propietario: {selectedHorse.propietario}</p>
                                <p> Codigo de caballo: {selectedHorse.codigo_caballo} </p>
                            </Container>
                        </Container>
                        <hr/>
                        {
                            selectedHorse.ficha[0] ? 
                            <Container className='seccion-ficha'>
                                <p> Peso: {selectedHorse.ficha[0].peso['$numberDecimal']} Kg</p>
                                <p> Habilitado para correr: { selectedHorse.ficha[0].habilitado ? <strong className='text-success'>Si</strong> : <strong className='text-danger'>No</strong> } </p>
                                <Container className='ficha-info'>
                                    <Container className='displayer'>
                                        <p className='minititle'>Exámenes</p>
                                        { selectedHorse.ficha[0].examenes[0] ?
                                        <ul>
                                            {
                                                selectedHorse.ficha[0].examenes.map( (e, i) => (
                                                    <Container key={i}>
                                                        <p> Tipo: {e.tipo} | Fecha: {e.fecha} </p>
                                                        <hr/>
                                                    </Container>
                                                ) )
                                            }
                                        </ul>
                                        : <small className='text-warning'> Sin exámenes agregados... </small> }
                                    </Container>
                                    <Container className='displayer'>
                                        <p className='minititle'>Vacunaciones</p>
                                        { selectedHorse.ficha[0].vacunaciones[0] ?
                                        <ul>
                                            {
                                                selectedHorse.ficha[0].vacunaciones.map( (v, i) => (
                                                    <Container key={i}>
                                                        <p>Tipo: {v.tipo} | Fecha: {v.fecha} </p>
                                                        <hr/>
                                                    </Container>
                                                ) )
                                            }
                                        </ul>
                                        : <small className='text-warning'> Sin vacunaciones agregadas... </small> }
                                    </Container>
                                    <Container className='displayer'>
                                        <p className='minititle'>Cirugías</p>
                                        { selectedHorse.ficha[0].operaciones[0] ?
                                        <ul>
                                            {
                                                selectedHorse.ficha[0].operaciones.map( (o, i) => (
                                                    <Container key={i}>
                                                        <p>Tipo: {o.tipo} | Fecha: {o.fecha} </p>
                                                        <hr/>
                                                    </Container>
                                                ) )
                                            }
                                        </ul>
                                        : <small className='text-warning'> Sin cirugías agregadas... </small> }
                                    </Container>
                                </Container>
                            </Container>
                            :
                            <Container>
                                <Container>
                                    <Modal
                                    show={verModal}
                                    onHide={toggleModal}
                                    backdrop='static'
                                    keyboard={false}
                                    centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Crear ficha</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group>
                                                    <Form.Label>Peso del caballo (Kg)</Form.Label>
                                                    <Form.Control
                                                    type='text'
                                                    placeholder='999.999'
                                                    ref={peso}/>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Se encuentra habilitado para correr?</Form.Label>
                                                    <Form.Select ref={isHab}>
                                                        <option value={true} key={1}>Si</option>
                                                        <option value={false} key={2}>No</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Codigo de caballo: {selectedHorse.codigo_caballo}
                                                    </Form.Label>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Button variant='outline-success' type='submit'>Crear ficha</Button>
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>
                                </Container>
                                <p className='text-warning'>Caballo sin ficha</p>
                                <Button variant='success' onClick={mostrarModal}>Crear ficha</Button>
                            </Container>
                        }
                    </Container>
                </Container>
                : noHorses ?
                <Container className='lista-caballos'>
                    <h3 className='text-warning'> No hay caballos creados </h3>
                </Container> : null}
            </Container> : null}
        </>
    )

    //seccion renderizado
}