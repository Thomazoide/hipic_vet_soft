import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function PrepVets({query}){
    //Bloque variables
    const {user} = useAuthContext()
    const [equipo, setEquipo] = useState('')
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const [render, setRender] = useState(false)
    const [selectedVet, setSelectedVet] = useState(null)
    const tipo = 'veterinario'
    const nombre = useRef(null)
    const rut = useRef(null)
    const email = useRef(null)
    const cell = useRef(null)
    const pass = useRef(null)

    //Bloque variables
    //Bloque efectos

    useEffect( () => {
        if(query.data){
            setSelectedVet(query.data.vets[0])
        }
    }, [query] )

    useEffect( () => {
        if(user){
            setEquipo(user.usrData.cod_equipo)
        }
    }, [user] )

    useEffect( () => {
        if(!selectedVet){
            setRender(false)
        }else{
            setRender(true)
        }
    }, [selectedVet] )

    //Bloque efectos
    //Bloque funciones

    const toggleExito = () => {
        setExito(!exito)
    }

    const toggleError = () => {
        setError(!error)
    }

    const handleSelection = (e) => {
        for(let vet of query.data.vets){
            if(vet.rut === e.target.value){
                setSelectedVet(vet)
            }
        }
    }

    const crearVet = async (e) => {
        e.preventDefault()
        let aux = {
            tipo: tipo,
            nombre: nombre.current.value,
            rut: rut.current.value,
            email: email.current.value,
            cell: cell.current.value,
            pass: pass.current.value,
            cod_equipo: equipo,
            corrales_en_posesion: []
        }
        try{
            await axios.post(cfg.ruta+'/api/users', aux, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                if(res.statusText === 'OK'){
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            setError(true)
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(cfg.ruta+'/api/users', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: selectedVet
            }).then( res => {
                if(res.statusText === 'OK'){
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            setError(true)
        }
    }

    //Bloque funciones
    //Bloque microcomponentes

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

    const VetData = () => {
        return(
            <Container className='ficha-info'>
                <Container className='p-0 vert-btns' fluid>
                    <ButtonGroup vertical size='sm' className='p-0'>
                        {
                            query.data.vets.map( vet => (
                                <Button variant='success' key={vet.rut} value={vet.rut} onClick={handleSelection}>{vet.nombre}</Button>
                            ) )
                        }
                    </ButtonGroup>
                </Container>
                <Container className='lista-preps'>
                    <h1> {selectedVet.nombre} </h1>
                    <p>Rut: {selectedVet.rut}</p>
                    <p> Email: {selectedVet.email} </p>
                    <p> Celular: {selectedVet.cell} </p>
                    <hr/>
                    <Button variant='danger' onClick={handleDelete}>Eliminar veterinario</Button>
                </Container>
            </Container>
        )
    }

    //Bloque microcomponentes
    //Bloque renderizado

    if(query.isError || query.isLoadingError) {
        return (
            <Container className='lista-caballos'>
                <h1 className='text-warning'>Error al cargar datos<br/>Se recomienda iniciar sesión nuevamente...</h1>
            </Container>
        )
    }

    return(
        <Container className='preps-info'>
            {exito ? <SuccessToast/> : null}
            {error ? <ErrorToast/> : null}
            {(query.isLoading || query.isFetching) ? <Spinner variant='success'/> : null}
            {render ? <Container className='enrolador'>
                <VetData/>
            </Container> : null}
            <div className='lista-crear-preps'>
                <Form onSubmit={crearVet}>
                    <Form.Group>
                        <Form.Label>
                            Nombre
                            <Form.Control
                            id='nombre'
                            required
                            type='text'
                            size='sm'
                            placeholder='nombre apellido'
                            ref={nombre}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Tipo de usuario
                            <Form.Control
                            id='tipo'
                            size='sm'
                            type='text'
                            defaultValue={tipo}
                            disabled/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Rut
                            <Form.Control
                            id='rut'
                            required
                            size='sm'
                            type='text'
                            placeholder='Rut sin puntos y con guion'
                            ref={rut}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email
                            <Form.Control
                            id='email'
                            size='sm'
                            type='email'
                            defaultValue={''}
                            ref={email}
                            placeholder='******@****.***'/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for='cell'>
                            Celular
                            <Container className='cellInput' >
                                <p className='prefix'>+56</p>
                                <Form.Control
                                id='cell'
                                defaultValue={''}
                                size='sm'
                                type='text'
                                placeholder='9 digitos'
                                ref={cell}/>
                            </Container>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Contraseña
                            <Form.Control
                            id='pass'
                            size='sm'
                            required
                            type='password'
                            placeholder='...'
                            ref={pass}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Codigo de equipo
                            <Form.Control
                            id='codigo'
                            disabled
                            size='sm'
                            type='text'
                            defaultValue={equipo}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className='btn-crear-prep'>
                        <Container>
                            <Button variant='success' type='submit'>Agregar veterinario</Button>
                        </Container>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    )

    //Bloque renderizado
}