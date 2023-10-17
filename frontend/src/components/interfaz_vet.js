import React, {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import { useLogout } from "../hooks/useLogout"
import './interfaz_generic.css'

import VetHome from "./vet_home"
import VetFichas from "./vet_fichas"

function InterfazVet(){
    //const navegar = useNavigate()
    const {logout} = useLogout()

    const [fichaWindow, setFichaWindow] = useState(false)

    const verFichas = () => setFichaWindow(true)
    const ir_inicio = () => setFichaWindow(false)

    const handleLogout = () => {
        logout()
    }

    if(!fichaWindow){
        return(
            <Container className="cuerpo p-0" fluid>
                <Container className="barra_nav p-0" fluid>
                    <Navbar variant="success" bg="success" className="navbar">
                        <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
                        <Container className="navOpc" fluid>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Nav className="me-auto">
                                <Nav.Link href="#" onClick={ir_inicio}>Inicio</Nav.Link>
                                <Nav.Link href='#' onClick={verFichas}>Gestionar fichas</Nav.Link>
                            </Nav>
                        </Container>
                        <Navbar.Collapse className="justify-content-end">
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
            <Container className="cuerpo" fluid>
                <Container className="barra_nav" fluid>
                    <Navbar variant="success" bg="success">
                        <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
                        <Container className="navOpc">
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Nav className="me-auto">
                                <Nav.Link href="/vet-user">Inicio</Nav.Link>
                                <Nav.Link href='#'>Gestionar fichas</Nav.Link>
                            </Nav>
                        </Container>
                        <Navbar.Collapse className="justify-content-end">
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