import React from "react"
import {Container, Navbar, Nav} from 'react-bootstrap'
import './interfaz_generic.css'

import Vet_Home from "./vet_home"

function Interfaz_vet(){
    

    return(
        <Container className="cuerpo">
            <Container className="barra_nav">
                <Navbar variant="success" bg="success">
                    <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
                    <Container className="navOpc">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href='#'>Gestionar fichas</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Container>
            <hr/>
            <Container>
                <Vet_Home/>
            </Container>
        </Container>
    )
}

export default Interfaz_vet