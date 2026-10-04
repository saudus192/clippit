"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";

const About = () => {
    return (
        <>
            <div className="flex flex-col justify-center p-8 gap-4 md:w-[60%] sm:w-[80%] w-[90%] mx-auto my-8 bg-white rounded-lg shadow-md">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-3xl font-bold mb-4 text-center'>About Us
                </motion.h1>
                <motion.div
                    className='mb-4 flex justify-center'
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image className='rounded-lg' src="/about_us.png" alt="About Us" width={400} height={300} />
                </motion.div>
                <p className='text-lg'>Welcome to our URL Shortener platform.</p>
                <p className='text-lg'>Our goal is simple: make sharing links faster, cleaner, and smarter. Long and complex URLs can look messy and are difficult to remember. This platform helps you convert long links into short, easy-to-share URLs within seconds.</p>
                <p className='text-lg'>We built this service with a focus on simplicity, speed, and reliability. Whether you are sharing links with friends, students, clients, or on social media, our short links help you keep things organized and professional.</p>
                <h2 className='text-2xl font-bold'>What we offer</h2>
                <ul className='list-disc list-inside text-lg'>
                    <li>Fast and reliable URL shortening</li>
                    <li>Customizable short links</li>
                    <li>Analytics and tracking</li>
                    <li>Secure and private</li>
                    <li>User-friendly interface</li>
                </ul>
                <p className='text-lg'>We believe useful tools should stay simple. That’s why our platform is designed so anyone can use it without technical knowledge.</p>
                <p className='text-lg'>Our mission is to provide a lightweight and dependable link management experience for everyone. 🚀</p>
                <p className='text-lg'>If you have suggestions or feedback, we always welcome your ideas to improve the platform.</p>
            </div>
        </>
    )
}

export default About