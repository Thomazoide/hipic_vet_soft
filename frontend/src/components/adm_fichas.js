import {useState, useRef, useEffect} from 'react'
import { useQuery } from 'react-query'
import { Container, Button, Spinner, Dropdown} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'


export default function AdminFichas(){
    const {user} = useAuthContext()
    const [equipos, setEquipos] = useState([])
    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedHorse, setSelectedHorse] = useState('')
    const [selectedFicha, setSelectedFicha] = useState({})
    
    const caballos = useQuery({
        queryKey: ['caballos'],
        queryFn: async () => {
            const res = (await axios.get('http://localhost:4444/api/caballos', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })).data
            let arr = []
            res.forEach( (h) => {
                arr.push(h.codigo_equipo)
            } )
            arr = [...new Set(arr)]
            console.log(arr)
            setSelectedTeam(arr[0])
            setEquipos(arr)
            return res
        }
    })
    const fichas = useQuery({
        queryKey: ['fichas'],
        queryFn: async () => {
            const res = (await axios.get('http://localhost:4444/api/fichas', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })).data
            return res
        }
    })

    useEffect( () => {
        let auxHorses = caballos.data
        let auxFichas = fichas.data
        auxHorses = auxHorses.filter( h => h.codigo_equipo === selectedTeam )
        console.log(auxHorses)
    }, [caballos, fichas] )

    if(caballos.isLoading){
        return(
            <Container className='preps-info'>
                <Container>
                    <Spinner variant='success'/>
                </Container>
            </Container>
        )
    }

    return(
        <Container>
            <Container className='botones-admin'>
                <Container className='boton-admin'>
                    <Button>amnska</Button>
                </Container>
                <Container className='boton-admin'>
                    <Button>amnska</Button>
                </Container>
            </Container>
        </Container>
    )
}