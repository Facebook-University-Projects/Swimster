import * as React from 'react'
import { Link } from 'react-router-dom'
import { useRegistrationForm } from '../../hooks/useRegistrationForm'
import { AddressSearchInput } from '../AddressSearchInput/AddressSearchInput'
import { style } from './style'

const Register = () => {
    const { setIsValidAddress, isSubmitProcessing, register, setValue, handleSubmit, onSubmit } = useRegistrationForm()

    return (
        <div className={style.register}>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>First of Many.</h1>
                <form className={style.userDetails} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="First"
                        {...register("firstName", {
                            required: true
                        })}
                    />
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="Last"
                        {...register("lastName", {
                            required: true
                        })}
                    />
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
                    <AddressSearchInput
                    styling={`${style.inputElement} ${style.fullInput}`}
                    setValue={setValue}
                    setIsValidAddress={setIsValidAddress}
                    />
                    <input
                        className={style.inputElement}
                        type="tel"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                            required: true
                        })}
                    />
                    <input
                        className={style.inputElement}
                        type="date"
                        placeholder="Date of Birth"
                        {...register("dateOfBirth", {
                            required: true
                        })}
                    />
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput} !mt-10`
                        }
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: true
                        })}
                    />
                    <p className={style.toLogin}>
                        Already have an account? <Link to="/login"><span className={style.loginLink}>Log in.</span></Link>
                    </p>
                    <input type="submit" className={style.submitButton} value="Sign Up"/>
                </form>
            </div>
        </div>
    )
}

export default Register
