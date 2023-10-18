import './interfaz_generic.css'
import { useState, useEffect, useRef } from "react"
import { Button, Container, Dropdown, Form, Modal, Spinner, Alert } from 'react-bootstrap'
import {useAuthContext} from './../hooks/useLoginContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode'



export default function VetFichas(){
    const [userData, setUserData] = useState({})
    const [fichas, setFichas] = useState([])
    const [caballos, setCaballos] = useState([])
    const [selection, setSelection] = useState('')
    const [selected_ficha, setSelected_ficha] = useState({})
    const [isSelected, setIsSelected] = useState(false)
    const [lista, setLista] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [evc, setEcv] = useState('')
    const tipoInput = useRef(null)
    const descInyec = useRef(null)
    const {user} = useAuthContext()


    useEffect( () => {
        let usrdt = jwt_decode(user.token)
        let date = new Date()
        date = date.toISOString().split('T')[0]

        localStorage.setItem('fecha', date)
        const getCaballos = async() => {
            const response = await fetch('http://localhost:4444/api/caballos', {
                'type': 'GET',
                'headers': {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)
            let arr = []
            for(let c of json){
                if(c.codigo_equipo === usrdt.cod_equipo){
                    arr.push(c)
                }
            }
            setCaballos(arr)
        }
        const getFichas = async() => {
            const response = await fetch('http://localhost:4444/api/fichas', {
                'type': 'GET',
                'headers': {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setFichas(json)
        }
        if(user){
            setUserData(jwt_decode(user.token))
            console.log(jwt_decode(user.token))
            getCaballos()
            getFichas()
        }
        
    }, [user] )

    const generarLista = () => {
        let aux1 = caballos
        let aux2 = fichas
        let lista_aux = []
        for(let c of aux1){
            for(let f of aux2){
                if(f.codigo === c.codigo_caballo){
                    let el = {
                        title:`${c.nombre} | ${f.codigo}`,
                        value: f.codigo
                    }
                    lista_aux.push(el)
                }
            }
        }
        setLista(lista_aux)
    }

    const seleccionarDefault = () => {
        var aux1 = caballos[0]
        var aux2 = fichas
        var aux3 = {}
        for(var f of aux2){
            if(aux1.codigo_caballo === f.codigo){
                aux3 = f
            }
        }
        setSelected_ficha(aux3)
        let aux4 = `${aux1.nombre} | ${aux3.codigo}`
        setSelection(aux4)
        setIsSelected(true)
    }

    useEffect( () => {
        if(caballos.length > 0 && fichas.length > 0){
            seleccionarDefault()
            generarLista()
        }
    }, [caballos, fichas])

    const onSelection = (event) => {
        let aux1 = event
        let aux2 = {}
        aux1 = aux1.split('|')
        aux1[0] = aux1[0].trim()
        aux1[1] = aux1[1].trim()
        for(let f of fichas){
            if(f.codigo === aux1[1]){
                aux2 = f
            }
        }
        setSelected_ficha(aux2)
        setSelection(event)
        console.log(aux1)
    }

    const mostrarModal = (event) => {
        setEcv(event.target.value)
        setShowModal(true)
    }

    const cerrarModal = () => setShowModal(false)

    const fichaPut = async () => {
        //event.preventDefault()
        console.log(tipoInput)
        let auxFicha = selected_ficha
        let auxFecha = localStorage.getItem('fecha')
        let aux = {
            tipo: tipoInput.current.value,
            fecha: auxFecha
        }
        if(tipoInput){
            if(evc === 'examen'){
                auxFicha.examenes.push(aux)
                await axios.put('http://localhost:4444/api/fichas', auxFicha)
                setShowAlert(true)
                setShowModal(false)
            }
            if(evc === 'vacuna'){
                aux.descripcion = descInyec.current.value
                auxFicha.vacunaciones.push(aux)
                await axios.put('http://localhost:4444/api/fichas', auxFicha)
                setShowAlert(true)
                setShowModal(false)
            }
            if(evc === 'cirujia'){
                aux.descripcion = descInyec.current.value
                auxFicha.operaciones.push(aux)
                await axios.put('http://localhost:4444/api/fichas', auxFicha)
                setShowAlert(true)
                setShowModal(false)
            }
        }else{
            setShowAlert(true)
        }
    }

    const AlertaSuccess = () => {
        return(
            <Container>
                <Alert variant='success' onClose={ () => setShowAlert(false) } dismissible>
                    <Alert.Heading> <Spinner variant='dark' size='sm'/> </Alert.Heading>
                    <p className='minititle'> Agregado correctamente </p>
                </Alert>
            </Container>
        )
    }

    const ModalCrear = (props) => {
        if(evc === ''){
            return(
                <Container>
                    <Modal show={showModal} onHide={cerrarModal}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body className='btn-crear'>
                            <Spinner variant='success'/>
                        </Modal.Body>
                    </Modal>
                </Container>
            )
        }else{
            if(evc === 'examen'){
                return(
                    <Container>
                        <Modal 
                        {...props}
                        show={showModal} 
                        onHide={cerrarModal}
                        backdrop='static'
                        keyboard={false}
                        centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Agregar examen</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form>
                                        <Form.Group className='mb-3'controlId='horseCode'>
                                            <Form.Label>Tipo de examen:</Form.Label>
                                            <Form.Control
                                            type='text'
                                            placeholder='...'
                                            ref={tipoInput}
                                            onChange={ () => console.log(tipoInput.current.value) }
                                            autoFocus/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Fecha: {localStorage.getItem('fecha')}
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant='success' onClick={ fichaPut }>Agregar</Button>
                                        </Form.Group>
                                    </Form>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </Container>
                )
            }
            if(evc === 'vacuna'){
                return(
                    <Container>
                        <Modal 
                        {...props}
                        show={showModal} 
                        onHide={cerrarModal}
                        backdrop='static'
                        keyboard={false}
                        centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Agregar vacunacion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Titulo</Form.Label>
                                            <Form.Control
                                            type='text'
                                            placeholder='...'
                                            ref={tipoInput}
                                            onChange={ () => console.log(tipoInput.current.value) }
                                            autoFocus/>
                                        </Form.Group>
                                        <Form.Group className='mb-3'controlId='horseCode'>
                                            <Form.Label>Descripcion:</Form.Label>
                                            <Form.Control
                                            type='text'
                                            placeholder='...'
                                            as='textarea'
                                            rows={3}
                                            ref={descInyec}
                                            onChange={ () => console.log(descInyec.current.value) }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Fecha: {localStorage.getItem('fecha')}
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant='success' onClick={ fichaPut }>Agregar</Button>
                                        </Form.Group>
                                    </Form>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </Container>
                )
            }
            if(evc === 'cirujia'){
                return(
                    <Container>
                        <Modal 
                        {...props}
                        show={showModal} 
                        onHide={cerrarModal}
                        backdrop='static'
                        keyboard={false}
                        centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Agregar cirujia</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <Form>
                                        <Form.Group className='mb-3'controlId='horseCode'>
                                            <Form.Label>Tipo de cirujia:</Form.Label>
                                            <Form.Control
                                            type='text'
                                            placeholder='...'
                                            ref={tipoInput}
                                            onChange={ () => console.log(tipoInput.current.value) }
                                            autoFocus/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Descripcion</Form.Label>
                                            <Form.Control
                                            type='text'
                                            as='textarea'
                                            rows={3}
                                            ref={descInyec}
                                            onChange={ () => console.log(descInyec.current.value) }/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Fecha: {localStorage.getItem('fecha')}
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant='success' onClick={ fichaPut }>Agregar</Button>
                                        </Form.Group>
                                    </Form>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </Container>
                )
            }
        }
    }

    if(fichas.length < 1){
        return(
            <Container className='cuerpo'>
                <Container className='lista-caballos'>
                    <h1>No se encuentra ninguna ficha creada</h1>
                </Container>
            </Container>
        )
    }else{
        if(isSelected){
            return(
                <Container className='cuerpo'>
                    <Container className='boton-seleccion'>
                        {
                            showAlert ??
                            <AlertaSuccess/> 
                        }
                        <Dropdown onSelect={onSelection}>
                            <Dropdown.Toggle variant = 'success' size='lg'>
                                {selection}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    lista.map( (elemento) => (
                                        <Dropdown.Item eventKey={elemento.title} key={elemento.title} > {elemento.title} </Dropdown.Item>
                                    ) )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <Container className='lista-caballos'>
                        <ModalCrear/>
                        <Container className='seccion-ficha'>
                            <h3>Peso: {selected_ficha.peso["$numberDecimal"]} Kg </h3>
                            <hr/>
                            <Container className='ficha-info' >
                                <Container className='big-displayer'>
                                    <Container className='btn-crear'>
                                        <p className='minititle'>Exámenes</p>
                                        <Button variant='outline-success' size='sm' value={'examen'} onClick={mostrarModal}>Agregar examen</Button>
                                    </Container>
                                    <hr/>
                                    {
                                        selected_ficha.examenes.map( (examen, index) => (
                                            <Container className='displayer' key={index}>
                                                <p> tipo: {examen.tipo} </p>
                                                <p> fecha: {examen.fecha} </p>
                                                <hr/>
                                            </Container>
                                        ) )
                                    }
                                </Container>
                                <Container className='big-displayer'>
                                    <Container className='btn-crear'>
                                        <p className='minititle'>Vacunaciones</p>
                                        <Button variant='outline-success' size='sm' value={'vacuna'} onClick={mostrarModal}>Agregar vacunacion</Button>
                                    </Container>
                                    <hr/>
                                    {
                                        selected_ficha.vacunaciones.map( (examen, index) => (
                                            <Container className='displayer' key={index}>
                                                <p> tipo: {examen.tipo} </p>
                                                <p> fecha: {examen.fecha} </p>
                                                <hr/>
                                            </Container>
                                        ) )
                                    }
                                </Container>
                                <Container className='big-displayer'>
                                    <Container className='btn-crear'>
                                        <p className='minititle'>Cirujías</p>
                                        <Button variant='outline-success' size='sm' value={'cirujia'} onClick={mostrarModal}>Agregar cirujia</Button>
                                    </Container>
                                    <hr/>
                                    {
                                        selected_ficha.operaciones.map( (examen, index) => (
                                            <Container className='displayer' key={index}>
                                                <p> tipo: {examen.tipo} </p>
                                                <p> fecha: {examen.fecha} </p>
                                                <hr/>
                                            </Container>
                                        ) )
                                    }
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            )
        }else{
            return(
                <Container className='cuerpo'>
                    <Container className='lista-caballos'>
                        <Spinner variant='success'/>
                    </Container>
                </Container>
            )
        }
    }
}