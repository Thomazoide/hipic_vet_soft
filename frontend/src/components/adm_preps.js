import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, ButtonGroup} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'

export default function AdminPreps(){
    const [preparadores, setPreparadores] = useState([])
    const [selectedPrep, setSelectedPrep] = useState({})
    const {user} = useAuthContext()
    const nombre = useRef(null)
    const tipo = useRef(null)
    
    useEffect( () => {
        if(user){
            axios.request({
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                method: 'GET',
                url: 'http://localhost:4444/api/users'
            }).then( res => {
                let arr = []
                for(let p of res.data){
                    if(p.tipo === 'preparador'){
                        arr.push(p)
                    }
                }
                setSelectedPrep(arr[0])
                setPreparadores(arr)
            } )
        }
    } , [user] )

    const changeSelectedPrep = (e) => {
        const sel = e.target.value
        const auxPreps = preparadores
        for(let p of auxPreps){
            if(p.rut === sel){
                setSelectedPrep(p)
            }
        }
    }

    return(
        <div className='ficha-info'>
            <Container fluid>
                <ButtonGroup vertical size='sm' className='p-0'>
                    {
                        preparadores.map( p => (
                            <Button key={p.rut} value={p.rut} variant='success' onClick={changeSelectedPrep}> {p.nombre} </Button>
                        ) )
                    }
                </ButtonGroup>
            </Container>
            <Container className='lista-preps p-0'>
                <h1>{selectedPrep.nombre}</h1>
                <p> Email: {selectedPrep.email} </p>
                <p> Celular {selectedPrep.cell} </p>
                <p> Codigo de equipo: {selectedPrep.cod_equipo} </p>
                <p> Corrales en posesion: {selectedPrep.corrales_en_posesion} </p>
            </Container>
            <Container className='lista-preps'>
                <h1>Crear preparadores</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Nombre
                        </Form.Label>
                        <Form.Control>

                        </Form.Control>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}