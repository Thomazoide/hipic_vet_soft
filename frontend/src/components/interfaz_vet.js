import React, {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {Container, Navbar, Nav, Button, Image} from 'react-bootstrap'
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useLoginContext"
import jwt_decode from 'jwt-decode'
import logo from './../assets/horse-32.ico'
import './interfaz_generic.css'

import VetHome from "./vet_home"
import VetFichas from "./vet_fichas"

function InterfazVet(){
    const navegar = useNavigate()
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const [fichaWindow, setFichaWindow] = useState(false)

    const verFichas = () => setFichaWindow(true)
    const ir_inicio = () => setFichaWindow(false)

    const handleLogout = () => {
        logout()
        navegar('/')
    }

    useEffect( () => {
        if(!user){
            navegar('/')
        }
        if(user){
            let usrdt = jwt_decode(user.token)
            if(usrdt.tipo != 'veterinario'){
                navegar('/')
            }
        }
    }, [user] )

    if(!fichaWindow){
        return(
            <Container className="cuerpo p-0" fluid>
                <Container className="barra_nav p-0" fluid>
                    <Navbar variant="success" bg="success" className="navbar" collapseOnSelect expand='sm'>
                        <Navbar.Brand className='navTitle' as='h1'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-*-between">
                            <Container className="navOpc" fluid>
                                
                                <Nav className="me-auto">
                                    <Nav.Link href="#" onClick={ir_inicio}>Inicio</Nav.Link>
                                    <Nav.Link href='#' onClick={verFichas}>Gestionar fichas</Nav.Link>
                                </Nav>
                            </Container>
                            <Container>
                                <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button>
                            </Container>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
                <hr/>
                <Container fluid>
                    <VetHome/>
                </Container>
            </Container>
        )
    }else{
        return(
            <Container className="cuerpo p-0" fluid>
                <Container className="barra_nav p-0" fluid>
                    <Navbar variant="success" bg="success" className="navbar" collapseOnSelect expand='sm'>
                        <Navbar.Brand className='navTitle' as='h1'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-*-between">
                            <Container className="navOpc" fluid>
                                
                                <Nav className="me-auto">
                                    <Nav.Link href="#" onClick={ir_inicio}>Inicio</Nav.Link>
                                    <Nav.Link href='#' onClick={verFichas}>Gestionar fichas</Nav.Link>
                                </Nav>
                            </Container>
                            <Container>
                                <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button>
                            </Container>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
                <hr/>
                <Container fluid>
                    <VetFichas/>
                </Container>
            </Container>
        )
    }
}

export default InterfazVet