"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <>
            <div className="flex flex-col justify-center p-8 gap-4 md:w-[60%] sm:w-[80%] w-[90%] mx-auto my-8 bg-white rounded-lg shadow-md">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-3xl font-bold mb-4 text-center'>Contact Us
                </motion.h1>
                <motion.div
                    className='mb-4 flex justify-center'
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image className='rounded-lg' src="/contact_vector.png" alt="Contact Us" width={400} height={300} />
                </motion.div>
                <p className='text-lg'>We’re always happy to hear from you.</p>
                <p className='text-lg'>If you have questions, suggestions, feedback, or experience any issues while using our URL Shortener service, feel free to reach out. Your message helps us improve the platform and serve you better.</p>
                <h2 className='text-2xl font-bold'>Why contact us</h2>
                <p className='text-lg'>You can contact us if you:</p>
                <ul className='list-disc list-inside text-lg'>
                    <li>Have questions about our URL Shortener service.</li>
                    <li>Want to provide feedback or suggestions for improvement.</li>
                    <li>Encounter any issues or bugs while using the service.</li>
                    <li>Need assistance with your account or links.</li>
                </ul>
                <p className='text-lg'>We review messages regularly and try to respond as quickly as possible. 📩</p>
                <h2 className='text-2xl font-bold'>Support Email</h2>
                <p className='text-lg'>For all support requests and inquiries:</p>
                <p className='text-lg font-semibold'>
                <a href="mailto:contact@urlshortener.com">contact@urlshortener.com</a>
                </p>
                <h2 className='text-2xl font-bold'>Response Time</h2>
                <p>Most messages are answered within 24 to 48 hours.</p>
                <h2 className='text-2xl font-bold'>Report Abuse</h2>
                <p className='text-lg'>If you notice any shortened link being used for spam, harmful content, or misuse of the platform, please report it immediately so appropriate action can be taken.</p>
                <h2 className='text-2xl font-bold'>Thank You</h2>
                <p className='text-lg'>Your feedback helps us keep the service safe, reliable, and useful for everyone.</p>
            </div>
        </>
    )
}

export default Contact