import './interfaz_generic.css'
import {useEffect, useState, useRef} from 'react'
import {Container, Button, ButtonGroup, Modal, Form} from 'react-bootstrap'
import {useAuthContext} from './../hooks/useLoginContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


export default function VetHome(){
    const [userData, setUserData] = useState({})
    const [horses, setHorses] = useState([])
    const [fichas, setFichas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [compFicha, setCompFicha] = useState(false)
    const [modalFicha, setModalFicha] = useState(false)
    const [selection, setSelection] = useState('')
    const [selected_horse, setSelected_horse] = useState({})
    const [selected_ficha, setSelected_ficha] = useState({})
    const mostrarVentana = () => setModalFicha(true)
    const cerrarVentana = () => setModalFicha(false)
    const {user} = useAuthContext()
    console.log(selection)
    useEffect( () => {
        if(user){
            let usrdt = jwt_decode(user.token)
            setUserData(usrdt)
            axios.request({
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                method: 'GET',
                url: 'http://localhost:4444/api/caballos'}).then( response => {
                let arr = []
                for(let h of response.data){
                    if(h.codigo_equipo === usrdt.cod_equipo){
                        arr.push(h)
                    }
                }
                setHorses(arr)
                setSelected_horse(arr[0])
                setSelection(arr[0].codigo_caballo)
                setIsLoading(false)
            } )
            axios.request({
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                method: 'GET',
                url: 'http://localhost:4444/api/fichas'}).then( response => {
                    console.log(response.data)
                    let arr = []
                    for(let f of response.data){
                        arr.push(f)
                    }
                    setFichas(arr)
                    setSelected_ficha(arr[0])
            } )
        }
    }, [user] )
    console.log(horses)
    console.log(fichas)
    const regExChange = () => {
        for(let f of fichas){
            let valor = selected_horse.codigo_caballo
            if(valor === f.codigo){
                setSelected_ficha(f)
                setCompFicha(true)
            }
        }
    }
    useEffect( () => {
        regExChange()
    }, [selected_horse] )
    const regChange = (event) => {
        let valor = event.target.value
        setSelection(valor)
        for(let hs of horses){
            if(valor === hs.codigo_caballo){
                setSelected_horse(hs)
                console.log(hs)
                setCompFicha(false)
            }
        }
    }
    console.log(selected_ficha.peso)
    console.log(selected_ficha.examenes)
    const obtainW = useRef(null)
    const [pesoInput, setPesoInput] = useState()
    const SeccionFicha = (props) => {
        if(compFicha===true){
            return(
                <Container className='Seccion-ficha'>
                    <p> Peso: {selected_ficha.peso['$numberDecimal']} Kg</p>
                    <Container className='ficha-info'>
                        <Container className='displayer'>
                            <p className='minititle'>Examenes</p>
                            
                                {
                                    selected_ficha.examenes.map((examen, index) => (
                                        <Container key={index}>
                                            <p> Tipo: {examen.tipo} | Fecha: {examen.fecha} </p>
                                        </Container>
                                    ))
                                }
                            
                        </Container>
                        <Container className='displayer'>
                            <p className='minititle'>Vacunaciones</p>
                            <ul>
                                {
                                    selected_ficha.vacunaciones.map((examen, index) => (
                                        <Container key={index}>
                                            <p> Tipo: {examen.tipo} | Fecha: {examen.fecha} </p>
                                        </Container>
                                    ))
                                }
                            </ul>
                        </Container>
                        <Container className='displayer'> 
                            <p className='minititle'>Operaciones</p>
                            <ul>
                                {
                                    selected_ficha.operaciones.map((examen, index) => (
                                        <Container key={index}>
                                            <p> Tipo: {examen.tipo} | Fecha: {examen.fecha} </p>
                                        </Container>
                                    ))
                                }
                            </ul>
                        </Container>
                    </Container>
                </Container>
            )
        }else{
            
            const handleChange = (e) => {
                setPesoInput(e.target.value)
            }
            const handleSubmit = () => {
                let aux = obtainW.current.value
                let plantilla = {
                    codigo: selected_horse.codigo_caballo,
                    peso: aux,
                    examenes: [],
                    vacunaciones: [],
                    operaciones: []
                }
                console.log(plantilla)
                axios.post('http://localhost:4444/api/fichas', {codigo: plantilla.codigo, peso: plantilla.peso, examenes: plantilla.examenes, vacunaciones: plantilla.vacunaciones, operaciones: plantilla.operaciones })
            }
            console.log(pesoInput)
            return(
                <Container>
                    
                        <Modal
                        {...props}
                        show={modalFicha}
                        onHide={cerrarVentana}
                        backdrop='static'
                        keyboard={false}
                        centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear ficha</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className='mb-3' controlId='formularioFicha'>
                                        <Form.Label>Peso del caballo (Kg)</Form.Label>
                                        <Form.Control
                                        type='text'
                                        placeholder='999.999'
                                        ref={obtainW}
                                        onChange={ () => console.log(obtainW.current.value) }
                                        autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='horseCode'>
                                        <Form.Label>Codigo de caballo: {selected_horse.codigo_caballo}</Form.Label>
                                    </Form.Group>
                                    <Button variant='success' type='submit' onClick={handleSubmit}>Crear ficha</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    <p className='minititle'> Este caballo no tiene ficha creada... </p>
                    <Button variant='success' onClick={mostrarVentana}>Crear ficha veterinaria</Button>
                </Container>
            )
        }
    }
    

    if(!isLoading){
        return(
            <Container className='bloque'>
                <Container className='opciones'>
                    <ButtonGroup>
                        {
                            horses.map( horse => (
                                <Button key={horse.nombre} variant='success' value={horse.codigo_caballo} onClick= {regChange} onChange={regChange} >{horse.nombre}</Button>
                            ) )
                        }
                    </ButtonGroup>
                </Container>
                <Container className='lista-caballos'>
                    <Container className='list'>
                        <Container className='data'>
                            <p> Nombre: {selected_horse.nombre} </p>
                            <p> Propietario: {selected_horse.propietario} </p>
                            <p> Codigo: {selected_horse.codigo_caballo} </p>
                        </Container>
                    </Container>
                    <hr/>
                    <Container>
                        <SeccionFicha/>
                    </Container>
                </Container>
            </Container>
        )
    }

    return(
        <Container className='bloque'>
            <Container className='lista-caballos'>
                <h4>Prueba</h4>
            </Container>
        </Container>
    )
}