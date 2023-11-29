import {useState, useEffect} from 'react'
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap'

export default function AdminHome({query}){
    const userData = (JSON.parse(localStorage.getItem('userData'))).usrData
    const [queryData, setQueryData] = useState(null)
    const [render, setRender] = useState(false)
    useEffect( () => {
        if(query){
            if(query.isFetched){
                setQueryData(query.data)
                setRender(true)
            }
        }
    }, [query] )

    return(
        <Container className='lista-caballos p-0'>
            <Container>
                <h4> Lista de equipos: </h4>
            </Container>
            {query.isLoading ? <Spinner variant='success'/> : null}
            {
                render && queryData ? <Container fluid>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 0 && i < 10){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 10 && i < 20){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 20 && i < 30){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 30 && i < 40){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 40 && i < 50){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                    <Row>
                        {
                            queryData.map( (e, i) => {
                                if(i >= 50 && i <= 59){
                                    return(
                                        <Col key={i} className='elemento'>
                                            {
                                                e.prep === 'open' ? <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Estado: <strong className='text-success'>Disponible</strong> </p>
                                                </> : <>
                                                    <p>Código: {e.codigo} </p>
                                                    <p>Prepardor: <strong> {e.prep[0].nombre} </strong> </p>
                                                    <hr/>
                                                    <p>
                                                        Corrales:  {
                                                            e.corrales.map( (c, i) => <strong key={c.cod_corral}>
                                                                {c.cod_corral}{(i < e.corrales.length-1) ? (', ') : null}
                                                            </strong> )
                                                        }
                                                    </p>
                                                    <hr/>
                                                    <p>Veterinarios: {e.vets.length} </p>
                                                    <hr/>
                                                    <p>Caballos: {e.horses.length} </p>
                                                </>
                                            }
                                        </Col>
                                    )
                                }else{
                                    return null
                                }
                            } )
                        }
                    </Row>
                </Container> : 
                null
            }
        </Container>
    )
}