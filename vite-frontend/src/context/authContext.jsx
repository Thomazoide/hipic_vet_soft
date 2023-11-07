import {createContext, useReducer, useEffect} from 'react'
import cfg from '../cfg.json'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null})

    const verifyToken = async (userData) => {
        try{
            const res = await axios.put((cfg.ruta+'/api/login'), userData)
            if(res){
                dispatch({type: 'LOGIN', payload: userData})
            }
        }catch(err){
            console.log(err.response)
            localStorage.removeItem('userData')
            dispatch({type: 'LOGOUT'})
        }
    }

    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('userData'))
        if(user){
            verifyToken(user)
        }
    }, [] )

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}