import { useQuery } from "react-query"
import { useState, useEffect } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useAuthContext } from "../hooks/useLoginContext"
import { useLogout } from "../hooks/useLogout"
import { useNavigate } from "react-router"
import PrepVets from "./prep_vets"
import jwt_decode from 'jwt-decode'
import logo from '../assets/horse-32.ico'

export default function InterfazPreparador(){
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const navegador = useNavigate()

    const [verVets, setVerVets] = useState(true)
    const [verCaballos, setVerCaballos] = useState(false)
    const [verNotificaciones, setVerNotificaciones] = useState(false)

    const seeVets = () => {
        setVerCaballos(false)
        setVerNotificaciones(false)
        setVerVets(true)
    }

    const seeHorses = () => {
        setVerVets(false)
        setVerNotificaciones(false)
        setVerCaballos(true)
    }

    const seeNots = () => {
        setVerCaballos(false)
        setVerVets(false)
        setVerNotificaciones(true)
    }

    const handleLogout = () => {
        logout()
    }

    return(
        <Container className="cuerpo p-0" fluid>
            <Container className="barra_nav p-0" fluid>
                <Navbar variant="success" bg='success' className="navbar" collapseOnSelect expand='sm'>
                    <Navbar.Brand as='h1' className="navTitle">
                        <Image src={logo}/>
                        Hipic Vet-Soft
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="responsive-navbar-nav justify-content-*-between">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={seeVets} >Gestionar veterinarios</Nav.Link>
                            <Nav.Link href="#" onClick={seeHorses} >Gestionar Caballos</Nav.Link>
                            <Nav.Link href="#" onClick={seeNots} >Ver Notificaciones</Nav.Link>
                        </Nav>
                        <Container>
                            <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                {verVets ? <PrepVets/> : null}
                {verCaballos ? <Container className="lista-caballos"/> : null}
                {verNotificaciones ? <Container className="lista-caballos"/> : null}
            </Container>
        </Container>
    )
}