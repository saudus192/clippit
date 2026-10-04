"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Toast from '@/components/toast';

const Login = () => {
    const { data: session } = useSession();
    const [toast, setToast] = useState({ visible: false, type: "error", message: "" });

    useEffect(() => {
        if (session) {
            redirect('/dashboard');
        }
    }, [session]);


    const notAvailable = () => {
        setToast({
            visible: true,
            type: "error",
            message: "This login method is not available yet. Please try another method."
        });
        setTimeout(() => setToast({ ...toast, visible: false }), 10000);
    }
    
    return (
        <>
            <div className='flex flex-col items-center justify-center p-4 md:w-[60%] sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-md my-8'>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='sm:text-3xl text-2xl font-bold my-4 text-center'
                >
                    Choose Your Login Method
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='my-2 mb-4'
                >
                    <Image className='rounded-lg' src="/login_vector.png" alt="Login Vector" width={450} height={350} />
                </motion.div>
                {/* Button for Google Login */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='sm:w-[50%] w-[85%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors my-2 flex items-center justify-center gap-3'
                    onClick={() => signIn("google")}
                >
                    <Image src="/google.png" alt="Google Icon" width={30} height={30} />
                    <p> Login with Google</p>
                </motion.button>
                {/* Button for GitHub Login */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='sm:w-[50%] w-[85%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors my-2 flex items-center justify-center gap-3'
                    onClick={() => signIn("github")}
                >
                    <Image src="/github.png" alt="GitHub Icon" width={30} height={30} />
                    <p> Login with GitHub</p>
                </motion.button>
                {/* Button for Facebook Login */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='sm:w-[50%] w-[85%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors my-2 flex items-center justify-center gap-3'
                    onClick={notAvailable}
                >
                    <Image src="/facebook.png" alt="Facebook Icon" width={30} height={30} />
                    <p> Login with Facebook</p>
                </motion.button>
                {/* Button for Email/Password Login */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='sm:w-[50%] w-[85%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors my-2 flex items-center justify-center gap-3'
                    onClick={notAvailable}
                >
                    <Image src="/email.png" alt="Email Icon" width={30} height={30} />
                    <p> Login with Email</p>
                </motion.button>
            </div>
            <Toast toast={toast} onClose={() => setToast({ ...toast, visible: false })} />
        </>
    )
}

export default Login