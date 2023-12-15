import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useQuery } from 'react-query'
import AdminPreps from "../components/admin_preps"
import AdminNots from "../components/admin_nots"
import AdminFichas from "../components/admin_fichas"
import AdminHome from "../components/admin_home"
import cfg from '../cfg.json'
import axios from 'axios'
import logo from './../assets/horse-32.ico'
import { UserType } from "../enum/user-type.enum"
import { TeamStatus } from "../enum/team-status.enum"
import { NotifysTarget } from "../enum/notifys-target.enum"

export default function InterfazAdmin(){
    const [verPreps, setVerPreps] = useState(false)
    const [verNots, setVerNots] = useState(false)
    const [verFichas, setVerFichas] = useState(false)
    const [home, setHome] = useState(true)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const notis = useQuery({
        queryKey: ['notis'],
        queryFn: async () => {
            if(user){
                const res = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                if(res.status == 200){
                    return res.data
                }
            }else return null
        }
    })
    const query = useQuery({
        queryKey: ['query'],
        queryFn: async () => {
            if(user){
                const usrs = (await axios.get(cfg.ruta+'/api/users', {headers: {Authorization: `Bearer ${user.token}`}})).data
                const hrss = (await axios.get(cfg.ruta+'/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})).data
                const fchs = (await axios.get(cfg.ruta+'/api/fichas', {headers: {Authorization: `Bearer ${user.token}`}})).data
                const nots = (await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})).data
                const eqps = (await axios.get(cfg.ruta+'/api/teams', {headers: {Authorization: `Bearer ${user.token}`}})).data
                const crls = await (await axios.get(cfg.ruta+'/api/corrales', {headers: {Authorization: `Bearer ${user.token}`}})).data
                
                eqps.forEach( e => {
                    if(e.prep != TeamStatus.OPEN){ 
                        e.prep = usrs.filter( u => u.rut === e.prep )
                        e.vets = usrs.filter( u => (u.cod_equipo === e.codigo && u.tipo === UserType.VETERINARY) )
                        e.horses = hrss.filter( h => h.codigo_equipo === e.codigo )
                        if(e.horses[0]) e.horses.forEach( h => h.ficha = fchs.filter( f => f.codigo === h.codigo_caballo ) )
                        e.notificaciones = nots.filter( n => (  n.target === NotifysTarget.ALL || n.target === e.codigo ) )
                        e.corrales = crls.filter( c => c.equipo === e.codigo )
                    }
                } )
                let corralesDisponibles = crls.filter( c => c.equipo === TeamStatus.OPEN )
                let vetsDisponibles = usrs.filter( u => (u.tipo === UserType.VETERINARY && u.cod_equipo === TeamStatus.OPEN) )
                let caballosDisponibles = hrss.filter( h => h.codigo_equipo === TeamStatus.OPEN )
                if(caballosDisponibles[0]) caballosDisponibles.forEach( c => c.ficha = fchs.filter( f => f.codigo === c.codigo_caballo ) )
                eqps.push(corralesDisponibles)
                eqps.push(vetsDisponibles)
                eqps.push(caballosDisponibles)
                return eqps
                
            }else return null
        }
    })
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
        setHome(false)
        setVerPreps(true)
    }
    const verNotificaciones = () => {
        setVerPreps(false)
        setVerFichas(false)
        setHome(false)
        setVerNots(true)
    }
    const verFichasVeterinarias = () => {
        setVerPreps(false)
        setVerNots(false)
        setHome(false)
        setVerFichas(true)
    }
    const verHome = () => {
        setVerPreps(false)
        setVerNots(false)
        setVerFichas(false)
        setHome(true)
    }
    const handleLogout = () => {
        logout()
        navegar('/')
    }

    return(
        <Container className="cuerpo p-0" fluid>
            <Container className="barra_nav p-0" fluid>
                <Navbar variant='success' bg='success' className='navbar'collapseOnSelect expand='sm'>
                    <Navbar.Brand as='h1' className='navTitle' > <Button variant="outline-light" onClick={verHome}> <Image src={logo}/> <strong> Hipic Vet </strong> </Button>  </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav' className='responsive-navbar-nav justify-content-*-around'>
                        <Nav fill variant="tabs" className='me-auto' >
                            <Nav.Item >
                                <Nav.Link href='#' eventKey='verPreps' onClick={verPreparadores} >Gestionar equipos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='#' eventKey='verNots' onClick={verNotificaciones} >Gestionar notificaciones</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='#' eventKey='verFichas' onClick={verFichasVeterinarias} >Ver caballos habilitados</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Container>
                            <Button variant='outline-light' onClick={handleLogout} >Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                {home ? <AdminHome query={query}/> : null}
                {verPreps ? <AdminPreps query={query}/> : null}
                {verNots ? <AdminNots query={query} ntfcns={notis}/> : null}
                {verFichas ? <AdminFichas query={query}/> : null}
            </Container>
        </Container>
    )
}