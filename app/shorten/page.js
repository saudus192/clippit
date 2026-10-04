"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Toast from '@/components/toast';
import Loader from '@/components/loader';

const PREFIX = process.env.NEXT_PUBLIC_URL

const Shorten = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(PREFIX);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [toast, setToast] = useState({ visible: false, type: "success", url: "", message: "" });
    const dismissTimer = useRef(null);

    const showToast = (toastData) => {
        if (dismissTimer.current) clearTimeout(dismissTimer.current);
        setToast({ visible: true, ...toastData });
        // Long window (20s) so the user has plenty of time to read the
        // message and click "Copy" before it auto-dismisses. User can also
        // close it manually anytime via the close (X) button.
        dismissTimer.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 20000);
    };

    const closeToast = () => {
        if (dismissTimer.current) clearTimeout(dismissTimer.current);
        setToast((prev) => ({ ...prev, visible: false }));
    };

    useEffect(() => {
        return () => {
            if (dismissTimer.current) clearTimeout(dismissTimer.current);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const urlInput = e.target.elements['url'].value;
        const shortUrlInput = e.target.elements['short-url'].value;

        try {
            const minDelay = new Promise((resolve) => setTimeout(resolve, 1200));
            const apiCall = fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: urlInput, shortUrl: shortUrlInput }),
            });

            // API call aur minimum delay dono parallel chalenge
            const [response] = await Promise.all([apiCall, minDelay]);
            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: "error",
                    message: data?.error || "Could not shorten this URL. Please try again.",
                });
                return;
            }

            setShortUrl(data.shortUrl);
            showToast({
                type: "success",
                url: data.shortUrl,
            });

            // Reset the form fields after successful submission
            e.target.reset();
            setValue(PREFIX);
        } catch (error) {
            console.error("Error:", error);
            showToast({
                type: "error",
                message: "An unexpected error occurred. This short URL may already be taken. Please try again with a different short URL.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        let newValue = e.target.value;

        if (!newValue.startsWith(PREFIX)) {
            newValue = PREFIX;
        }

        setValue(newValue);
    };

    const handleKeyDown = (e) => {
        const prefixLength = PREFIX.length;

        if (
            (e.key === "Backspace" && e.target.selectionStart <= prefixLength) ||
            (e.key === "Delete" && e.target.selectionStart < prefixLength) ||
            (e.key === "ArrowLeft" && e.target.selectionStart <= prefixLength) ||
            (e.key === "Home")
        ) {
            e.preventDefault();

            e.target.setSelectionRange(prefixLength, prefixLength);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center p-4 md:w-[60%] sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-md my-8'>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-3xl font-bold mb-4'
                >
                    URL Shortener
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='my-4 mb-6'
                >
                    <Image className='rounded-lg' src="/shorten_vector.png" alt="URL Shortener" width={450} height={350} />
                </motion.div>
                <motion.form onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='w-[80%]' action="">
                    <label htmlFor="url" className='block mb-2 text-xl font-semibold'>Enter URL:</label>
                    <input type="url" id="url" className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 border-gray-300 rounded-md' placeholder="https://example.com" />
                    <label htmlFor="short-url" className='block mb-2 text-xl font-semibold'>Enter Suggested Short URL:</label>
                    <input type="url" id="short-url" value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => {
                            const prefixLength = PREFIX.length;

                            if (e.target.selectionStart < prefixLength) {
                                e.target.setSelectionRange(prefixLength, prefixLength);
                            }
                        }} className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 border-gray-300 rounded-md' />
                    <button type="submit" disabled={isLoading} className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors my-2 disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isLoading ? <Loader size="sm" /> : "Shorten URL"}
                    </button>
                </motion.form>
            </div>

            <Toast toast={toast} onClose={closeToast} />
        </>
    )
}

export default Shorten