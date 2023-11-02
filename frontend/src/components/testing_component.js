import { useEffect } from 'react'
import { useQuery, useQueries } from 'react-query'
import {Container, Spinner} from 'react-bootstrap'
import { useAuthContext } from '../hooks/useLoginContext'
import axios from 'axios'



function TestingComp(){
    const {user} = useAuthContext()
    const horses = useQuery({
        queryKey: ['horses'],
        queryFn: async () => {
            if(user || user != 'null'){
                const hsData =  (await axios.get('http://localhost:4444/api/caballos', {headers: {Authorization: `Bearer ${user.token}`}})).data
                console.log(hsData)
                return hsData
            }else{
                const errJson = {
                    error: 'Sin token existente'
                }
                return errJson
            }
        }
    })

    const arrayData = useQueries({
        queries: [
            {
                queryKey: ['users', 1],
                queryFn: async () => {
                    const res = (await axios.get('http://localhost/4444/api/users', {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })).data
                    return res
                }
            },
            {
                queryKey: ['fichas', 2],
                queryFn: async () => {
                    const res = (await axios.get('http://localhost:4444/api/fichas', {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }))
                    return res
                }
            }
        ]
    })

    useEffect( () => {
        console.log(arrayData)
    }, arrayData )

    
}

export default TestingComp