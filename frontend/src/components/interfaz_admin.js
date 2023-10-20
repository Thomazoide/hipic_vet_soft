import {useEffect, useState} from 'react'
import {Container, Button, Navbar, Nav, Image} from 'react-bootstrap'
import logo from './../assets/horse-32.ico'
import AdminPreps from './adm_preps'

export default function InterfazAdmin(){
    const [verPreps, setVerPreps] = useState(true)
    const [verNots, setVerNots] = useState(false)
    const [verFichas, setVerFichas] = useState(false)
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
    return(
        <Container className='cuerpo p-0' fluid>
            <Container className='barra_nav p-0' fluid>
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
                            <Button variant='outline-light'>Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className='bloque-position'>
                { verPreps ? <AdminPreps/> : null}
            </Container>

        </Container>
    )
}