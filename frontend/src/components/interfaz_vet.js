import React, {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {Container, Navbar, Nav} from 'react-bootstrap'
import './interfaz_generic.css'

import VetHome from "./vet_home"
import VetFichas from "./vet_fichas"

function InterfazVet(){
    const navegar = useNavigate()

    const [fichaWindow, setFichaWindow] = useState(false)

    const verFichas = () => setFichaWindow(true)
    const ir_inicio = () => setFichaWindow(false)

    if(!fichaWindow){
        return(
            <Container className="cuerpo" fluid>
                <Container className="barra_nav" fluid>
                    <Navbar variant="success" bg="success">
                        <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
                        <Container className="navOpc">
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Nav className="me-auto">
                                <Nav.Link href="#" onClick={ir_inicio}>Inicio</Nav.Link>
                                <Nav.Link href='#' onClick={verFichas}>Gestionar fichas</Nav.Link>
                            </Nav>
                        </Container>
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