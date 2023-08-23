import React, {useState, useEffect} from "react"
import {Container, Navbar, Nav, Form, InputGroup, Modal} from 'react-bootstrap'
import './interfaz_generic.css'
import axios from 'axios'

function Interfaz_vet(){
    const [fichaMedica, setFichaMedica] = useState({})
    const [caballos, setCaballos] = useState([])
    const [fichas, setFichas] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [pesoInput, setPesoInput] = useState('')
    const getData = async (e) => {
        /*const resp = await axios.post('http://localhost:4444/api/fichas', fichaMedica)*/
        const horses = await axios.get('http://localhost:4444/api/caballos')
        let arr = []
        for(let h of horses.data){
            arr.push(h)
        }
        console.log(horses)
        console.log(arr)
        setCaballos(arr)
    }

    const getFichas = async (e) => {
        const fchs = await axios.get('http://localhost:4444/api/fichas')
        let arr = []
        for(let f of fchs.data){
            arr.push(f)
        }
        console.log(arr)
        setFichas(arr)
    }

    const toggleModalState = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleInput = (e) => {
        setPesoInput(e.target.value)
        console.log(e.target.value)
    }

    const guardarFicha = async (e) => {
        e.preventDefault()

        
    }

    

    useEffect( () => {
        getData()
        getFichas()
    }, [] )

    return(
        <body className="cuerpo">
            <Container className="barra_nav">
                <Navbar variant="success" bg="success">
                    <Navbar.Brand className='navTitle' as='h1'>Hipic Vet-Soft</Navbar.Brand>
                    <Container className="navOpc">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Portal principal</Nav.Link>
                            <Nav.Link href='#'>Ver caballos</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Container>
            <span>
                <Container className="bloque">
                    <form>
                        <Container className="lista-caballos">
                            {
                                caballos.map( caballo => 
                                <Container>
                                <Container className="list">
                                    <span>
                                        <li key={caballo.cod_corral}>
                                            <p> Nombre: {caballo.nombre} </p>
                                            <p> Propietario: {caballo.propietario} </p>
                                            <p> Codigo de caballo: {caballo.codigo_caballo} </p>
                                            <p> Codigo de equipo: {caballo.codigo_equipo} </p>
                                        </li>
                                    </span> 
                                    
                                    <span>
                                        <button className="boton-ficha" >Ver ficha veterinaria</button>
                                    </span>
                                </Container>
                                <hr/>
                                </Container>)
                            }
                        </Container>
                    </form>
                </Container>
            </span>
        </body>
    )
}

export default Interfaz_vet