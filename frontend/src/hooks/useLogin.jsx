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
        try{
            await axios.post(cfg.ruta+'/api/login', {rut: rut, pass: pass}).then( res => {
                if(res.status === 200){
                    let pl = res.data
                    pl.usrData = jwtDecode(pl.token)
                    localStorage.setItem('userData', JSON.stringify(pl))
                    dispatch({type: 'LOGIN', payload: pl})
                    setIsLoading(false)
                }else{
                    console.log(res)
                }
            } )
        }catch(err){
            setError(err.response.data.detail)
        }
    }
    return {login, isLoading, error}
}