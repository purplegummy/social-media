import React, {useEffect, useContext, useReducer } from 'react'
import axios from 'axios';


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);

}
export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthProvider = ({children}) => {
    useEffect(() => {
        if (localStorage.getItem('user')){
        axios.get('http://localhost:4000/api/users/me', {headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }}).then((res) => {
            if (res.status === 200){
                dispatch({type:'LOGIN', payload: res.data});
            }
            const token = JSON.parse(localStorage.getItem('user')).token;
            const newUser = {token: token, ...res.data};
            localStorage.setItem('user', JSON.stringify(newUser));
        }).catch((err) => {
            console.log(err);
        })  
    }
    }, []);
    const [state,dispatch] = useReducer(authReducer, {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null
    })

    const value = {
        ...state,
        dispatch,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}