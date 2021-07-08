import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { useHistory, Link } from 'react-router-dom';
import { ReactComponent as AuthSvg } from '../../svgImage/chat2.svg'

export const Login = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [user, setUser] = useState({
        email: "",
        password: "",
        errors: {}
    })
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password1: '',
    //     textChange: 'Sign In'
    // });
    // const { email, password1, textChange } = formData;
    // const handleChange = text => e => {
    //     setFormData({ ...formData, [text]: e.target.value });
    // };

    const handleSubmit = async () => {
        await props.loginUser({ email: emailRef.current.value, password: passwordRef.current.value });
    }

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (props.errors) {
            setUser({ ...user, errors: props.errors })
        }
    }, [props.auth])
    return (
        <div className="bg-gray-400 pt-14" style={{ minHeight: "calc(100vh - 64px)", height: "fit-content" }}>
            <div className="relative max-w-max sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto max-w-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-lg bg-gray-300">
                    <div className="pt-10 pb-5 px-10 col-span-1 lg:col-span-2">
                        <div className="my-2">
                            <div className="text-gray-700 font-bold text-2xl text-center mt-2">Login for HelloTalks</div>
                        </div>
                        <div className="py-2 mt-1 md:mt-10">
                            {
                                (props.errors && (props.errors.incorrectPass || props.errors.emailnotfound)) ? (
                                    <div className="mt-0 md:-mt-4 w-full text-center rounded-md bg-red-200 p-1">
                                        <span className="w-full text-red-600 text-center text-sm font-medium">{(props.errors.incorrectPass) || (props.errors.emailnotfound)}</span>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                            <div className="my-7">
                                <input type="email" placeholder="Email" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" ref={emailRef} />
                            </div>
                            <div className="my-7">
                                <input type="password" placeholder="Password" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" ref={passwordRef} />
                            </div>
                            <div className="my-7">
                                <button type="submit" className="rounded-md w-full py-3 px-4 focus:outline-none text-base font-semibold bg-gray-800 text-white tracking-wider" onClick={handleSubmit}>Login</button>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-9 gap-2 mb-5">
                            <span className="col-span-3 w-full bg-gray-500 my-2" style={{ borderRadius: "30%", height: "1px" }}>
                            </span>
                            <span className="col-span-3 uppercase text-xs font-semibold text-gray-600 tracking-wider text-center underline"><Link to="/register">or signup</Link></span>
                            <span className="col-span-3 w-full bg-gray-500 my-2" style={{ borderRadius: "30%", height: "1px" }}>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3 p-10 hidden md:block bg-white" style={{ borderRadius: "0 0.5rem 0.5rem 0" }}>
                        <AuthSvg className="fit-cover h-full w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login)
