import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast, CloseButton, Dropdown } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function PrepHorses({query}){
    //bloque variables

    const [render, setRender] = useState(false)
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const [changeCrr, setChangeCrr] = useState(false)
    const [changePptr, setChangePptr] = useState(false)
    const [habilChangeCr, setHabilChangeCr] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [equipo, setEquipo] = useState('')
    const [selectedHorse, setSelectedHorse] = useState(null)
    const {user} = useAuthContext()
    const nombre = useRef(null)
    const propietario = useRef(null)
    const crr = useRef(null)

    //bloque variables
    //bloque efectos

    useEffect( () => {
        if(query.data){
            console.log(query.data)
            if(query.data.horses[0]){
                setSelectedHorse(query.data.horses[0])
                setRender(true)
            }else{
                setRender(false)
            }
        }
        if(user){
            setEquipo(user.usrData.cod_equipo)
        }
    }, [query, user] )

    //bloque efectos
    //bloque funciones

    const toggleChangePptr = () => setChangePptr(!changePptr)

    const toggleChangeCrr = () => setChangeCrr(!changeCrr)

    const toggleExito = () => setExito(!exito)

    const toggleError = () => setError(!error)

    const handleChangeCrr = (e) => {
        if(e.target.value === selectedHorse.codigo_corral){
            console.log(crr.current.value)
            setHabilChangeCr(true)
        }else{
            console.log(crr.current.value)
            setHabilChangeCr(false)
        }
    }

    const submitNewPptr = async (e) => {
        e.preventDefault()
        const aux = {
            ...selectedHorse,
            newPptr: propietario.current.value
        }
        try{
            setIsLoading(true)
            await axios.put(cfg.ruta+'/api/caballos', aux, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
            setIsLoading(false)
            setChangePptr(false)
        }catch(err){
            setError(true)
            query.refetch()
            setIsLoading(false)
            setChangePptr(false)
        }
    }

    const cambiarCorralCaballo = async () => {
        const aux = {
            ...selectedHorse,
            newCr: crr.current.value
        }
        try{
            setIsLoading(true)
            await axios.put(cfg.ruta+'/api/caballos', aux, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
            setIsLoading(false)
            setChangeCrr(false)
        }catch(err){
            setError(true)
            query.refetch()
            setIsLoading(false)
            setChangeCrr(false)
        }
    }

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
            codigo_equipo: equipo,
            codigo_corral: crr.current.value
        }
        try{
            await axios.post(cfg.ruta+'/api/caballos', aux, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
        }catch(err){
            console.log(err)
            setError(true)
            query.refetch()
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(cfg.ruta+'/api/caballos', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: selectedHorse
            })
            setExito(true)
            query.refetch()
        }catch(err){
            console.log(err)
            setError(true)
            query.refetch()
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
                            <p>Propietario: {selectedHorse.propietario} {!changePptr ? <Button variant='outline-warning' size='sm' onClick={toggleChangePptr}>Cambiar propietario</Button> : null} </p>
                            {
                                changePptr ? <div className='bloque-razon'>
                                    <Container className='bloque-razon-header'>
                                        <small>Cambiar propietario</small>
                                        <div className='btn-cerrar-razon'>
                                            <CloseButton variant='white' onClick={toggleChangePptr}/>
                                        </div>
                                    </Container>
                                    <Container className='bloque-razon-change'>
                                        <Form onSubmit={submitNewPptr} >
                                            <Form.Group>
                                                <Form.Label>
                                                    Nuevo propietario/a
                                                    <Form.Control
                                                    id='newPptr'
                                                    type='text'
                                                    size='sm'
                                                    required
                                                    placeholder='Nombre Apellido'
                                                    ref={propietario} />
                                                </Form.Label>
                                            </Form.Group>
                                            <Form.Group className='btn-crear-prep'>
                                                <Container>
                                                    <Button variant='success' size='sm' type='submit'>Actualizar propietario</Button>
                                                </Container>
                                                {isLoading ? <Spinner variant='success' size='sm'/> : null}
                                            </Form.Group>
                                        </Form>
                                    </Container>
                                </div> : null
                            }
                            <p> Codigo de caballo: {selectedHorse.codigo_caballo} </p>
                            <p> Corral: {selectedHorse.codigo_corral} { !changeCrr ? <Button variant='outline-warning' size='sm' onClick={toggleChangeCrr} >Cambiar de corral</Button> : null} </p>
                            {
                                changeCrr ? <div className='bloque-razon'>
                                    <Container className='bloque-razon-header'>
                                        <small> Seleccionar corral </small>
                                        <div className='btn-cerrar-razon'>
                                            <CloseButton variant='white' onClick={toggleChangeCrr}/>
                                        </div>
                                    </Container>
                                    <Container className='bloque-razon-change'>
                                        <p> <small>Corral: </small> <Form.Select defaultValue={selectedHorse.codigo_corral} ref={crr} onChange={handleChangeCrr} size='sm'>
                                            {
                                                query.data.corrales.map( (c, i) => (
                                                    <option value={c.cod_corral} key={i}> {c.cod_corral} </option>
                                                ) )
                                            }
                                        </Form.Select>
                                        </p>
                                        <p>
                                            <Button variant='success' size='sm' disabled={habilChangeCr} onClick={cambiarCorralCaballo} >Guardar cambio</Button>
                                        </p>
                                        {isLoading ? <Spinner variant='success' size='sm'/> : null}
                                    </Container>
                                </div> : null
                            }
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
                <h1>Crear caballos</h1>
                <hr/>
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
                            <Form.Select id='crr' ref={crr} size='sm'>
                                {
                                    query.data.corrales.map( c => (
                                        <option disabled={ c.cant_caballos < c.capacidad ? (false) : (true) } key={c.cod_corral} value={c.cod_corral}> {c.cod_corral} </option>
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