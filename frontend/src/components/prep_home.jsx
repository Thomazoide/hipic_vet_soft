import { useState, useEffect } from "react"
import { Col, Container, Dropdown, Row, Spinner } from "react-bootstrap"

export default function PrepHome({query}){
    //bloque variables

    const [corrales, setCorrales] = useState(null)
    const [vets, setVets] = useState(null)
    
    //bloque variables
    //bloque efectos

    useEffect( () => {
        if(query.data){
            const crls = query.data.corrales
            crls.forEach( c => {
                c.caballos = query.data.horses.filter( h => h.codigo_corral === c.cod_corral )
            } )
            setCorrales(crls)
            if(query.data.vets[0]){
                setVets(query.data.vets)
            }
        }
        if(corrales){
            console.log(corrales)
        }
    }, [query, corrales] )

    //bloque efectos
    //bloque microcomponentes
    //bloque microcomponentes
    //bloque renderizado

    if(query.isError || query.isFetchingError){
        return(
            <Container className="lista-caballos">
                <h3 className="text-warning"> Error al cargar datos... <br/>Se recomienda inciar sesión nuevamente. </h3>
            </Container>
        )
    }

    return(
        <Container className="preps'info">
            {query.isLoading ? <Spinner variant="success" size="sm"/> : null}
            {corrales ?  <Container className="lista-caballos"> 
            <h1>Corrales</h1>
            <hr/>
            <Container className="prepDash">
                <Row>
                    {
                        corrales.map( c => (
                            <Col key={c.cod_corral} >
                                <Container key={c.cod_corral} className="corral">
                                    <p> <strong className="text-primary" > {c.cod_corral} </strong> </p>
                                    <hr/>
                                    <p className="minititle" > Caballos: </p>
                                    {
                                        !c.caballos[0] ? <p className="text-warning"> Corral sin caballos... </p> : <>
                                            {
                                                c.caballos.map( h => (
                                                    <Container key={h.codigo_caballo} >
                                                        <p> Nombre: {h.nombre} </p>
                                                        <p> Propietario: {h.propietario} </p>
                                                        <p>Ficha creada:
                                                            {
                                                                !h.ficha[0] ? <strong className="text-danger"> No </strong> : <strong className="text-success"> Si </strong>
                                                            }
                                                        </p>
                                                    </Container>
                                                ) )
                                            }
                                        </>
                                    }
                                </Container>
                            </Col>
                        ) )
                    }
                </Row>
            </Container> </Container> : null }
        </Container>
    )

    //bloque renderizado
}