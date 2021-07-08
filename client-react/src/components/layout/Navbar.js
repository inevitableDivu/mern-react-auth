import React, { useRef, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from 'react-router-dom'

function Navbar({ auth, logoutUser }) {

    // console.log(props, " ")
    const { user } = auth;
    const dropdown = useRef();
    function handleUserMenu() {
        document.getElementById('menuBox').classList.toggle('active')
    }

    function onLogoutClick(e) {
        e.preventDefault();
        logoutUser();
    };

    useEffect(() => {

        function handleClickEvent(event) {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                document.getElementById('menuBox').classList.remove('active')
            }
        }
        document.addEventListener('mousedown', handleClickEvent);
        return () => {
            document.removeEventListener('mousedown', handleClickEvent);
        }
    }, [dropdown])

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start ml-3">
                        <Link to="/">
                            <div className="flex-shrink-0 flex items-center">
                                <h2 className="text-xl sm:text-2xl text-white font-bold tracking-wider">HelloTalks</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            {/* <!--Heroicon name: outline/bell--> */}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* <!--Profile dropdown--> */}
                        {auth.isAuthenticated === true ? (
                            <div className="ml-2 relative" ref={dropdown}>
                                <div className="p-1">
                                    <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={handleUserMenu}>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-10 w-10 rounded-full" src="/images/icon.jpg" alt="" />
                                    </button>
                                    <div className="absolute bg-white bottom-1 right-1 h-3 w-3 rounded-full" style={{ padding: '1.5px' }}>
                                        <img className="h-full w-4 fit-cover rounded-full" src="/images/64.png" alt="" />
                                    </div>
                                </div>
                                <div id="menuBox" className="origin-top-right absolute w-48 rounded-md shadow-lg p-3 bg-white outline-none" ref={dropdown}>
                                    <a href="#" className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300" role="menuitem" id="user-menu-item-0">Your Profile</a>
                                    <a href="#" className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300" role="menuitem" id="user-menu-item-1">Settings</a>
                                    <a href="#" className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300" role="menuitem" id="user-menu-item-2" onClick={onLogoutClick}>Sign out</a>
                                </div>
                            </div>
                        ) : (
                            <div className="ml-3 relative">
                                <div className="p-1">
                                    <Link to="/login">
                                        <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium tracking-wider focus:outline-none">Sign In</button>
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);