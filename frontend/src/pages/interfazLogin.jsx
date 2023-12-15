import { useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import {Container, Navbar, Form, Button, Image} from 'react-bootstrap'
import {format} from 'rut.js'
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogin } from "../hooks/useLogin"
import logo from '../assets/horse-32.ico'
import './../interfaz_generic.css'
import { UserType } from "../enum/user-type.enum"

export default function InterfazLogin(){
    const rut = useRef(null)
    const pass = useRef(null)
    const navegar = useNavigate()
    const {user} = useAuthContext()
    const {login, error} = useLogin()

    useEffect( () => {
        if(user){
            if(user.usrData.tipo === UserType.VETERINARY){
                navegar(`/vet-user#${(user.token).split('.')[0]}`)
            }
            if(user.usrData.tipo === UserType.PREP){
                navegar(`/prep-user#${(user.token).split('.')[0]}`)
            }
            if(user.usrData.tipo === UserType.ADMIN){
                navegar(`/admin-user#${(user.token).split('.')[0]}`)
            }
        }
    }, [user] )

    const handleSubmit = async (event) => {
        event.preventDefault()
        await login(format(rut.current.value, {dots: false}), pass.current.value)
    }

    return(
        <Container fluid className="cuerpo p-0">
            <Container fluid className="barra-nav p-0">
                <Navbar variant="success" bg="success">
                    <Navbar.Brand className="navTitle" as='h1'> <Image src={logo}/> Hipic Vet </Navbar.Brand>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                <div className="bloque-login">
                    <h2>Inicio de sesión</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Rut</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Sin puntos y con guión (Ej: xxxxxxxx-x)"
                            ref={rut}
                             />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Contraseña
                                <Form.Control
                                type="password"
                                ref={pass}/>
                                </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" type="submit" >Iniciar sesión</Button>
                            {
                                error && <Container className="err-block">
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