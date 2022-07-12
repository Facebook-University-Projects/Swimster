import * as React from 'react'
import { style } from './style'

const Register = () => {
    return (
        <div className={style.register}>
            <div className={style.formContainer}>
                <h1 className={style.formHeader}>First of Many.</h1>
                <div className={style.userDetails}>
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="First"
                    />
                    <input
                        className={style.inputElement}
                        type="text"
                        placeholder="Last"
                    />
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
                        type=""
                        placeholder="Address"
                    />
                    <input
                        className={style.inputElement}
                        type="tel"
                        placeholder="Phone Number"
                    />
                    <input
                        className={style.inputElement}
                        type="date"
                        placeholder="Date of Birth"
                    />
                    <br></br>
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="text"
                        placeholder="Password"
                    />
                    <input
                        className={
                            `${style.inputElement} ${style.fullInput}`
                        }
                        type="text"
                        placeholder="Confirm Password"
                    />
                    <p className={style.toLogin}>
                        Already have an account? <span className={style.loginLink}>Log in.</span>
                    </p>
                </div>
                <br></br>
                <button className={style.submitButton}>Sign Up</button>
            </div>
        </div>
    )
}

export default Register
