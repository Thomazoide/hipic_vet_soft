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
import Notificaciones from "./notificaciones"

function InterfazVet(){
    const navegar = useNavigate()
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const [verInicio, setVerInicio] = useState(true)
    const [verFich, setVerFichas] = useState(false)
    const [verNots, setVerNots] = useState(false)

    const toggleInicio = () => {
        setVerFichas(false)
        setVerNots(false)
        setVerInicio(true)
    }

    const toggleFichas = () => {
        setVerInicio(false)
        setVerNots(false)
        setVerFichas(true)
    }

    const toggleNots = () => {
        setVerInicio(false)
        setVerFichas(false)
        setVerNots(true)
    }

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

    
        return(
            <Container className="cuerpo p-0" fluid>
                <Container className="barra_nav p-0" fluid>
                    <Navbar variant="success" bg="success" className="navbar" collapseOnSelect expand='sm'>
                        <Navbar.Brand className='navTitle' as='h1'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-*-between">
                            <Container className="navOpc" fluid>
                                
                                <Nav className="me-auto">
                                    <Nav.Link href="#" onClick={toggleInicio}>Inicio</Nav.Link>
                                    <Nav.Link href='#' onClick={toggleFichas}>Gestionar fichas</Nav.Link>
                                    <Nav.Link href="#" onClick={toggleNots}>Ver notificaciones</Nav.Link>
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
                    {verInicio ? <VetHome/> : null}
                    {verFich ? <VetFichas/> : null}
                    {verNots ? <Notificaciones/> : null}
                </Container>
            </Container>
        )
    
}

export default InterfazVet