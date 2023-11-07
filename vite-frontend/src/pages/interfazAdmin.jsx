import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import logo from './../assets/horse-32.ico'

export default function InterfazAdmin(){
    const [verPreps, setVerPreps] = useState(true)
    const [verNots, setVerNots] = useState(false)
    const [verFichas, setVerFichas] = useState(false)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navegar = useNavigate()

    useEffect( () => {
        if(!user){
            navegar('/')
        }else{
            if(user.usrData.tipo != 'admin'){
                navegar('/')
            }
        }
    }, [user] )
    const verPreparadores = () => {
        setVerNots(false)
        setVerFichas(false)
        setVerPreps(true)
    }
    const verNotificaciones = () => {
        setVerPreps(false)
        setVerFichas(false)
        setVerNots(true)
    }
    const verFichasVeterinarias = () => {
        setVerPreps(false)
        setVerNots(false)
        setVerFichas(true)
    }
    const handleLogout = () => {
        logout()
    }

    return(
        <Container className="cuerpo p-0" fluid>
            <Container className="barra_nav p-0" fluid>
            <Navbar variant='success' bg='success' className='navbar'collapseOnSelect expand='sm'>
                    <Navbar.Brand as='h1' className='navTitle'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav' className='responsive-navbar-nav justify-content-*-between'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#' onClick={verPreparadores} >Gestionar preparadores</Nav.Link>
                            <Nav.Link href='#' onClick={verNotificaciones} >Gestionar notificaciones</Nav.Link>
                            <Nav.Link href='#' onClick={verFichasVeterinarias} >Ver fichas veterinarias</Nav.Link>
                        </Nav>
                        <Container>
                            <Button variant='outline-light' onClick={handleLogout} >Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                {verPreps ? <Container/> : null}
                {verNots ? <Container/> : null}
                {verFichas ? <Container/> : null}
            </Container>
        </Container>
    )
}