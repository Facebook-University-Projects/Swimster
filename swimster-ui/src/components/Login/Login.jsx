import * as React from 'react'
import { style } from './style'

const Login = () => {
    return (
        <div className={style.register}>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>Welcome Back!</h1>
                <br></br>
                <div className={style.userDetails}>
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="text"
                        placeholder="Password"
                    />
                </div>
                <br></br>
                <br></br>
                <button className={style.submitButton}>Sign Up</button>
                <br></br>
                <p className={style.toLogin}>
                        Don't have an account? <span className={style.loginLink}>Sign up for free.</span>
                </p>
            </div>
        </div>
    )
}

export default Login
