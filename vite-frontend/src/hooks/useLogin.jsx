import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import cfg from '../cfg.json'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (rut, pass) => {
        setIsLoading(true)
        setError(null)
        const res = await axios.post((cfg.ruta+'/api/login'), {rut: rut, pass: pass})
        if(res.statusText === 'OK'){
            const json = await res.data
            json.usrData = jwtDecode(json.token)
            console.log(json)
            localStorage.setItem('userData', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }else{
            setIsLoading(false)
            setError(json)
        }
    }
    return {login, isLoading, error}
}