import {createContext, useReducer, useEffect} from 'react'
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
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const verifyToken = async (userData) => {
        let stts = 0
        try{
            const response = await axios.put('http://localhost:4444/api/login', userData)
            if(response){
                console.log(response)
                dispatch({type: 'LOGIN', payload: userData})
            }
        }catch(err){
            console.log(err.response)
            localStorage.removeItem('userData')
        }
    }

    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('userData'))
        console.log(user)
        if(user){
            verifyToken(user)
        }
    }, [] )

    console.log('AC state: ', state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}