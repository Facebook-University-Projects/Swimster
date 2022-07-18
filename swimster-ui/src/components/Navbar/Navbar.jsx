import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth'
import { style } from './style'

const Navbar = ({ handleLogout }) => {
    const { user } = useAuthContext()

    return (
        <div className={style.navbar}>
            <Link to="/">
                <div className={style.logoContainer}>
                    <img className={style.logoImg} src="https://www.kindpng.com/picc/m/156-1565640_transparent-pool-party-png-transparent-background-pool-float.png" alt="" />
                    <h1 className={style.logoTitle}>Swimster</h1>
                </div>
            </Link>
            <div className={style.links}>
                {user?.email ? (
                    <>
                        <button className={style.linkButton}>
                            List your Pool
                        </button>
                        <h3 className={style.link}>
                            Hey {user.firstName}!
                        </h3>
                        <button className={style.linkButton} onClick={handleLogout}>
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
