import {useState, useRef, useEffect} from 'react'
import {Container, Button, Dropdown, Form, Modal, Spinner, Toast} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import cfg from '../cfg.json'

export default function VetFichas({query}){
    //seccion variables

    const {user} = useAuthContext()
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const [render, setRender] = useState(false)
    const [te, setTe] = useState(null)
    const [selectedHorse, setSelectedHorse] = useState(null)
    const [filteredHorses, setFilteredHorses] = useState(null)
    const [verModal, setVerModal] = useState(false)
    const tipo = useRef(null)
    const fecha = useRef(null)
    const desc = useRef(null)

    //seccion variables
    //seccion efectos

    useEffect( () => {
        if(query.data){
            if(query.data.horses[0]){
                let arr = []
                for(let h of query.data.horses){
                    if(h.ficha[0]){
                        arr.push(h)
                    }
                }
                if(arr[0]){
                    setSelectedHorse(arr[0])
                    setFilteredHorses(arr)
                    setRender(true)
                }else{
                    setFilteredHorses(null)
                    setRender(false)
                }
            }
        }
    }, [query] )

    //seccion efectos
    //seccion funciones

    const toggleExito = () => setExito(!exito)

    const toggleError = () => setError(!error)

    const handleSelection = (e) => {
        for(let h of filteredHorses){
            if(h.codigo_caballo === e){
                setSelectedHorse(h)
            }
        }
    }

    const mostrarModal = (e) => {
        setTe(e.target.value)
        setVerModal(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let auxFicha = selectedHorse.ficha[0]
        const auxPush = {
            tipo: tipo.current.value,
            descripcion: desc.current.value,
            fecha: fecha.current.value
        }
        if(te === 'examen') auxFicha.examenes.push(auxPush)
        if(te === 'vacuna') auxFicha.vacunaciones.push(auxPush)
        if(te === 'cirugia') auxFicha.operaciones.push(auxPush)

        try{
            await axios.put(cfg.ruta+'/api/fichas', auxFicha, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                if(res.statusText === 'OK'){
                    setVerModal(false)
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            setVerModal(false)
            console.log(err)
            setError(true)
        }
    }

    const handleDelete = async () => {
        const auxFicha = selectedHorse.ficha[0]
        try{
            await axios.delete(cfg.ruta+'/api/fichas', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: auxFicha
            }).then( res => {
                if(res.statusText === 'OK'){
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            console.log(err)
            setError(true)
        }
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

    const CrearModal = () => {
        let val = te
        return(
            <>
                {
                    verModal ? 
                    <Container>
                        <Modal show={verModal} onHide={()=>setVerModal(false)} backdrop='static' keyboard={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {
                                        val === 'examen' ? <p>Agregar examen</p> : 
                                        val === 'vacuna' ? <p>Agregar vacunación</p> :
                                        val === 'cirugia' ? <p>Agregar cirugía</p> : null
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>
                                                Titulo
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            size='sm'
                                            type='text'
                                            placeholder='...'
                                            ref={tipo}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Descripción
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            size='sm'
                                            type='text'
                                            as='textarea'
                                            rows={3}
                                            ref={desc}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Fecha
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            size='sm'
                                            type='date'
                                            ref={fecha}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant='success' type='submit'>
                                                Agregar {val}
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Container>
                            </Modal.Body>
                            
                        </Modal>
                    </Container>
                    : null
                }
            </>
        )
    }

    //seccion microcomponentes
    //seccion renderizado
    return(
        <Container className='bloque'>
            {exito ? <SuccessToast/> : null}
            {error ? <ErrorToast/> : null}
            {
                render ? 
                <Container fluid>
                    <CrearModal/>
                    <Container>
                        <Dropdown onSelect={handleSelection}>
                            <Dropdown.Toggle variant='success'>
                                {selectedHorse.nombre} || {selectedHorse.codigo_caballo}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    filteredHorses.map( h => (
                                        <Dropdown.Item eventKey={h.codigo_caballo} key={h.codigo_caballo}>
                                            {h.nombre} || {h.codigo_caballo}
                                        </Dropdown.Item>
                                    ) )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <Container className='lista-caballos'>

                        <Container className='seccion-ficha p-0'>
                            <p className='minititle'>Peso: {selectedHorse.ficha[0].peso['$numberDecimal']}</p>
                            <p>
                                Habilitado para correr: {
                                    selectedHorse.ficha[0].habilitado ?
                                    <strong className='text-success'>Si</strong>
                                    :
                                    <strong className='text-danger'>No</strong>
                                }
                            </p>
                        </Container>
                        <hr/>
                        <Container className='ficha-info'>
                            <Container className='big-displayer'>
                                <Container className='btn-crear'>
                                    <p className='minititle'>Exámenes</p>
                                    <Button variant='outline-success' size='sm' value={'examen'} onClick={mostrarModal}>
                                        Agregar exámen
                                    </Button>
                                </Container>
                                <hr/>
                                {
                                    selectedHorse.ficha[0].examenes.map( (e, i) => (
                                        <Container className='displayer' key={i}>
                                            <p>Tipo: {e.tipo} </p>
                                            <p>fecha: {e.fecha} </p>
                                            <hr/>
                                        </Container>
                                    ) )
                                }
                            </Container>
                            <Container className='big-displayer'>
                                <Container className='btn-crear'>
                                    <p className='minititle'>Vacunaciones</p>
                                    <Button variant='outline-success' size='sm' value={'vacuna'} onClick={mostrarModal}>
                                        Agregar vacunación
                                    </Button>
                                </Container>
                                <hr/>
                                {
                                    selectedHorse.ficha[0].vacunaciones.map( (v, i) => (
                                        <Container className='displayer' key={i}>
                                            <p>Tipo: {v.tipo} </p>
                                            <p> Descripción: {v.descripcion} </p>
                                            <p>Fecha: {v.fecha} </p>
                                            <hr/>
                                        </Container>
                                    ) )
                                }
                            </Container>
                            <Container className='big-displayer'>
                                <Container className='btn-crear'>
                                    <p className='minititle'>Cirugías</p>
                                    <Button variant='outline-success' size='sm' value={'cirugia'} onClick={mostrarModal}>
                                        Agregar cirugía
                                    </Button>
                                </Container>
                                <hr/>
                                {
                                    selectedHorse.ficha[0].operaciones.map( (c, i) => (
                                        <Container className='displayer' key={i}>
                                            <p>Tipo: {c.tipo} </p>
                                            <p>Descripción: {c.descripcion}</p>
                                            <p>Fecha: {c.fecha}</p>
                                            <hr/>
                                        </Container>
                                    ) )
                                }
                            </Container>
                        </Container>
                        <hr/>
                        <Button variant='danger' onClick={handleDelete}>Eliminar ficha</Button>
                    </Container>
                </Container>
                :
                <Container className='lista-caballos'></Container>
            }
        </Container>
    )
    //seccion renderizado
}