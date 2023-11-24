import {useState, useEffect} from 'react'
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap'

export default function AdminHome({query}){
    const userData = (JSON.parse(localStorage.getItem('userData'))).usrData
    const [queryData, setQueryData] = useState(null)
    const [render, setRender] = useState(false)
    useEffect( () => {
        if(query){
            if(query.isFetched){
                console.log(query.data)
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
                    <Row key='row1'>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 0 && i < 10) ? <Col className='elemento' key={`Col${i}`} >
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Preparador: <strong className='text-dark'> {e.prep.nombre} </strong> </p>
                                            <p> Corrales: { e.corrales.map( c => <strong key={c.cod_corral} > {c.cod_corral}, </strong> )  } </p>
                                            <p> {e.vets.length} veterinarios </p>
                                            <p> {e.horses.length} caballos </p>
                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                    <Row key={'row2'}>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 10 && i < 20) ? <Col className='elemento' key={i}>
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>

                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                    <Row key={'row3'}>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 20 && i < 30) ? <Col className='elemento' key={i}>
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>

                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                    <Row key={'row4'}>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 30 && i < 40) ? <Col className='elemento' key={i}>
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>

                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                    <Row key={'row5'}>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 40 && i < 50) ? <Col className='elemento' key={i}>
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>

                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                    <Row key={'row6'}>
                        {
                            queryData.map( (e, i) => (
                                <>
                                    { (i >= 50 && i <= 59) ? <Col className='elemento' key={i}>
                                        { e.prep === 'open' ? <>
                                            <p> Código: {e.codigo} </p>
                                            <p> Estado: <strong className='text-success'> Disponible </strong> </p>
                                        </> : <>

                                        </> }
                                    </Col> : null }
                                </>
                            ) )
                        }
                    </Row>
                </Container> : 
                null
            }
        </Container>
    )
}