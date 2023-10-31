import {useEffect, useState} from 'react'
import {Container, Button, Navbar, Nav, Image} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import jwt_decode from 'jwt-decode'
import logo from './../assets/horse-32.ico'
import AdminPreps from './adm_preps'
import AdminNots from './adm_nots'
import AdminFichas from './adm_fichas'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useLoginContext'

export default function InterfazAdmin(){
    const [verPreps, setVerPreps] = useState(true)
    const [verNots, setVerNots] = useState(false)
    const [verFichas, setVerFichas] = useState(false)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navegador = useNavigate()

    useEffect( () => {
        if(!user){
            navegador('/')
        }
        if(user){
            let usrdt = jwt_decode(user.token)
            if(usrdt.tipo != 'admin'){
                navegador('/')
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
                            <Button variant='outline-light' onClick={handleLogout} >Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className='bloque-position'>
                { verPreps ? <AdminPreps/> : null}
                { verNots ? <AdminNots/> : null }
                { verFichas ? <AdminFichas/> : null }
            </Container>

        </Container>
    )
}