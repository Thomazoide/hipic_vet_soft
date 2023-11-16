import {useState, useEffect, useRef} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import cfg from '../cfg.json'
import axios from 'axios'

export default function AdminPreps({query}){

    //bloque variables

    const [selectedPrep, setSelectedPrep] = useState({})
    const [renderizar, setRenderizar] = useState(false)
    const [exito, setExito] = useState(false)
    const [exitoDelete, setExitoDelete] = useState(false)
    const [error, setError] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)
    const tipo = 'preparador'
    const nombre = useRef(null)
    const rut = useRef(null)
    const email = useRef(null)
    const cell = useRef(null)
    const pass = useRef(null)
    const cod_equipo = useRef(null)
    const corrales_en_posesion = useRef(null)
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        const aux = {
            tipo: tipo,
            nombre: nombre.current.value,
            rut: rut.current.value,
            email: email.current.value,
            cell: cell.current.value,
            pass: pass.current.value,
            cod_equipo: cod_equipo.current.value,
        }
        try{
            let cep = corrales_en_posesion.current.value
            cep = cep.split(',')
            cep.forEach( x => x.trim() )
            aux.corrales_en_posesion = cep
        }catch(err){
            aux.corrales_en_posesion = [corrales_en_posesion.current.value]
        }
        try{
            await axios.post(cfg.ruta+'/api/users', aux, {headers: {Authorization: `Bearer ${user.token}`}}).then( res => {
                if(res.statusText === 'OK'){
                    setExito(true)
                    query.refetch()
                }
            } )
        }catch(err){
            console.log(err)
            setError(true)
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(cfg.ruta+'/api/users', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: selectedPrep
            }).then( res => {
                if(res.statusText === 'OK'){
                    setExitoDelete(true)
                    query.refetch()
                }
            } )
        }catch(err){
            console.log(err)
            setErrorDelete(true)
        }
    }

    const handleChangePrep = (event) => {
        let trgtRut = event.target.value
        for(let p of query.data){
            if(p.rut === trgtRut){
                setSelectedPrep(p)
            }
        }
    }

    //bloque funciones

    //bloque efectos

    useEffect( () => {
        if(Array.isArray(query.data)){
            setSelectedPrep(query.data[0])
            setRenderizar(true)
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

    const PrepForm = () => {
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
                        <Form.Label for='cell'>
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
                            Código de equipo
                            <Form.Control
                            id='cod'
                            required
                            size='sm'
                            type='text'
                            placeholder='...'
                            ref={cod_equipo}/>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Corrales en posesión    
                            <Form.Control
                            id='crr'
                            required
                            size='sm'
                            type='text'
                            placeholder='corral1, corral2, ... , corralN'
                            ref={corrales_en_posesion}/>
                        </Form.Label>
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
    }

    const PrepData = () => {
        return(
            <Container className='ficha-info'>
                <Container className='p-0 vert-btns' fluid>
                    <ButtonGroup vertical size='sm' className='p-0'>
                        {
                            query.data.map( prep => (
                                <Button variant='success' key={prep.rut} value={prep.rut} onClick={handleChangePrep} >{prep.nombre}</Button>
                            ) )
                        }
                    </ButtonGroup>
                </Container>
                <Container className='lista-preps'>
                    { exitoDelete ? <SuccessDeleteToast/> : null }
                    { errorDelete ? <ErrorDeleteToast/> : null }
                    <h1>{selectedPrep.nombre}</h1>
                    <p> Rut: {selectedPrep.rut} </p>
                    <p> Email: {selectedPrep.email} </p>
                    <p> Celular: {selectedPrep.cell} </p>
                    <p> Codigo de equipo: {selectedPrep.cod_equipo} </p>
                    <p> Corrales en posesión: 
                        {
                            selectedPrep.corrales_en_posesion.map( (c, i) => ( <i> {c}{ (i+1 == selectedPrep.corrales_en_posesion.length) ? null :  ','}  </i> ) )
                        } 
                    </p>
                    <hr/>
                    <Button variant='danger' onClick={handleDelete}>Eliminar preparador</Button>
                    <hr/>
                    <h2>Veterinarios</h2>
                    {
                        (selectedPrep.vets) ? selectedPrep.vets.map( vet => (
                            <Container key={vet.rut}>
                                <p className='minititle' > {vet.nombre} </p>
                                <p> Rut: {vet.rut} </p>
                                <hr/>
                            </Container>
                        ) ) : <Container>
                            { (selectedPrep.vets == null) ?
                                <p className='text-danger' > El preparador no posee veterinarios agregados al sistema... </p> : null
                            }
                            <hr/>
                        </Container>
                    }
                    <h3>Caballos</h3>
                    {
                        (selectedPrep.horses) ? selectedPrep.horses.map( horse => (
                            <div key={horse.codigo_caballo}>
                                <p className='minititle' > {horse.nombre} </p>
                                <p> Propietario: {horse.propietario} </p>
                                <p> Corral: {horse.codigo_corral} </p>
                                {
                                    (horse.ficha[0]) ? <p className='text-success'> 
                                    El caballo tiene una ficha creada </p> : <p className='text-danger'> 
                                    El caballo no tiene una ficha creada </p>
                                }
                                <hr/>
                            </div>
                        ) ) : <Container>
                            { (selectedPrep.horses == null) ?
                                <p className='text-danger'> El preparador no posee caballos agragados al sistema... </p> : null
                            }
                        </Container>
                    }
                </Container>
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
                { renderizar ? <PrepData/> : null }
            </div>
            <div className='enrolador'>
                <PrepForm/>
            </div>
        </div>
    )
    

    //bloque renderizado
}