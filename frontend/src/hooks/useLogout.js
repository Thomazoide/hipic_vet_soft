import { useAuthContext } from "./useLoginContext"

export const useLogout = () => {

    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('userData')
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}