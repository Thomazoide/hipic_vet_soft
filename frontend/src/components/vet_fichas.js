import './interfaz_generic.css'
import { useState, useEffect } from "react"
import axios from 'axios'


export default function VetFichas(){
    const [] = useState(false)
    const [fichas, setFichas] = useState([])
    const [caballos, setCaballos] = useState([])
    const [selection, setSelection] = useState('')
    const [selected_ficha, setSelected_ficha] = useState({})

    useEffect( async () => {
        const dat = await axios.get('http://localhost:4444/api/fichas').data
        const horses = await axios.get('http://localhost:4444/api/caballos').data
        let arrF = []
        let arrH = []
        for(let f of dat) arrF.push(f)
        for(let h of horses) arrH.push(h)
        
    }, [] )
}