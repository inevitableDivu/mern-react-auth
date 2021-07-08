import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { loginUser } from "../../actions/authActions";
import { ReactComponent as AuthSvg } from '../../svgImage/chat2.svg'


export const Register = (props) => {
    const emailRef = useRef();
    const passRef = useRef();
    const pass2Ref = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const descRef = useRef();
    const langRef = useRef();
    const history = useHistory();

    const [formData, setFormData] = useState({
        country: '',
    })

    const { country } = formData;
    const [data, setData] = useState([])

    const handleChange = text => e => {
        e.preventDefault();
        setFormData({ ...formData, [text]: e.target.value })
    }

    const handleSubmit = () => {
        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
            password2: pass2Ref.current.value,
            country: formData.country,
            language: langRef.current.value,
            phone: phoneRef.current.value,
            desc: descRef.current.value,
        }
        props.registerUser(userData, history)
    }
    const handleSecondForm = () => {
        document.getElementById('firstRegisterBlock').classList.add('hidden')
        document.getElementById('secondRegisterBlock').classList.remove('hidden')
    }
    const handleThirdForm = () => {
        document.getElementById('secondRegisterBlock').classList.add('hidden')
        document.getElementById('thirdRegisterBlock').classList.remove('hidden')
    }
    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(res => res.json())
            .then(data => { setData(data) })
    }, [])

    function FirstBlock() {
        return (
            <div className="transition-all duration-400" id="firstRegisterBlock">
                <div className="my-7">
                    <input type="name" ref={nameRef} placeholder="Name" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="my-7">
                    <input type="email" ref={emailRef} placeholder="Email" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="my-7">
                    <select
                        className={(formData.country) ? "bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" : "bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold text-gray-500"}
                        onChange={handleChange('country')}
                        value={formData.country}
                        style={{ appearance: "none" }}
                    >
                        <option className="text-gray-500" value="none">Select Your Country</option>
                        {
                            data.map(items => (
                                <option id={items.name} className="text-gray-800 font-semibold tracking-wide text-sm px-2 py-1 mx-2 rounded-sm hover:bg-gray-200" value={items.name}>{items.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="my-7">
                    <button type="submit" id="nextRegisterBtn" onClick={handleSecondForm} className="rounded-md w-full py-3 px-4 focus:outline-none text-base font-semibold bg-gray-800 text-white tracking-wider">Continue</button>
                </div>
            </div>
        )
    }
    function SecondBlock() {
        return (
            <div className="mt-2 hidden" id="secondRegisterBlock">
                <div className="my-7">
                    <input type="text" ref={descRef} id="descId" placeholder="Description" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="my-7">
                    <input type="language" ref={langRef} placeholder="Language" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="my-7">
                    <input type="tel" ref={phoneRef} id="phonenoId" placeholder="Phone Number" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" style={{ appearance: "textfield" }} />
                </div>
                <div className="my-7">
                    <button type="submit" id="lastRegisterBtn" className="rounded-md w-full py-3 px-4 focus:outline-none text-base font-semibold bg-gray-800 text-white tracking-wider" onClick={handleThirdForm}>Continue</button>
                </div>
            </div>
        )
    }
    function ThirdBlock() {
        return (
            <div className="mt-2 hidden" id="thirdRegisterBlock">
                <div className="my-7">
                    <input type="password" ref={passRef} placeholder="Password" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="my-7">
                    <input type="password" ref={pass2Ref} placeholder="Confirm Password" className="bg-white rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base font-semibold" />
                </div>
                <div className="mt-24 pt-2 mb-7">
                    <button type="submit" id="nextRegisterBtn" onClick={handleSubmit} className="rounded-md w-full py-3 px-4 focus:outline-none text-base font-semibold bg-gray-800 text-white tracking-wider">Sign Up</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="bg-gray-400 pt-14 lg:pt-11" style={{ minHeight: "calc(100vh - 64px)", height: "fit-content" }}>
                <div className="relative max-w-max sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto max-w-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-lg bg-gray-300">
                        <div className="pt-10 pb-5 px-10 col-span-1 lg:col-span-2">
                            <div className="my-2">
                                <div className="text-gray-700 font-bold text-2xl text-center mt-2">Register for HelloTalks</div>
                            </div>
                            <div className="py-2 mt-2 md:mt-3 relative">
                                <FirstBlock />
                                <SecondBlock />
                                <ThirdBlock />
                            </div>
                            <div className="w-full grid grid-cols-9 gap-2 mb-5">
                                <span className="col-span-3 w-full bg-gray-500 my-2" style={{ borderRadius: "30%", height: "1px" }}>
                                </span>
                                <span className="col-span-3 uppercase text-xs font-semibold text-gray-600 tracking-wider text-center underline"><Link to="/login">or Login</Link></span>
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
        </div>
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { registerUser, loginUser }
)(withRouter(Register));
