import './interfaz_generic.css'
import {useEffect, useState} from 'react'
import {Container, Button, ButtonGroup} from 'react-bootstrap'
import axios from 'axios'


export default function Vet_Home(){
    const [horses, setHorses] = useState([])
    const [fichas, setFichas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [compFicha, setCompFicha] = useState(false)
    const [selection, setSelection] = useState('')
    const [selected_horse, setSelected_horse] = useState({})
    const [selected_ficha, setSelected_ficha] = useState({})
    console.log(selection)
    useEffect( () => {
        axios.get('http://localhost:4444/api/caballos').then( response => {
            let arr = []
            for(let h of response.data){
                arr.push(h)
            }
            setHorses(arr)
            setSelected_horse(arr[0])
            setSelection(arr[0].codigo_caballo)
            setIsLoading(false)
        } )
        axios.get('http://localhost:4444/api/fichas').then( response => {
            let arr = []
            for(let f of response.data){
                arr.push(f)
            }
            setFichas(arr)
            setSelected_ficha(arr[0])
        } )
    }, [] )
    console.log(horses)
    console.log(fichas)
    const regChange = (event) => {
        let valor = event.currentTarget.value
        let aux = {}
        setSelection(valor)
        for(let hs of horses){
            if(valor === hs.codigo_caballo){
                setSelected_horse(hs)
                aux = hs
            }
        }
        if(fichas.length>0){
            for(let f of fichas){
                if(aux.codigo_caballo === f.codigo){
                    setSelected_ficha(f)
                    setCompFicha(true)
                }else(
                    setCompFicha(false)
                )
            }
        }else{
            setCompFicha(false)
        }
    }
    console.log(selected_ficha.peso)
    console.log(selected_ficha.examenes)
    
    const SeccionFicha = () => {
        if(compFicha===true){
            return(
                <Container className='Seccion-ficha'>
                    <p> Peso: {selected_ficha.peso['$numberDecimal']} </p>
                    <Container className='ficha-info'>
                        <Container className='displayer'>
                            <p className='minititle'>Examenes</p>
                            
                                {
                                    selected_ficha.examenes.map(examen => (
                                        <Container>
                                            <p> Tipo: {examen.tipo} | Fecha: {examen.fecha} </p>
                                        </Container>
                                    ))
                                }
                            
                        </Container>
                        <Container className='displayer'>
                            <p className='minititle'>Vacunaciones</p>
                            <ul>
                                {
                                    selected_ficha.vacunaciones.map(examen => (
                                        <li> {examen} </li>
                                    ))
                                }
                            </ul>
                        </Container>
                        <Container className='displayer'> 
                            <p className='minititle'>Operaciones</p>
                            <ul>
                                {
                                    selected_ficha.operaciones.map(examen => (
                                        <li> {examen} </li>
                                    ))
                                }
                            </ul>
                        </Container>
                    </Container>
                </Container>
            )
        }else{
            return(
                <Container>
                    <p className='minititle'> Este caballo no tiene ficha medica creada... </p>
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
                                <Button variant='success' value={horse.codigo_caballo} onClick= {regChange}>{horse.nombre}</Button>
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
                        <hr/>
                        <Container>
                            <SeccionFicha/>
                        </Container>
                        <Container className='botones'>

                        </Container>
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