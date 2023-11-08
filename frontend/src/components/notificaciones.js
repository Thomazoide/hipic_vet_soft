import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useAuthContext } from '../hooks/useLoginContext'

export default function Notificaciones(){

    const {user} = useAuthContext()

    const notificaciones = useQuery({
        queryKey: ['notificaciones'],
        queryFn: async () => {
            if(user){
                const res = (await axios.get('http://localhost:4444/api/notis', {headers: {Authorization: `Bearer ${user.token}`}})).data
                if(!res){
                    return null
                }
                let arr = []
                for(let n of res){
                    if(n.target === 'all' || n.target === user.usrData.cod_equipo){
                        arr.push(n)
                    }
                }
                return arr
            }else return null
        }
    })

    if(notificaciones.data){
        return(
            <Container className='lista-caballos'>
                {
                    (notificaciones.data).map( n => (
                        <Container className='sec-not' key={n.titulo}>
                            <Container className='not-title' fluid>
                                <div>Asunto: {n.titulo} </div>
                                <div>Fecha: {(n.fecha).split('T')[0]} </div>
                            </Container>
                            <hr/>
                            <div className='justify-content-start' >
                                {n.descripcion}
                            </div>
                        </Container>
                    ) )
                }
            </Container>
        )
    }else{
        return(
            <Container className='lista-caballos'>
                <h1> No hay notificaciones creadas </h1>
            </Container>
        )
    }
}