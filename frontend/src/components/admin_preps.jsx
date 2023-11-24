import {useState, useEffect, useRef, memo} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function AdminPreps({query}){

    //bloque variables

    const [selectedPrep, setSelectedPrep] = useState(null)
    const [queryData, setQueryData] = useState(null)
    const [equiposDisp, setEquiposDisp] = useState(null)
    const [corralesDisponibles, setCorralesDisponibles] = useState(null)
    const [equipos, setEquipos] = useState(null)
    const [renderizar, setRenderizar] = useState(false)
    const [exito, setExito] = useState(false)
    const [exitoDelete, setExitoDelete] = useState(false)
    const [error, setError] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)
    const [disableChecks, setDisableChecks] = useState(false)
    const [corrales_en_posesion, SetCorrales_en_posesion] = useState(null)
    const tipo = 'preparador'
    const nombre = useRef(null)
    const rut = useRef(null)
    const email = useRef(null)
    const cell = useRef(null)
    const pass = useRef(null)
    const cod_equipo = useRef(null)
    const {user} = useAuthContext()

    //bloque variables

    //bloque funciones

    const toggleSuccessToast = () => {
        setExito(!exito)
    }

    const toggleErrorToast = () => {
        setError(!error)
    }

    const toggleSuccessDelete = () => setExitoDelete(!exitoDelete)
    const toggleErrorDelete = () => setErrorDelete(!errorDelete)

    const handleCorralesCheck = (e) => {
        console.log(e)
        if(!corrales_en_posesion && e.target.checked){
            let plantilla = {
                selected: [e.target.value]
            }
            SetCorrales_en_posesion(plantilla)
            console.log(plantilla)
        }
        if(corrales_en_posesion){
            let plantilla = corrales_en_posesion
            if(plantilla.selected.length < 3){
                if(e.target.checked && !plantilla.selected.filter( c => c === e.target.value )[0] ){
                    if(plantilla.selected.length < 3) setDisableChecks(false)
                    if(plantilla.selected.length >= 3) setDisableChecks(true)
                    plantilla.selected.push(e.target.value)
                    console.log(plantilla)
                    SetCorrales_en_posesion(plantilla)
                }else if( !e.target.checked && plantilla.selected.filter( c => c === e.target.value )[0] ){
                    plantilla.cantidad -= 1
                    plantilla.selected.filter( c => c !== e.target.value )
                    console.log(plantilla)
                    SetCorrales_en_posesion(plantilla)
                }
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
    }

    const handleDelete = async () => {
        
    }

    const handleChangePrep = (event) => {
        
    }

    //bloque funciones

    //bloque efectos

    useEffect( () => {
        if(query){
            if(query.isFetched){
                console.log(query.data[60])
                setQueryData(query.data)
                let arr = query.data.filter( e => e.prep != 'open' )
                let ed = query.data.filter( e => e.prep === 'open' )
                setCorralesDisponibles(query.data[60])
                if(ed[0]){
                    setEquiposDisp(ed)
                }
                if(arr[0]){
                    setSelectedPrep(arr[0])
                    setEquipos(arr)
                    setRenderizar(true)
                }
            }
        }
    }, [query] )

    //bloque efectos

    //bloque micro componentes

    const SuccessToast = () => {
        return(
            <Container fluid>
                <Toast show={exito} onClose={toggleSuccessToast} bg='success'>
                    <Toast.Header >
                        <strong>Éxito en la operación</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white' >
                        Preparador guardado con éxito...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    const SuccessDeleteToast = () => {
        return(
            <Container>
                <Toast show={exitoDelete} onClose={toggleSuccessDelete} bg='success'>
                    <Toast.Header>
                        <strong>Operacion completada</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        Preparador eliminado con exito...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    const ErrorDeleteToast = () => {
        return(
            <Container>
                <Toast show={errorDelete} onClose={toggleErrorDelete} bg='success'>
                    <Toast.Header>
                        <strong>Error!</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        Error al eliminar preparador...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    const ErrorToast = () => {
        return(
            <Container fluid>
                <Toast show={error} onClose={toggleErrorToast} bg='danger'>
                    <Toast.Header>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        Error al guardar usuario...
                    </Toast.Body>
                </Toast>
            </Container>
        )
    }

    

    const PrepForm = memo(() => {
        return(
            <Container className='lista-crear-preps'>
                <h1>Crear preparadores</h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Label>
                            Nombre
                            <Form.Control
                            id='name'
                            required
                            size='sm'
                            type='text'
                            placeholder='nombre apellido'
                            ref={nombre}/>
                            </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Tipo de usuario
                            <Form.Control
                            id='tipo'
                            size='sm'
                            type='text'
                            defaultValue={tipo}
                            disabled/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Rut
                            <Form.Control
                            id='rut'
                            required
                            size='sm'
                            type='text'
                            placeholder='Rut sin puntos y con guion'
                            ref={rut}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email
                            <Form.Control
                            id='email'
                            required
                            size='sm'
                            type='email'
                            placeholder='*****@*****.***'
                            ref={email}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            celular
                            <Container className='cellInput'>
                                <p className='prefix'>+56</p>
                                <Form.Control
                                id='cell'
                                required
                                size='sm'
                                type='text'
                                placeholder='9 digitos'
                                ref={cell}/>
                            </Container>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Contraseña
                            <Form.Control
                            id='pass'
                            required
                            size='sm'
                            type='password'
                            placeholder='...'
                            ref={pass}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Equipo
                            <Form.Select
                            id='cod'
                            required
                            size='sm'
                            ref={cod_equipo}>
                                { equiposDisp.map( e => <option key={e.codigo} value={e.codigo} > {e.codigo} </option> ) }
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <p>Corrales en posesión</p>
                        <Container className='corrales-disp'>
                            {
                                corralesDisponibles.map( (c, i) => (
                                    <div className='corrales-inner' key={`crr${i}`}>
                                        <Form.Switch
                                        id={`c${i+1}`}
                                        value={c.cod_corral}
                                        label={c.cod_corral}
                                        onChange={handleCorralesCheck} />
                                    </div>
                                ) )
                            }
                        </Container>
                    </Form.Group>
                    <Form.Group className='btn-crear-prep' >
                        <Container>
                            <Button variant='success' type='submit'>Agregar preparador</Button>
                        </Container>
                    </Form.Group>
                </Form>
                {
                    exito ? <SuccessToast/> : null
                }
                {
                    error ? <ErrorToast/> : null
                }
            </Container>
        )
    })

    const PrepData = () => {
        return(
            <Container className='ficha-info'>
                
            </Container>
        )
    }

    // bloque micro componentes

    //bloque renderizado

    if(query.isError){
        return(
            <Container className='lista-caballos'>
                <h1>Error al cargar datos...<br/>Se recomiendo iniciar sesión nuevamente...</h1>
            </Container>
        )
    }
    
    return(
        <div className='preps-info'>
            
            <div className='enrolador'>
                { (query.isLoading || query.isFetching) ? 
                <Container className='justify-content-center' >
                    <Spinner variant='success' size='lg'/>
                </Container> : null }
                
            </div>
            <div className='enrolador'>
                { equiposDisp && queryData && corralesDisponibles ? <PrepForm/> : null}
            </div>
        </div>
    )
    

    //bloque renderizado
}