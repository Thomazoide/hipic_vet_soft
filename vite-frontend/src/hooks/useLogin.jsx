import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import cfg from '../cfg.json'
import {jwtDecode} from 'jwt-decode'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (rut, pass) => {
        setIsLoading(true)
        setError(null)
        const res = await fetch(cfg.ruta+'/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rut, pass})
        })
        const json = await res.json()
        json.usrData = jwtDecode(json.token)
        if(!res.ok){
            setIsLoading(false)
            setError(json.detail)
        }
        if(res.ok){
            localStorage.setItem('userData', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}