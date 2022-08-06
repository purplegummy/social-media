import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export const PrivateRoute = ({children}) => {
  const {user} = useAuth();
  if (!user){
    return <Navigate to='/'></Navigate>
  }

  return children;
}
