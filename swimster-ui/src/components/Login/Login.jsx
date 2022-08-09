import * as React from 'react'
import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/useLoginForm'
import { style } from './style'

const Login = () => {
    const { errors, isSubmitProcessing, register, handleSubmit, onSubmit } = useLoginForm()

    return (
        <div className={style.login}>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>Welcome Back!</h1>
                <form className={style.userDetails} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true
                        })}
                    />
                    {errors.email && <p className={"text-md text-red-400"}>email required</p>}
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
                    {errors.password && <p className={"text-md text-red-400"}>password required</p>}
                    <input type="submit" className={style.submitButton} value="Login" />
                </form>
                <p className={style.toLogin}>
                        Don't have an account? <Link to="/register"><span className={style.loginLink}>Sign up for free.</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Login
