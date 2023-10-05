import './interfaz_generic.css'
import { useState, useEffect } from "react"
import { CloseButton, Container, Dropdown, DropdownButton, Spinner } from 'react-bootstrap'
import axios from 'axios'


export default function VetFichas(){
    const [] = useState(false)
    const [fichas, setFichas] = useState([])
    const [caballos, setCaballos] = useState([])
    const [selection, setSelection] = useState('')
    const [selected_ficha, setSelected_ficha] = useState({})
    const [isSelected, setIsSelected] = useState(false)
    const [lista, setLista] = useState([])


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
        aux1 = aux1.split('|')
        console.log(aux1)
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
                        <Dropdown onSelect={onSelection} >
                            <Dropdown.Toggle variant = 'success'>
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