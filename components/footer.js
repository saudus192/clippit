import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto py-4 text-center flex items-center justify-center">
                    <p>&copy; {new Date().getFullYear()}</p>
                    <Image className='mix-blend-plus-lighter mx-0.5' src="/logo-footer.png" alt="Logo" width={70} height={70} />
                    <p>All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer