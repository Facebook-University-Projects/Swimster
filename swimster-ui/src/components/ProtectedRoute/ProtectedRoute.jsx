import Login from '../Login/Login'
import { useAuthContext, isUserAuthenticated } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ element }) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const isAuthenticated = isUserAuthenticated(user)

    // if user is not authenticated on a protected route
    // navigate them to the login page
    if (!isAuthenticated) {
        return <Login />
    }

    return (
        <>
            {element}
        </>
    )
}

export default ProtectedRoute
