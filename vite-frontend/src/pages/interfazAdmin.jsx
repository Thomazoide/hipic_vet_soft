import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useQuery } from 'react-query'
import AdminPreps from "../components/admin_preps"
import AdminNots from "../components/admin_nots"
import AdminFichas from "../components/admin_fichas"
import cfg from '../cfg.json'
import axios from 'axios'
import logo from './../assets/horse-32.ico'

export default function InterfazAdmin(){
    const [verPreps, setVerPreps] = useState(true)
    const [verNots, setVerNots] = useState(false)
    const [verFichas, setVerFichas] = useState(false)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const notis = useQuery({
        queryKey: ['notis'],
        queryFn: async () => {
            if(user){
                const res = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                if(res.statusText === 'OK'){
                    return res.data
                }
            }else return null
        }
    })
    const query = useQuery({
        queryKey: ['query'],
        queryFn: async () => {
            if(user){
                const usrs = await axios.get(cfg.ruta+'/api/users', {headers: {Authorization: `Bearer ${user.token}`}})
                const hrss = await axios.get(cfg.ruta+'/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})
                const fchs = await axios.get(cfg.ruta+'/api/fichas', {headers: {Authorization: `Bearer ${user.token}`}})
                const nots = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                if(usrs.statusText === 'OK' && hrss.statusText === 'OK' && fchs.statusText === 'OK'){
                    let preps = usrs.data.filter( u => u.tipo === 'preparador' )
                    if(preps.length > 0){
                        for(let p of preps){
                            p.vets = usrs.data.filter( u => ( u.tipo === 'veterinario' && u.cod_equipo === p.cod_equipo) )
                            if(hrss.data.length > 0){
                                p.horses = hrss.data.filter( h => h.codigo_equipo === p.cod_equipo )
                            }else{
                                p.horses = null
                            }
                        }
                        if(fchs.data.length > 0){
                            for(let p of preps){
                                if(p.horses){
                                    for(let h of p.horses){
                                        h.ficha = fchs.data.filter( f => f.codigo === h.codigo_caballo )
                                    }
                                }
                            }
                        }
                        if(nots.data.length > 0){
                            for(let p of preps){
                                p.notificaciones = nots.data.filter( n => (n.target === p.cod_equipo || n.target === 'all') )
                            }
                        }
                        for(let a of preps){
                            if(a.vets.length == 0){
                                a.vets = null
                            }
                            if(a.horses.length == 0){
                                a.horses = null
                            }
                        }
                    }
                    return preps
                }
            }else return null
        },
        refetchInterval: 600000
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
        navegar('/')
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
                {verPreps ? <AdminPreps query={query}/> : null}
                {verNots ? <AdminNots query={query} ntfcns={notis}/> : null}
                {verFichas ? <AdminFichas query={query}/> : null}
            </Container>
        </Container>
    )
}