import './interfaz_generic.css'
import { useState, useEffect } from "react"
import { Container, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios'


export default function VetFichas(){
    const [] = useState(false)
    const [fichas, setFichas] = useState([])
    const [caballos, setCaballos] = useState([])
    const [selection, setSelection] = useState('')
    const [selected_ficha, setSelected_ficha] = useState({})


    useEffect( () => {
        axios.get('http://localhost:4444/api/fichas').then( res => {
            let arr = []
            console.log(res.data)
            for(let f of res.data){
                arr.push(f)
            }
            setFichas(arr)
        } )
        axios.get('http://localhost:4444/api/caballos').then( res => {
            let arr = []
            console.log(res.data)
            for(let h of res.data){
                arr.push(h)
            }
            setCaballos(arr)
        } )
        
    }, [] )

    if(fichas.length < 1){
        return(
            <Container className='cuerpo'>
                <Container className='lista-caballos'>
                    <h1>No se encuentra ninguna ficha creada</h1>
                </Container>
            </Container>
        )
    }else{
        return(
            <Container className='cuerpo'>
                <Container className='boton-seleccion'>
                    
                </Container>
                <Container className='lista-caballos'>

                </Container>
            </Container>
        )
    }
}