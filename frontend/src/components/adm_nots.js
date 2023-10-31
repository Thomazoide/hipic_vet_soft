import {useState, useRef} from 'react'
import { useQuery } from 'react-query'
import { Container, Button, Form, Spinner} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'

export default function AdminNots(){
    const {user} = useAuthContext()
    const [equipos, setEquipos] = useState([])
    const notis  = useQuery({
        queryKey: ['notis'],
        queryFn: async () => {
            const notiData = (await axios.get('http://localhost:4444/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})).data
            return notiData
        }
    })
    const users = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = (await axios.get('http://localhost:4444/api/users', {headers: {Authorization: `Bearer ${user.token}`}})).data
            let arr = []
            for(let u of res){
                if(u.tipo === 'preparador'){
                    arr.push(u)
                }
            }
            let eqps = []
            arr.forEach( u => {
                eqps.push(u.cod_equipo)
            } )
            setEquipos(eqps)
            return arr
        }
    })
    const titulo = useRef(null)
    const desc = useRef(null)
    const seleccion = useRef(null)
    const fecha = localStorage.getItem('fecha')

    const crearNotificacion = async () => {
        const preNot = {
            titulo: titulo.current.value,
            descripcion: desc.current.value,
            fecha: fecha,
            target: seleccion.current.value
        }
        try{
            await axios.post('http://localhost:4444/api/notis', preNot, {headers: {Authorization: `Bearer ${user.token}`}})
            notis.refetch()
        }catch(err){
            console.log(err)
        }
    }

    const FormularioCreacion = () => {
        return(
            <>
            <h4>
                Crear notificacion
            </h4>
            <Form className='formulario-noti' >
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
                        <option value={'all'} key='all'>Todos los equipos</option>
                        {
                            equipos.map( eq => (
                                <option value={eq} key={eq}> {eq} </option>
                            ) )
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className='btn-crear-prep' > 
                    <Button variant='outline-success' onClick={crearNotificacion}>Crear notificación</Button>
                </Form.Group>
            </Form>
            </>
        )
    }

    if(notis.isLoading || users.isLoading){
        return(
            <Container className='lista-caballos'>
                <Spinner variant='success'/>
            </Container>
        )
    }
    if(notis.data.length < 1){
        return(
            <div className='preps-info'>
                <Container className='lista-preps'>
                    <h1 className='minititle'> No hay notificaciones creadas </h1>
                </Container>
                <Container className='lista-preps'>
                    <FormularioCreacion/>
                </Container>
            </div>
        )
    }
    return(
        <Container className='preps-info'>
            <Container className='lista-preps'>
                {
                    notis.data.map( noti => (
                        <>
                            <Container key={noti.descripcion}>
                                <p className='minititle' > {noti.titulo} </p>
                                <p> {noti.descripcion} </p>
                                <Button variant='outline-danger' size='sm' >Eliminar notificacion</Button>
                            </Container>
                            <hr/>
                        </>
                    ) )
                }
            </Container>
            <Container className='lista-crear-preps'>
                <FormularioCreacion/>
            </Container>
        </Container>
    )

}