import {useState, useRef, useEffect} from 'react'
import { useQuery } from 'react-query'
import { Container, Button, Spinner, Form, ButtonGroup} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function PrepVets(){
    const {user} = useAuthContext()
    const [vet, setVet] = useState([])
    const tipo = 'veterinario'
    const nombre = useRef(null)
    const rut = useRef(null)
    const email = useRef(null)
    const cell = useRef(null)
    const pass = useRef(null)
    const navegar = useNavigate()
    const veterinarios = useQuery({
        queryKey: ['veterinarios'],
        queryFn: async () => {
            if(user){
                const res = (await axios.get('http://localhost:4444/api/users', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })).data
                let arr = []
                console.log(arr[0])
                for(let u of res){
                    if((u.tipo === 'veterinario') && (user.usrData.cod_equipo === u.cod_equipo)) arr.push(u)
                }
                setVet(arr[0])
                return arr
            }else{
                return null
            }
        }
    })
    
    useEffect( () => {
        if(veterinarios.isSuccess){
            console.log(veterinarios.data)
        }
    }, [veterinarios.data] )

    const handleSelect = (e) => {
        const auxRut = e.target.value
        for(let v of veterinarios.data){
            if(v.rut === auxRut){
                setVet(v)
            }
        }
    }

    const crearVet = async () => {
        let auxVet = {
            nombre: nombre.current.value,
            tipo: tipo,
            rut: rut.current.value,
            email: email.current.value,
            cell: cell.current.value,
            pass: pass.current.value,
            cod_equipo: user.usrData.cod_equipo,
            corrales_en_posesion: []
        }
        try{
            await axios.post('http://localhost:4444/api/users', auxVet, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then( () => {
                veterinarios.refetch()
            } )
        }catch(err){
            console.log(err)
        }
    }

    const deleteVet = async () => {
        try{
            await axios.delete('http://localhost:4444/api/users', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: vet
            }).then( () => {
                veterinarios.refetch()
            } )
        }catch(err){
            console.log(err)
        }
    }

    if(veterinarios.isLoading || veterinarios.isFetching){
        return(
            <Container className='lista-caballos'>
                <Spinner variant='success'/>
            </Container>
        )
    }

    if(!user || veterinarios.isError || veterinarios.isLoadingError){
        return(
            <Container className='lista-caballos'>
                <h4>Se terminó el tiempo de conexión...<br/>Debe iniciar sesión nuevamente.</h4>
            </Container>
        )
    }

    if(veterinarios.data){
        let vetLen = (veterinarios.data).length
        return(
            <div className='preps-info'>
                <div className='vet-sec' >
                    {
                        (vetLen > 0) ? <Container className='select-view'>
                            <ButtonGroup vertical size='sm' className='p-0 vert-btns'>
                                {
                                    (veterinarios.data).map( v => (
                                        <Button key={v.rut} value={v.rut} variant='success' onClick={ handleSelect }>{v.nombre}</Button>
                                    ) )
                                }
                            </ButtonGroup>
                            <Container className='lista-preps'>
                                <h1> {vet.nombre} </h1>
                                <p> Rut: {vet.rut} </p>
                                <p> Email: {vet.email} </p>
                                <p> Celular: {vet.cell} </p>
                                <p> Codigo de equipo: {vet.cod_equipo} </p>
                                <Container className='btn-delete'>
                                    <Button variant='outline-danger' onClick={deleteVet} >Borrar usuario</Button>
                                </Container>
                            </Container>
                        </Container> : null
                    }
                </div>

                    <div className='lista-crear-preps'>
                        <h1>Crear veterinarios</h1>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Nombre
                                </Form.Label>
                                <Form.Control 
                                required
                                size='sm'
                                type='text'
                                placeholder='...'
                                ref={nombre} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Tipo de usuario
                                </Form.Label>
                                <Form.Control 
                                size='sm'
                                type='text'
                                defaultValue={tipo}
                                disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Rut
                                </Form.Label>
                                <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Rut sin puntos y con guion'
                                ref={rut} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control
                                size='sm' 
                                type='email'
                                placeholder='...'
                                ref={email} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Celular
                                </Form.Label>
                                <Container className='cellInput'>
                                    <p className='prefix'>
                                        +56
                                    </p>
                                    <Form.Control 
                                    size='sm' 
                                    type='text'
                                    placeholder='...'
                                    ref={cell} />                    
                                </Container>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Contraseña
                                </Form.Label>
                                <Form.Control 
                                size='sm'
                                type='password'
                                ref={pass} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Codigo de equipo
                                </Form.Label>
                                <Form.Control 
                                size='sm'
                                type='text'
                                disabled
                                defaultValue={user.usrData.cod_equipo} />
                            </Form.Group>
                            <Form.Group className='btn-crear-prep'>
                                <Container>
                                    <Button variant='outline-success' onClick={crearVet}> Crear usuario </Button>
                                </Container>
                            </Form.Group>
                        </Form>
                    </div>
                
            </div>
        )
    }

}