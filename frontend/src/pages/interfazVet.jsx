import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useQuery } from 'react-query'
import VetHome from "../components/vet_home"
import VetFichas from "../components/vet_fichas"
import Notificaciones from "../components/ver_nots"
import cfg from '../cfg.json'
import axios from 'axios'
import logo from './../assets/horse-32.ico'

export default function InterfazVet(){
    const [section, setSection] = useState('vetHome')
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navegar = useNavigate()
    const query = useQuery({
        queryKey: ['vetInfo'],
        queryFn: async () => {
            if(user){
                const hrss = await axios.get(cfg.ruta+'/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})
                const fchs = await axios.get(cfg.ruta+'/api/fichas', {headers: {Authorization: `Bearer ${user.token}`}})
                const nots = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                let team = {}
                team.horses = hrss.data.filter( h => h.codigo_equipo === user.usrData.cod_equipo)
                team.notificaciones = nots.data.filter( n => (n.target === user.usrData.cod_equipo || n.target === 'all') )
                if(team.horses[0]){
                    for(let n of team.horses){
                        n.ficha = fchs.data.filter( f => f.codigo === n.codigo_caballo )
                    }
                }
                return team
            }else return null
        }
    })

    useEffect( () => {
        if(user){
            if(user.usrData.tipo != 'veterinario'){
                navegar('/')
            }
        }else navegar('/')
    }, [user] )

    const verHome = () => setSection('vetHome')
    const verFichas = () => setSection('vetFichas')
    const verNotificaciones = () => setSection('verNots')

    const handleLogout = () => {
        logout()
        navegar('/')
    }

    return(
        <Container className="cuerpo p-0" fluid>
            <Container className="barra-nav p-0" fluid>
                <Navbar variant='success' bg='success' className='navbar'collapseOnSelect expand='sm'>
                    <Navbar.Brand as='h1' className='navTitle'> <Button variant="outline-light" onClick={verHome} > <Image src={logo}/> Hipic Vet </Button> </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav' className='responsive-navbar-nav justify-content-*-between'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#' onClick={verFichas} >Gestionar fichas</Nav.Link>
                            <Nav.Link href='#' onClick={verNotificaciones} >Ver notificaciones</Nav.Link>
                        </Nav>
                        <Container>
                            <Button variant='outline-light' onClick={handleLogout} >Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                {section === 'vetHome' ? <VetHome query={query}/> : null}
                {section === 'vetFichas' ? <VetFichas query={query}/> : null}
                {section === 'verNots' ? <Notificaciones query={query}/> : null}
            </Container>
        </Container>
    )
}