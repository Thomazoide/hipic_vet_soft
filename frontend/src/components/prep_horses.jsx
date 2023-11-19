import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function PrepHorses({query}){
    //bloque variables

    const [render, setRender] = useState(false)
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const [equipo, setEquipo] = useState('')
    const [selectedHorse, setSelectedHorse] = useState(null)
    const {user} = useAuthContext()
    const nombre = useRef(null)
    const propietario = useRef(null)
    const hcode = useRef(null)
    const crr = useRef(null)

    //bloque variables
    //bloque efectos

    useEffect( () => {
        if(query.data){
            if(query.data.horses[0]){
                setSelectedHorse(query.data.horses[0])
                setRender(true)
            }
        }
        if(user){
            setEquipo(user.usrData.cod_equipo)
        }
    }, [query, user] )

    //bloque efectos
    //bloque funciones

    const toggleExito = () => setExito(!exito)

    const toggleError = () => setError(!error)

    const handleSelect = (e) => {
        for(let h of query.data.horses){
            if(h.codigo_caballo === e.target.value){
                setSelectedHorse(h)
            }
        }
    }

    const crearCaballo = async (e) => {
        e.preventDefault()
        const aux = {
            nombre: nombre.current.value,
            propietario: propietario.current.value,
            codigo_caballo: hcode.current.value,
            codigo_equipo: equipo,
            codigo_corral: crr.current.value
        }
        try{
            await axios.post(cfg.ruta+'/api/caballos', aux, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                if(res.status == 200){
                    setExito(true)
                    query.refetch()
                }
            })
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(cfg.ruta+'/api/caballos', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: selectedHorse
            }).then( res => {
                if(res.status == 200){
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    //bloque funciones
    //bloque microcomponentes

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


    //bloque microcomponentes
    //bloque renderizado

    if(query.isError || query.isLoadingError){
        return(
            <Container className='lista-caballos'>
                <h3 className='text-warning'>Error al cargar datos<br/>Se recomienda iniciar sesión nuevamente...</h3>
            </Container>
        )
    }

    return(
        <Container className='preps-info'>
            {
                (query.isLoading || query.isFetching) ? <Spinner variant='success'/> : null
            }
            {
                exito ? <SuccessToast/> : null
            }
            {
                error ? <ErrorToast/> : null
            }
            {
                render ? <Container className='enrolador'>
                    <Container className='ficha-info'>
                        <Container className='p-0 vert-btns' fluid>
                            <ButtonGroup vertical size='sm' className='p-0'>
                                {
                                    query.data.horses.map( h => (
                                        <Button variant='success' key={h.codigo_caballo} value={h.codigo_caballo} onClick={handleSelect}> {h.nombre} | {h.codigo_caballo} </Button>
                                    ) )
                                }
                            </ButtonGroup>
                        </Container>
                        <Container className='lista-preps'>
                            <h1> {selectedHorse.nombre} </h1>
                            <p>Propietario: {selectedHorse.propietario}</p>
                            <p> Codigo de caballo: {selectedHorse.codigo_caballo} </p>
                            <p> Corral: {selectedHorse.codigo_corral} </p>
                            <hr/>
                            <p>Estado ficha: { 
                                selectedHorse.ficha[0] ? <strong className='text-success'>Ficha creada</strong> : <strong className='text-warning'>No tiene ficha creada</strong>
                            } </p>
                            <hr/>
                            <Button variant='danger' onClick={handleDelete}>Eliminar caballo</Button>
                            <hr/>
                        </Container>
                    </Container>
                </Container> : null
            }
            <Container className='lista-crear-preps'>
                <Form onSubmit={crearCaballo}>
                    <Form.Group>
                        <Form.Label>
                            Nombre de caballo
                            <Form.Control
                            id='nombre'
                            required
                            type='text'
                            size='sm'
                            ref={nombre}
                            placeholder='...'/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Propietario del caballo
                            <Form.Control
                            id='propietario'
                            required
                            type='text'
                            size='sm'
                            ref={propietario}
                            placeholder='Nombre apellido'/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Codigo de caballo
                            <Form.Control
                            id='codigo-c'
                            required
                            type='text'
                            size='sm'
                            ref={hcode}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Codigo de equipo
                            <Form.Control
                            id='codigo-e'
                            disabled
                            size='sm'
                            defaultValue={equipo}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Corral
                            <Form.Select id='crr' ref={crr}>
                                {
                                    query.data.corrales.map( c => (
                                        <option key={c} value={c}> {c} </option>
                                    ) )
                                }
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className='btn-crear-prep'>
                        <Container>
                            <Button variant='success' type='submit'>Agregar caballo</Button>
                        </Container>
                    </Form.Group>
                </Form>
            </Container>
        </Container>
    )

    //bloque renderizado
}