import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { useListingsContext } from '../../contexts/listings'
import { useNavigate } from 'react-router-dom'
import { style } from './style'

const Navbar = () => {
    const { handlers: authHandlers, user } = useAuthContext()
    const { handlers: listingsHandlers } = useListingsContext()
    const navigate = useNavigate()

    // TODO: implement clearing all of the context data
    const handleFullLogout = () => {
        authHandlers.logoutUser()
        navigate('/login')
    }

    return (
        <div className={style.navbar}>
            <Link to="/menu">
                <div className={style.logoContainer}>
                    <img className={style.logoImg} src="https://www.kindpng.com/picc/m/156-1565640_transparent-pool-party-png-transparent-background-pool-float.png" alt="" />
                    <h1 className={style.logoTitle}>Swimster</h1>
                </div>
            </Link>
            <div className={style.links}>
                {user?.email ? (
                    <>
                        <Link to="/createpool">
                            <button className={style.linkButton}>
                                List your Pool
                            </button>
                        </Link>
                        <h3 className={style.link}>
                            Hey {user.firstName}!
                        </h3>
                        <button className={style.linkButton} onClick={handleFullLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className={style.linkButton}>
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className={style.linkButton}>
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
