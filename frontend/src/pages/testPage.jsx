import { useEffect, useState } from "react"
import { Container, Button, Navbar, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useLogout } from './../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useQuery } from 'react-query'
import AdminPreps from "../components/admin_preps"
import AdminNots from "../components/admin_nots"
import PrepVets from "../components/prep_vets"
import PrepHorses from "../components/prep_horses"
import VetHome from "../components/vet_home"
import VetFichas from "../components/vet_fichas"
import Notificaciones from "../components/ver_nots"
import cfg from '../cfg.json'
import axios from 'axios'

export default function TestPage(){
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
    const queryAdmin = useQuery({
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
                    if(e.prep != 'open'){ 
                        e.prep = usrs.filter( u => u.rut === e.prep )
                        e.vets = usrs.filter( u => (u.cod_equipo === e.codigo && u.tipo === 'veterinario') )
                        e.horses = hrss.filter( h => h.codigo_equipo === e.codigo )
                        if(e.horses[0]) e.horses.forEach( h => h.ficha = fchs.filter( f => f.codigo === h.codigo_caballo ) )
                        e.notificaciones = nots.filter( n => (  n.target === 'all' || n.target === e.codigo ) )
                        e.corrales = crls.filter( c => c.equipo === e.codigo )
                    }
                } )
                let corralesDisponibles = crls.filter( c => c.equipo === 'open' )
                let vetsDisponibles = usrs.filter( u => (u.tipo === 'veterinario' && u.cod_equipo === 'open') )
                let caballosDisponibles = hrss.filter( h => h.codigo_equipo === 'open' )
                eqps.push(corralesDisponibles)
                
                return eqps
                
            }else return null
        }
    })
    const queryPrep = useQuery({
        queryKey: ['prepInfo'],
        queryFn: async () => {
            if(user){
                const usrs = await axios.get(cfg.ruta+'/api/users', {headers: {Authorization: `Bearer ${user.token}`}}) 
                const hrss = await axios.get(cfg.ruta+'/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})
                const fchs = await axios.get(cfg.ruta+'/api/fichas', {headers: {Authorization: `Bearer ${user.token}`}})
                const nots = await axios.get(cfg.ruta+'/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})
                const crrls = await axios.get(cfg.ruta+'/api/corrales', {headers: {Authorization: `Bearer ${user.token}`}})
                const eqps = await axios.get(cfg.ruta+'/api/teams', {headers: {Authorization: `Bearer ${user.token}`}})
                let team = {}
                team.vets = usrs.data.filter( u => (u.tipo === 'veterinario' && u.cod_equipo === user.usrData.cod_equipo) )
                team.corrales = crrls.data.filter( c => c.equipo === user.usrData.cod_equipo )
                team.horses = hrss.data.filter( h => h.codigo_equipo === user.usrData.cod_equipo)
                team.notificaciones = nots.data.filter( n => (n.target === 'all' || n.target === user.usrData.cod_equipo) )
                if(team.horses.length > 0){
                    for(let h of team.horses){
                        h.ficha = fchs.data.filter( f => f.codigo === h.codigo_caballo )
                    }
                }
                console.log('USUARIOS:', usrs, '\nCABALLOS:', hrss, '\nFICHAS:', fchs, '\nNOTIFICACIONES:', nots, '\nEQUIPOS:', eqps, '\nCORRALES:', crrls)
                return team
            }else return null
        }
    })
    const queryVet = useQuery({
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


    if(queryAdmin.isFetched && queryPrep.isFetched && queryVet.isFetched){return(
        <div className="test-section">
            <Container>
                <AdminPreps query={queryAdmin} />
            </Container>
            <Container>
                <AdminNots  query={queryAdmin} ntfcns={notis}/>
            </Container>
            <Container>
                <PrepVets query={queryPrep}/>
            </Container>
            <Container>
                
            </Container>
            <Container>
                <VetHome query={queryVet}/>
            </Container>
            <Container>
                <VetFichas query={queryVet}/>
            </Container>
        </div>
    )}
}