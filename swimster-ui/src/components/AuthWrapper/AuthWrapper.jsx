import * as React from 'react'
import { Navigate } from 'react-router-dom'

export const AuthWrapper = ({ isAuthenticated }) => {
    return isAuthenticated ? (
        <Navigate replace to='/menu'/>
    ) : (
        <Navigate replace to='/login'/>
    )
}
