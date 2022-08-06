import React, { useState, useEffect, useContext, useReducer } from 'react'
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