import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, ButtonGroup} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'

export default function AdminPreps(){
    const [preparadores, setPreparadores] = useState([])
    const [selectedPrep, setSelectedPrep] = useState({})
    const [exito, setExito] = useState(false)
    const [error, setError] = useState(false)
    const {user} = useAuthContext()
    const [tipo, setTipo] = useState('preparador')
    const nombre = useRef(null)
    const rut = useRef(null)
    const email = useRef(null)
    const cell = useRef(null)
    const pass = useRef(null)
    const cod_equipo = useRef(null)
    const corrales_en_posesion = useRef(null)
    
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
                console.log(p)
                setSelectedPrep(p)
            }
        }
    }

    const handleCrearPrep = async () => {
        const cuerpo = {
            tipo: tipo,
            nombre: nombre.current.value,
            rut: rut.current.value,
            email: email.current.value,
            cell: cell.current.value,
            pass: pass.current.value,
            cod_equipo: cod_equipo.current.value,
            corrales_en_posesion: corrales_en_posesion.current.value
        }
        try{
            await axios.request({
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                method: 'POST',
                data: cuerpo,
                url: 'http://localhost:4444/api/users'
            }).then( res => {
                console.log(res)
                setExito(true)
            })
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    const deletePrep = async () => {
        const auxPrep = selectedPrep
        try{
            await axios.request({
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                method: 'DELETE',
                data: selectedPrep,
                url: 'http://localhost:4444/api/users'
            }).then( res => {
                console.log(res)
            } )
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className='preps-info'>
            <div className='ficha-info'>
                <Container fluid className='p-0 vert-btns'>
                    <ButtonGroup vertical size='sm' className='p-0'>
                        {
                            preparadores.map( p => (
                                <Button key={p.rut} value={p.rut} variant='success' onClick={changeSelectedPrep}> {p.nombre} </Button>
                            ) )
                        }
                    </ButtonGroup>
                </Container>
                <Container className='lista-preps '>
                    <h1>{selectedPrep.nombre}</h1>
                    <p> Rut: {selectedPrep.rut} </p>
                    <p> Email: {selectedPrep.email} </p>
                    <p> Celular {selectedPrep.cell} </p>
                    <p> Codigo de equipo: {selectedPrep.cod_equipo} </p>
                    <p> Corrales en posesion: {selectedPrep.corrales_en_posesion} </p>
                    <Container className='btn-delete'>
                        <Button variant='outline-danger' onClick={deletePrep}>Eliminar preparador</Button>
                    </Container>
                </Container>
            </div>
            <Container className='lista-crear-preps'>
                <h1>Crear preparadores</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Nombre
                        </Form.Label>
                        <Form.Control 
                        required
                        size='sm'
                        type='text'
                        placeholder='...'
                        ref={nombre} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Tipo de usuario
                        </Form.Label>
                        <Form.Control 
                        size='sm'
                        type='text'
                        defaultValue='preparador'
                        disabled />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Rut
                        </Form.Label>
                        <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Rut sin puntos y con guion'
                        ref={rut} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                        size='sm' 
                        type='text'
                        placeholder='...'
                        ref={email} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Celular
                        </Form.Label>
                        <Container className='cellInput'>
                            <p className='prefix'>
                                +56
                            </p>
                            <Form.Control 
                            size='sm' 
                            type='text'
                            placeholder='...'
                            ref={cell} />                    
                        </Container>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Contraseña
                        </Form.Label>
                        <Form.Control 
                        size='sm'
                        type='password'
                        ref={pass} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Codigo de equipo
                        </Form.Label>
                        <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='...'
                        ref={cod_equipo} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Corrales en posesion
                        </Form.Label>
                        <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='...'
                        ref={corrales_en_posesion} />
                    </Form.Group>
                    <Form.Group className='btn-crear-prep'>
                        <Container>
                            <Button variant='success' onClick={handleCrearPrep}> Crear usuario </Button>
                        </Container>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}