import { useState } from "react"
import { useAuthContext } from "./useLoginContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (rut, pass) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('http://localhost:4444/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({rut, pass})
        })
        console.log(response)
        const json = await response.json()
        console.log(json)
        
        if(!response.ok){
            setIsLoading(false)
            setError(json.detail)
        }
        if(response.ok){
            localStorage.setItem('userData', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}