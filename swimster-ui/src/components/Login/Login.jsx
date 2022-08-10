import * as React from 'react'
import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/useLoginForm'
import { style } from './style'
import { Loader } from '../Loader/Loader'

const Login = () => {
    const { isSubmitProcessing, register, handleSubmit, onSubmit } = useLoginForm()

    return (
        <div className={style.login}>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>Welcome Back!</h1>
                <form className={style.userDetails} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="text"
                        placeholder="Email"
                        {...register("email", {
                            required: true
                        })}
                    />
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <button type="submit" className={style.submitButton}>
                        {isSubmitProcessing ? <Loader height={"26"} width={"26"}/> : "Login"}
                    </button>
                </form>
                <p className={style.toLogin}>
                        Don't have an account? <Link to="/register"><span className={style.loginLink}>Sign up for free.</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Login
