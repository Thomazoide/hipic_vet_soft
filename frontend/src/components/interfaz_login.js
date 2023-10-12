import {useRef} from 'react'
import {Container, Navbar, Form, Button} from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'

export default function InterfazLogin(){
    const rut = useRef(null)
    const pass = useRef(null)
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await login(rut.current.value, pass.current.value)
    }

    return(
        <Container fluid className='cuerpo'>
            <Container fluid className='barra-nav'>
                <Navbar variant='success' bg='success'>
                    <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
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