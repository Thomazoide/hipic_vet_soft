import {useEffect, useState} from 'react'
import {Button, Container, Spinner} from 'react-bootstrap'

export default function Notificaciones({query}){
    const [render, setRender] = useState(false)
    const [notList, setNotList] = useState([])
    useEffect( ()=>{
        if(query.data){
            if(query.data.notificaciones[0]){
                console.log(query.data.notificaciones)
                setNotList(query.data.notificaciones)
                setRender(true)
            }
        }
    }, [query] )

    if(query.isError || query.isLoadingError){
        return(
            <Container className='lista-caballos'>
                <h3 className='text-waning'>Error al cargar datos<br/> se recomienda iniciar sesión nuevamente...</h3>
            </Container>
        )
    }

    return(
        <Container className='lista-caballos'>
            {
                (query.isLoading || query.isFetching) ? <Spinner variant='success'/> : null
            }
            {
                render ? <Container>
                    {
                        notList.map( n => (
                            <Container key={n.titulo}>
                                <Container className='justify-content-*-between'>
                                    <Container>
                                        <p className='minititle'>
                                            {n.titulo}
                                        </p>
                                    </Container>
                                    <Container>
                                        <p>Fecha: { n.fecha } </p>
                                    </Container>
                                </Container>
                                <p> {n.descripcion} </p>
                                <hr/>
                            </Container>
                         ) )
                    }
                </Container> : <Container className='lista-caballos'>
                    <h3 className='text-primary'>No hay notficaciones para mostrar...</h3>
                </Container>
            }
        </Container>
    )
}