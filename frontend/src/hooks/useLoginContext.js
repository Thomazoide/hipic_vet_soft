import {AuthContext} from './../context/authContext'
import {useContext} from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error('useAuthContext debe ser usado dentro de AuthContextProvider')
    }
    return context
}