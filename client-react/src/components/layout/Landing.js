import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../../svgImage/chat1.svg'

function Landing() {
    const tagline = { tag: "Let's Learn and Chat Together", desc: "India's first, most popular and growing, learning chat app." };
    const button = { log: "Login", reg: "SignUp" }
    return (
        <>
            <div className="bg-gray-400" style={{ minHeight: "calc(100vh - 64px)", height: "fit-content" }}>
                <div className="h-full w-full p-8 flex items-center justify-center flex-col-reverse md:grid md:grid-cols-2 md:gap-8">
                    <div className="h-full w-full flex items-center justify-center p-3 mt-5">
                        <HomeIcon className="h-full w-full max-w-xs md:max-w-none" />
                    </div>
                    <div className="h-full w-full my-7 md:pl-10 flex items-center justify-center flex-col md:mr-7">
                        <div className="text-2xl text-gray-800 font-bold tracking-wider text-center mx-auto relative lg:-top-14">
                            {tagline.tag}
                            <h2 className="mt-4 text-base font-bold text-gray-500 tracking-wide leading-7">{tagline.desc}</h2>
                        </div>
                        <div className="mx-auto flex mt-6 sm:mt-10 md:mt-2 sm:mb-5 md:mb-1">
                            <Link to="/login" className="mx-4 mt-5 w-content"><button className="px-5 py-2 text-base uppercase font-semibold tracking-wider focus:outline-none shadow-md transition-all duration-400 hover:scale-150 hover:shadow-lg rounded-md border-2 border-gray-800">{button.log}</button></Link>
                            <Link to="/register" className="mx-4 mt-5 w-content"><button className="px-5 py-2 text-base uppercase font-semibold tracking-wider focus:outline-none shadow-md transition-all duration-400 hover:scale-150 hover:shadow-lg rounded-md border-2 border-gray-800 bg-gray-900 text-gray-200">{button.reg}</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing
