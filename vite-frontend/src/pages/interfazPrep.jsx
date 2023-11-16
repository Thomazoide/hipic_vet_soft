import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useQuery } from 'react-query'
import PrepVets from "../components/prep_vets"
import PrepHorses from "../components/prep_horses"
import Notificaciones from "../components/ver_nots"
import cfg from '../cfg.json'
import axios from 'axios'
import logo from './../assets/horse-32.ico'

export default function InterfazPrep(){
    const [section, setSection] = useState('verVets')
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navegar = useNavigate()
    const query = useQuery({
        queryKey: ['prepInfo'],
        queryFn: async () => {
            if(user){
                const usrs = await axios.get(cfg.ruta+'/api/users', {headers: {Authorization: `Bearer ${user.token}`}}) 
                const hrss = await axios.get(cfg.ruta+'/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})
                const fchs = await axios.get(cfg.ruta+'/api/fichas', {headers: {Authorization: `Bearer ${user.token}`}})
                const nots = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                let team = {}
                team.vets = usrs.data.filter( u => (u.tipo === 'veterinario' && u.cod_equipo === user.usrData.cod_equipo) )
                team.horses = hrss.data.filter( h => h.codigo_equipo === user.usrData.cod_equipo)
                team.notificaciones = nots.data.filter( n => (n.target === 'all' || n.target === user.usrData.cod_equipo) )
                if(team.horses.length > 0){
                    for(let h of team.horses){
                        h.ficha = fchs.data.filter( f => f.codigo === h.codigo_caballo )
                    }
                }
                for(let p of usrs.data){
                    if(p.tipo === 'preparador' && p.cod_equipo === user.usrData.cod_equipo){
                        team.corrales = p.corrales_en_posesion
                    }
                }
                return team
            }else return null
        }
    })

    useEffect( () => {
        if(user){
            if(user.usrData.tipo != 'preparador'){
                navegar('/')
            }
        }else navegar('/')
    }, [user] )

    const verVets = () => setSection('verVets')
    const verHorses = () => setSection('verHorses')
    const verNots = () => setSection('verNots')

    const handleLogout = () => {
        logout()
        navegar('/')
    }


    return(
        <Container className="cuerpo p-0" fluid>
            <Container className="barra-nav p-0" fluid>
                <Navbar variant='success' bg='success' className='navbar'collapseOnSelect expand='sm'>
                    <Navbar.Brand as='h1' className='navTitle'> <Image src={logo}/> Hipic Vet-Soft</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav' className='responsive-navbar-nav justify-content-*-between'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#' onClick={verVets} >Gestionar veterinarios</Nav.Link>
                            <Nav.Link href='#' onClick={verHorses} >Gestionar caballos</Nav.Link>
                            <Nav.Link href='#' onClick={verNots} >Ver notificaciones</Nav.Link>
                        </Nav>
                        <Container>
                            <Button variant='outline-light' onClick={handleLogout} >Cerrar sesión</Button>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            <hr/>
            <Container className="bloque-position">
                {section === 'verVets' ? <PrepVets query={query}/> : null}
                {section === 'verHorses' ? <PrepHorses query={query}/> : null}
                {section === 'verNots' ? <Notificaciones query={query}/> : null}
            </Container>
        </Container>
    )
}