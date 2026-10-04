"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <>
            <div className="flex flex-col justify-center p-8 gap-4 md:w-[60%] sm:w-[80%] w-[90%] mx-auto my-8 bg-white rounded-lg shadow-md">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-3xl font-bold mb-4 text-center'>Privacy Policy
                </motion.h1>
                <motion.div
                    className='mb-4 flex justify-center'
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image className='rounded-lg' src="/privacy_vector.png" alt="Privacy Policy" width={400} height={300} />
                </motion.div>
                <p className='text-lg'>Your privacy matters to us. This Privacy Policy explains how we handle information when you use our URL Shortener service.</p>
                <h2 className='text-2xl font-bold'>Information We Collect</h2>
                <p className='text-lg'>When you use our service, we may collect limited technical information such as:</p>
                <ul className='list-disc list-inside text-lg'>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Referring website</li>
                </ul>
                <h2 className='text-2xl font-bold'>How We Use Your Information</h2>
                <p className='text-lg'>We use the information we collect to:</p>
                <ul className='list-disc list-inside text-lg'>
                    <li>Improve our service and user experience</li>
                    <li>Monitor and analyze usage patterns</li>
                    <li>Prevent fraud and maintain security</li>
                </ul>
                <p className='text-lg'>We never sell your personal data to third parties.</p>
                <h2 className='text-2xl font-bold'>Cookies</h2>
                <p className='text-lg'>We may use cookies to enhance your experience on our platform. Cookies help us remember your preferences and improve functionality.</p>
                <h2 className='text-2xl font-bold'>Third-Party Services</h2>
                <p className='text-lg'>We may share information with third-party services to provide you with a better experience. These services are bound by their own privacy policies.</p>
                <h2 className='text-2xl font-bold'>Data Security</h2>
                <p className='text-lg'>We implement appropriate security measures to protect your information from unauthorized access or disclosure.</p>
                <h2 className='text-2xl font-bold'>Changes to This Policy</h2>
                <p className='text-lg'>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
                <h2 className='text-2xl font-bold'>Contact Us</h2>
                <p className='text-lg'>If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@clippit.com" className='text-blue-500 hover:underline'>privacy@clippit.com</a>.</p>
            </div>
        </>
    )
}

export default PrivacyPolicy