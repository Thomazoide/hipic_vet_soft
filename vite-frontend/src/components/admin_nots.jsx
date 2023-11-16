import {useRef, useEffect, useState} from 'react'
import { Container, Button, Form, Spinner, Dropdown, Toast } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function AdminNots({query, ntfcns}){

    //bloque variables

    const [equipos, setEquipos] = useState([])
    const [filtro, setFiltro] = useState('todo')
    const [filteredNots, setFilteredNots] = useState([])
    const [renderizar, setRenderizar] = useState(false)
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const titulo = useRef(null)
    const desc = useRef(null)
    const seleccion = useRef(null)
    const fecha  = new Date()
    const {user} = useAuthContext()

    //bloque variables

    //bloque efectos

    useEffect( () => {
        if(Array.isArray(query.data)){
            if(Array.isArray(ntfcns.data)){
                let arr = []
                for(let p of query.data){
                    arr.push(p.cod_equipo)
                }
                setEquipos(arr)
                setFilteredNots(ntfcns.data)
                setRenderizar(true)
            }else{
                setRenderizar(false)
                let arr = []
                for(let p of query.data){
                    arr.push(p.cod_equipo)
                }
                setEquipos(arr)
            }
        }
    }, [query, ntfcns] )

    //bloque efectos

    //bloque funciones

    const toggleExito = () => setExito(!exito)

    const toggleError = () => setError(!error)

    const handleFilter = (event) => {
        let indc /* in no data case */ = {
            titulo: '...',
            descripcion: 'No existen notificaciones que coincidan con la busqueda...',
            fecha: (fecha.toISOString()).split('T')[0]
        }
        let aux = []
        if(event === 'todo'){
            setFilteredNots(ntfcns.data)
            setFiltro(event)
        }
        else if(event === 'all'){
            setFiltro(event)
            aux = ntfcns.data.filter( n => n.target === 'all' )
            if(aux.length > 0){
                setFilteredNots(aux)
            }else{
                aux.push(indc)
                setFilteredNots(aux)
            }
        }else{
            setFiltro(event)
            aux = ntfcns.data.filter( n => n.target === event )
            if(aux.length > 0){
                setFilteredNots(aux)
            }else{
                aux.push(indc)
                setFilteredNots(aux)
            }
        }

    }

    const crearNotificacion = async (event) => {
        event.preventDefault()
        const preNot = {
            titulo: titulo.current.value,
            descripcion: desc.current.value,
            fecha: fecha,
            target: seleccion.current.value
        }
        try{
            await axios.post(cfg.ruta+'/api/notis', preNot, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                if(res.statusText === 'OK'){
                    setExito(true)
                    ntfcns.refetch()
                    query.refetch()
                }
            } )
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    const eliminarNotificacion = async (event) => {
        event.preventDefault()
        try{
            await axios.delete(cfg.ruta+'/api/notis', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    _id: event.target.value
                }
            }).then( res => {
                console.log(res)
                if(res.status == 200){
                    setExito(true)
                    ntfcns.refetch()
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
                <Toast show={error} onClose={()=>setError(false)} bg='danger'>
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

    const NotifData = () => {
        return(
            <>
                <Container fluid>
                    <Dropdown onSelect={handleFilter} >
                        <Dropdown.Toggle variant='success' size='lg'>
                            {
                                (filtro === 'todo') ? <p>todas las notificaciones</p> : (filtro === 'all') ? <p>General</p> : <p>{filtro}</p>
                            }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'todo'} key={'todo'}>
                                Todas las notificaciones
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={'all'} key={'all'}>
                                General
                            </Dropdown.Item>
                            {
                                equipos.map( e => (
                                    <Dropdown.Item eventKey={e} key={e}>
                                        {e}
                                    </Dropdown.Item>
                                ) )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <hr/>
                {
                    filteredNots.map( noti => (
                        <Container key={noti.titulo}>
                            <Container className='justify-content-*-around' >
                                <Container>
                                <p className='minititle'> {noti.titulo} </p>
                                </Container>
                                <Container>
                                    <p> Fecha: { (noti.fecha).split('T')[0] } </p>
                                </Container>
                            </Container>
                            <p> {noti.descripcion} </p>
                            <Button variant='danger' type='submit' value={noti._id} onClick={eliminarNotificacion} >Eliminar notificación</Button>
                            <hr/>
                        </Container>
                    ) )
                }
            </>
        )
    }

    //bloque microcomponentes

    //bloque renderizado

    if(query.isError || ntfcns.isError){
        return(
            <Container className='lista-caballos'>
                <h1> Error para conseguir datos<br/>Se recomienda inicar sesion nuevamente... </h1>
            </Container>
        )
    }

    return(

        <Container className='preps-info' >
            {exito ? <SuccessToast/> : null}
            {error ? <ErrorToast/> : null}
            
            {
                renderizar ? <Container className='lista-preps'>
                    {
                        (query.isFetching || query.isLoading || ntfcns.isFetching || ntfcns.isLoading) ? <Spinner variant='success'/> : null
                    }
                    <NotifData/>
                </Container> : null
            }
            <div className='lista-crear-preps'>
                <h3> Crear notificacion</h3>
                <Form className='formulario-noti' onSubmit={crearNotificacion}>
                    <Form.Group>
                        <Form.Label>
                            titulo
                        </Form.Label>
                        <Form.Control
                        required
                        size='sm'
                        type='text'
                        placeholder='...'
                        ref={titulo}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Descripción
                        </Form.Label>
                        <Form.Control
                        required
                        ref={desc}
                        as='textarea'
                        rows={4}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            fecha
                        </Form.Label>
                        <Form.Control
                        type='text'
                        placeholder={fecha}
                        disabled
                        readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Objetivo de notificación
                        </Form.Label>
                        <Form.Select ref={seleccion}>
                            <option value={'all'} key={'all'}>Todos los equipos</option>
                            {
                                equipos.map( e => (
                                    <option value={e} key={e} > {e} </option>
                                ) )
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='btn-crear-prep' > 
                        <Button variant='outline-success' type='submit'>Crear notificación</Button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    )

    //bloque renderizado
}