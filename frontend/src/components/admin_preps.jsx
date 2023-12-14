import {useState, useEffect, useRef, memo, useMemo} from 'react'
import { Container, Button, Form, Spinner, ButtonGroup, Toast, Dropdown } from 'react-bootstrap'
import { useAuthContext } from '../hooks/useAuthContext'
import {validate, format} from 'rut.js'
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
    const [tipo, setTipo] = useState('preparador')
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
        e.stopPropagation()
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
                    plantilla.selected = plantilla.selected.filter( c => c !== e.target.value )
                    if(plantilla.selected.length < 3) setDisableChecks(false)
                    console.log(plantilla)
                    SetCorrales_en_posesion(plantilla)
                }
            }else if( !e.target.checked && plantilla.selected.filter( c => c === e.target.value )[0] ){
                plantilla.selected = plantilla.selected.filter( c => c !== e.target.value )
                if(plantilla.selected.length < 3) setDisableChecks(false)
                console.log(plantilla)
                SetCorrales_en_posesion(plantilla)
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const plantilla= {
            nombre: nombre.current.value,
            tipo: tipo,
            rut: rut.current.value,
            email: email.current.value,
            cell: cell.current.value,
            pass: pass.current.value,
            cod_equipo: (tipo === 'preparador') ? cod_equipo.current.value : (tipo === 'admin') ? 'admin' : 'open',
            corrales_en_posesion: (tipo === 'preparador') ? corrales_en_posesion.selected : []
        }
        try{
            await axios.post(cfg.ruta+'/api/users', plantilla, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
        }catch(err){
            setError(true)
            query.refetch()
        }
        console.log(plantilla)
        
    }

    const handleTeamChange = async (e) => {
        const changeData = e.split('_')
        try{
            const reqBody = {
                nt: changeData[0],
                rut: changeData[1]
            }
            console.log(reqBody)
            await axios.patch(cfg.ruta+'/api/users', reqBody, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
        }catch(err){
            setError(true)
            query.refetch()
        }
    }

    const horseTeamChange = async (e) => {
        try{
            const data = e.split('_')
            const reqBody = {
                nt: data[0],
                codigo_caballo: data[1]
            }
            await axios.put(cfg.ruta+'/api/caballos', reqBody, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
        }catch(err){
            setError(true)
            query.refetch()
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(cfg.ruta+'/api/users', {headers: {Authorization: `Bearer ${user.token}`}, data: selectedPrep})
            await axios.patch(cfg.ruta+'/api/caballos', selectedPrep, {headers: {Authorization: `Bearer ${user.token}`}})
            setExito(true)
            query.refetch()
        }catch(err){
            setError(true)
            query.refetch()
        }
    }

    const handleChangePrep = (event) => {
        const valor = event.target.value
        
        if(valor === 'openVets'){
            const plantilla = {
                tipo: valor,
                vets: queryData[61]
            }
            setSelectedPrep(plantilla)
        }else if(valor === 'openHorses'){
            const plantilla = {
                tipo: valor,
                horses: queryData[62]
            }
            setSelectedPrep(plantilla)
        }else{
            equipos.forEach( t => {
                if(t.codigo === valor){
                    setSelectedPrep(t)
                }
            } )
        }
    }

    const onSelectTipo = (e) => {
        console.log(e)
        setTipo(e)
    }

    //bloque funciones

    //bloque efectos

    useEffect( () => {
        if(query){
            if(query.isFetched){
                console.log(query.data)
                setQueryData(query.data)
                let arr = query.data.filter( e => (e.prep != 'open' && !Array.isArray(e) ) )
                let ed = query.data.filter( e => e.prep === 'open' )
                setCorralesDisponibles(query.data[60])
                if(ed[0]){
                    setEquiposDisp(ed)
                }
                if(arr[0]){
                    arr.forEach( t => t.tipo = 'team' )
                    console.log(arr)
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
                        Operación realizada con éxito...
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
                        Error en la operación...
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
                            <Dropdown onSelect={onSelectTipo}>
                                <Dropdown.Toggle variant='light'>
                                    {tipo}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={'preparador'} >Preparador</Dropdown.Item>
                                    <Dropdown.Item eventKey={'veterinario'}>Veterinario</Dropdown.Item>
                                    <Dropdown.Item eventKey={'admin'}>Admin</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                    { tipo === 'preparador' ? <Form.Group>
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
                    </Form.Group> : null}
                    { tipo === 'preparador' ? <Form.Group>
                        <p>Corrales en posesión <br/> <small> Máximo 3... </small> </p>
                        <Container className='corrales-disp'>
                            {
                                corralesDisponibles.map( (c, i) => (
                                    <div className='corrales-inner' key={`crr${i}`}>
                                        <Form.Switch
                                        id={`c${i+1}`}
                                        value={c.cod_corral}
                                        label={c.cod_corral}
                                        onChange={handleCorralesCheck}/>
                                    </div>
                                ) )
                            }
                        </Container>
                    </Form.Group> : null}
                    <Form.Group className='btn-crear-prep' >
                        <Container>
                            <Button variant='success' type='submit'>Agregar usuario</Button>
                        </Container>
                    </Form.Group>
                </Form>
                
            </Container>
        )
    })

    const PrepData = () => {
        return(
            <div className='ficha-info'>
                {
                    selectedPrep && equipos ? <>
                        <div className='vert-btns'>
                            <ButtonGroup vertical>
                                {
                                    equipos.map( e => <Button variant='outline-success' key={e.codigo} value={e.codigo} onClick={handleChangePrep}>
                                        {e.codigo}
                                    </Button> )
                                }
                                <Button variant='outline-success' key={'openVets'} value={'openVets'} onClick={handleChangePrep}>Veterinarios sin equipo</Button>
                                <Button variant='outline-success' key={'openHorses'} value={'openHorses'} onClick={handleChangePrep}>Caballos sin equipo</Button>
                            </ButtonGroup>
                        </div>
                        { selectedPrep.tipo === 'team' ? <div className='lista-preps'>
                            <h1> {selectedPrep.prep[0].nombre} </h1>
                            <p> Rut: {selectedPrep.prep[0].rut} </p>
                            <p> Email: {selectedPrep.prep[0].email} </p>
                            <p> Celular: {selectedPrep.prep[0].cell} </p>
                            <p> Corrales: { selectedPrep.corrales.map( (c, i) => <strong key={i} > {c.cod_corral}{ i<selectedPrep.corrales.length-1 ? (',') : null }  </strong> ) } </p>
                            <hr/>
                            <Button variant='outline-danger' onClick={handleDelete}>Eliminar equipo</Button>
                            <hr/>
                            <p className='minititle'>Veterinarios</p>
                            {
                                !selectedPrep.vets[0] ? <> <p className='text-warning'>Sin veterinarios registrados</p> <hr/> </> : <>
                                    {
                                        selectedPrep.vets.map( vet => <Container key={vet.rut} >
                                            <p className='minititle' > {vet.nombre} </p>
                                            <p> Rut: {vet.rut} </p>
                                            <p> Email: {vet.email} </p>
                                            <p> Celular: {vet.cell} </p>
                                            <Container>
                                                Equipo: <Dropdown onSelect={handleTeamChange}>
                                                    <Dropdown.Toggle variant='outline-warning' size='sm'>
                                                        Cambiar de equipo
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            equipos.map( eq => (
                                                                <Dropdown.Item disabled={eq.codigo === vet.cod_equipo ? (true) : false} key={eq.codigo} eventKey={`${eq.codigo}_${vet.rut}`} >
                                                                    {eq.codigo}
                                                                </Dropdown.Item>
                                                            ) )
                                                        }
                                                        <Dropdown.Item eventKey={`open_${vet.rut}`}>
                                                            Sin equipo
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Container>
                                            <hr/>
                                        </Container> )
                                    }
                                </>
                            }
                            <p className='minititle'>Caballos</p>
                            {
                                !selectedPrep.horses[0] ? <p className='text-warning'>Sin caballos registrados</p> : <>
                                    {
                                        selectedPrep.horses.map( h => <Container key={h.codigo_caballo} >
                                            <p className='minititle'> {h.nombre} </p>
                                            <p> Propietario: {h.propietario} </p>
                                            <p> Código: {h.codigo_caballo} </p>
                                            <p> Corral: {h.codigo_corral} </p>
                                            <p> Ficha médica: { h.ficha[0] ? <strong className='text-success'> Si </strong> : <strong className='text-danger'> No </strong> } </p>
                                            <Container>
                                                Equipo: <Dropdown onSelect={horseTeamChange}>
                                                    <Dropdown.Toggle variant='outline-warning' size='sm'>
                                                        Cambiar de equipo
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            equipos.map( eq => (
                                                                <Dropdown.Item disabled={eq.codigo === h.codigo_equipo ? (true) : false} key={eq.codigo} eventKey={`${eq.codigo}_${h.codigo_caballo}`} >
                                                                    {eq.codigo}
                                                                </Dropdown.Item>
                                                            ) )
                                                        }
                                                        <Dropdown.Item eventKey={`open_${h.codigo_caballo}`}>
                                                            Sin equipo
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Container>
                                            <hr/>
                                        </Container> )
                                    }
                                </>
                            }
                        </div> : selectedPrep.tipo === 'openVets' ? <div className='lista-preps'>
                            <h1>Veterinarios sin equipo</h1>
                            <hr/>
                            {
                                !selectedPrep.vets[0] ? <> <h3 className='text-warning'> No hay veterinarios sin equipo... </h3></>
                                : selectedPrep.vets.map( v => (
                                    <Container key={v.rut}>
                                        <p className='minititle'> {v.nombre} </p>
                                        <p>Rut: {v.rut} </p>
                                        <p>Email: {v.email} </p>
                                        <p>Celular: {v.cell} </p>
                                        <hr/>
                                        <Dropdown onSelect={handleTeamChange}>
                                            <Dropdown.Toggle variant='outline-warning' size='sm'>
                                                Asignar equipo
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    equipos.map( t => (
                                                        <Dropdown.Item key={t.codigo} eventKey={`${t.codigo}_${v.rut}`} >
                                                            {t.codigo}
                                                        </Dropdown.Item>
                                                    ) )
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <hr/>
                                        <Button variant='outline-danger'>Eliminar usuario</Button>
                                        <hr/>
                                    </Container>
                                ) )
                            }
                        </div>
                        : selectedPrep.tipo === 'openHorses' ? <div className='lista-preps'>
                            <h1>Caballos sin equipo</h1>
                            <hr/>
                            {
                                !selectedPrep.horses[0] ? <h3 className='text-warning'>No hay caballos sin equipo... </h3>
                                : selectedPrep.horses.map( h => (
                                    <Container key={h.codigo_caballo}>
                                        <p className='minititle'> {h.nombre} </p>
                                        <p> Propietario: {h.propietario} </p>
                                        <p> Código: {h.codigo_caballo} </p>
                                        <p> Corral: {h.codigo_corral} </p>
                                        <p> Ficha médica: { h.ficha[0] ? <strong className='text-success'> Si </strong> : <strong className='text-danger'> No </strong> } </p>
                                        <hr/>
                                        <Dropdown onSelect={horseTeamChange}>
                                            <Dropdown.Toggle variant='outline-warning' size='sm'>
                                                Asignar equipo
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    equipos.map( t => (
                                                        <Dropdown.Item key={t.codigo} eventKey={`${t.codigo}_${h.codigo_caballo}`}>
                                                            {t.codigo}
                                                        </Dropdown.Item>
                                                    ) )
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <hr/>
                                        <Button variant='outline-danger'>Eliminar usuario</Button>
                                        <hr/>
                                    </Container>
                                ) )
                            }
                        </div> : null }
                    </> : null
                }
            </div>
        )
    }

    // bloque micro componentes

    //bloque renderizado

    if(query.isError){
        return(
            <Container className='lista-caballos'>
                <h1>Error al cargar datos...<br/>Se recomienda iniciar sesión nuevamente...</h1>
            </Container>
        )
    }
    
    return(
        <div className='preps-info'>
            {
                exito ? <SuccessToast/> : null
            }
            {
                error ? <ErrorToast/> : null
            }
            <div className='enrolador'>
                { (query.isLoading || query.isFetching) ? 
                <Container className='justify-content-center' >
                    <Spinner variant='success' size='lg'/>
                </Container> : null }
                { renderizar ? <PrepData/> : null }
            </div>
            <div className='enrolador'>
                { equiposDisp && queryData && corralesDisponibles ? <PrepForm/> : null}
            </div>
        </div>
    )
    

    //bloque renderizado
}