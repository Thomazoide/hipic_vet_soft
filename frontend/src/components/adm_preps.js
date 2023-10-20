import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form } from 'react-bootstrap'

export default function AdminPreps(){
    const [perparadores, setPreparadores] = useState([])
    return(
        <div className='ficha-info'>
            <div className='lista-preps'>
                <h1>Preparadores</h1>
            </div>
            <div className='lista-preps'>
                <h1>Crear preparadores</h1>
            </div>
        </div>
    )
}