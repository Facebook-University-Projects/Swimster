import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'

const style = {
    navbar: 'bg-indigo-50 h-14',
    links: 'flex'
}

const Navbar = ({ handleLogout }) => {
    const { user } = useAuthContext()

    return (
        <div className={style.navbar}>
            <ul className={style.links}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user?.email ? (
                    <>
                    <li>
                        <span>{user.email}</span>
                    </li>
                    <li>
                        <span onClick={handleLogout}>Logout</span>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Sign Up</Link>
                    </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar
