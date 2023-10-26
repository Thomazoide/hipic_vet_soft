import {useRef, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {Container, Navbar, Form, Button, Image} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import { useLogin } from '../hooks/useLogin'
import jwt_decode from 'jwt-decode'
import logo from './../assets/horse-32.ico'

export default function InterfazLogin(){
    const rut = useRef(null)
    const pass = useRef(null)
    const navegador = useNavigate()
    const {user} = useAuthContext()
    const {login, error, isLoading} = useLogin()

    useEffect( () => {
        if(user){
            const userData = jwt_decode(user.token)
            console.log(userData)
            if(userData.tipo === 'veterinario'){
                navegador('/vet-user')
            }
            if(userData.tipo === 'admin'){
                navegador('/admin')
            }
        }
    }, [user] )

    const handleSubmit = async (event) => {
        event.preventDefault()
        await login(rut.current.value, pass.current.value)
    }

    return(
        <Container fluid className='cuerpo p-0'>
            <Container fluid className='barra-nav p-0'>
                <Navbar variant='success' bg='success'>
                    <Navbar.Brand className='navTitle' as='h1'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                </Navbar>
            </Container>
            <Container>
                <hr/>
            </Container>
            <Container className='bloque-position'>
                <div className='bloque-login' >
                    <h2>Inicio de sesión</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label >Rut</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Sin puntos y con guion...'
                            ref={rut}
                            onChange={ () => console.log(rut.current.value) }
                            autoFocus/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                            type='password'
                            ref={pass}
                            onChange={ () => console.log(pass.current.value) }/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant='success' type='submit'>Iniciar sesión</Button>
                            {
                                error && <Container className='err-block'>
                                    {error}
                                </Container>
                            }
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </Container>
    )
}