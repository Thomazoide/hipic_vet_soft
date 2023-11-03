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
                setCorrales(res2.corrales_en_posesion)
                let arr = []
                for(let h of res){
                    if(h.codigo_equipo === user.usrData.cod_equipo) arr.push(h)
                }
                setHorse(arr[0])
                return arr
            }else return null
        }
    })

    const handleSelect = (e) => {
        console.log(e.target.value)
        let auxSelect
        for(let h of caballos.data){
            if(h.codigo_caballo === e.target.value){
                setHorse(h)
            }
        }
    }

    const sendHorse = async () => {
        const auxHorse = {
            nombre: nombre.current.value,
            propietario: propietario.current.value,
            codigo_caballo: horseCode.current.value,
            codigo_corral: codCorral.current.value,
            codigo_equipo: user.usrData.cod_equipo
        }
        try{
            await axios.post('http://localhost:4444/api/caballos', auxHorse, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then( () => caballos.refetch() )
        }catch(err){console.log(err)}
    }

    if(caballos.isLoading || caballos.isFetching){
        return(
            <Container className='lista-caballos'>
                <Spinner variant='success'/>
            </Container>
        )
    }
    if(caballos.data){
        const largo = (caballos.data).length
        return(
            <Container className='preps-info'>
                {
                    (largo > 0) ? <div className='select-view'>
                        <ButtonGroup vertical size='sm' className='p-0 vert-btns'>
                            {
                                (caballos.data).map( h => (
                                    <Button key={h.codigo_caballo} value={h.codigo_caballo} variant='success' onClick={handleSelect} > {h.nombre} </Button>
                                ) )
                            }
                        </ButtonGroup>
                        <div className='lista-preps'>
                            <h1> {horse.nombre} </h1>
                            <p> Propietario/a: {horse.propietario} </p>
                            <p> Codigo de caballo: {horse.codigo_caballo} </p>
                            <p> Codigo de corral: {horse.codigo_corral} </p>
                        </div>
                    </div> : null
                }
                <div className='lista-crear-preps'>
                    <h1>Agregar caballo</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Nombre de caballo
                            </Form.Label>
                            <Form.Control
                            required
                            size='sm'
                            type='text'
                            placeholder='...'
                            ref={nombre}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Propietario/a
                            </Form.Label>
                            <Form.Control
                            required
                            size='sm'
                            type='text'
                            placeholder='Nombre completo...'
                            ref={propietario}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Codigo de caballo
                            </Form.Label>
                            <Form.Control
                            required
                            type='text'
                            placeholder='...'
                            size='sm'
                            ref={horseCode}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Codigo de corral
                            </Form.Label>
                            <Form.Select ref={codCorral}>
                                {
                                    corrales.map( c => (
                                        <option value={c} key={c}> {c} </option>
                                    ) )
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Codigo de equipo
                            </Form.Label>
                            <Form.Control
                            disabled
                            value={user.usrData.cod_equipo}/>
                        </Form.Group>
                        <Form.Group className='btn-crear-prep'>
                            <Container>
                                <Button variant='success' onClick={sendHorse} > Agregar caballo </Button>
                            </Container>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        )
    }
}