import React, {useState, useEffect} from "react"
import {Container, Navbar, Nav, Form, InputGroup} from 'react-bootstrap'
import './interfaz_generic.css'
import axios from 'axios'

function Interfaz_vet(){
    const [fichaMedica, setFichaMedica] = useState({})
    const [caballos, setCaballos] = useState([])
    const getData = async (e) => {
        /*const resp = await axios.post('http://localhost:4444/api/fichas', fichaMedica)*/
        const horses = await axios.get('http://localhost:4444/api/caballos')
        let arr = []
        for(let h of horses.data){
            arr.push(h)
        }
        console.log(arr)
        setCaballos(arr)
    }

    useEffect( () => {
        getData()
    }, [] )

    return(
        <Container className="cuerpo">
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
                        <Container>
                            {
                                caballos.map( caballo => 
                                <Container className="list">
                                    <span>
                                        <li >
                                            <p> Nombre: {caballo.nombre} </p>
                                            <p> Carreras_corridas: {caballo.carreras_corridas} </p>
                                            <p> Probabilidad de victoria: {caballo.ratio_victorias} </p>
                                            <p> Codigo de equipo: {caballo.cod_corral} </p>
                                        </li>
                                    </span> 
                                    <span>
                                        <button>Ver ficha veterinaria</button>
                                    </span>
                                    <hr/>
                                </Container>)
                            }
                        </Container>
                    </form>
                </Container>
            </span>
        </Container>
    )
}

export default Interfaz_vet