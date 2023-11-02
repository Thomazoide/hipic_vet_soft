import {useState, useRef, useEffect} from 'react'
import { useQuery } from 'react-query'
import { Container, Button, Spinner, Form, ButtonGroup} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function PrepHorses(){
    const {user} = useAuthContext()
    const navegar = useNavigate()
    const [horse, setHorse] = useState({})
    const [corrales, setCorrales] = useState([])

    const nombre = useRef(null)
    const propietario = useRef(null)
    const horseCode = useRef(null)
    const codCorral = useRef(null)

    const caballos = useQuery({
        queryKey: ['caballos'],
        queryFn: async () => {
            if(user){
                const res = (await axios.get('http://localhost:4444/api/caballos', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })).data
                const res2 = (await axios.put('http://localhost:4444/api/users', {_id: user.usrData._id}, {headers: {
                    Authorization: `Bearer ${user.token}`
                }})).data
                setCorrales(res2)
                let arr = []
                for(let h of res){
                    if(h.codigo_equipo === user.usrData.cod_equipo) arr.push(h)
                }
                setHorse(arr[0])
                return arr
            }else return null
        }
    })
}