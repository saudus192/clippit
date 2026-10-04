"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, LogOut, LogIn, Shield, Info, Mail, Link2 } from 'lucide-react'

const navLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact Us', icon: Mail },
]

const Navbar = () => {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // useEffect(() => {
    //     setIsOpen(false)
    // }, [pathname])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav
                className={`sticky top-0 z-40 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/80 backdrop-blur-md shadow-sm'
                        : 'bg-white shadow-md'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-18 items-center relative">

                        {/* Mobile hamburger - absolute so it doesn't affect logo centering */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden absolute left-0 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                            aria-label="Open menu"
                        >
                            <Menu size={26} />
                        </button>

                        {/* Logo: centered on mobile, left-aligned on lg+ (untouched original behavior) */}
                        <div className="shrink-0 mx-auto lg:mx-0">
                            <Link href="/">
                                <Image
                                    src={logo}
                                    alt="Clippit Logo"
                                    width={250}
                                    height={250}
                                />
                            </Link>
                        </div>

                        {/* Desktop nav - original, untouched */}
                        <div className="hidden lg:flex space-x-8 items-center">
                            <Link href="/shorten">
                                <button className={`px-4 py-2 ${pathname === '/shorten' ? 'bg-blue-800' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-800 transition duration-300`}>
                                    Shorten
                                </button>
                            </Link>

                            {session ? (
                                <>
                                    <Link href="/dashboard">
                                        <button className={`px-4 py-2 ${pathname === '/dashboard' ? 'bg-blue-800' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-800 transition duration-300`}>
                                            Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-4 py-2 rounded-md transition duration-300 bg-transparent text-red-600 hover:bg-red-50 border border-red-200"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <button className={`px-4 py-2 ${pathname === '/login' ? 'bg-blue-800' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-800 transition duration-300`}>
                                        Login
                                    </button>
                                </Link>
                            )}
                            <Link href="/privacy-policy" className={`font-medium ${pathname === '/privacy-policy' ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}>
                                Privacy Policy
                            </Link>
                            <Link href="/about" className={`font-medium ${pathname === '/about' ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}>
                                About Us
                            </Link>
                            <Link href="/contact" className={`font-medium ${pathname === '/contact' ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-gray-900'}`}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar overlay + drawer - light theme */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 lg:hidden flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                                <Image
                                    src={logo}
                                    alt="Clippit Logo"
                                    width={140}
                                    height={140}
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
                                <Link href="/shorten" onClick={() => setIsOpen(false)}>
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${pathname === '/shorten'
                                            ? 'bg-blue-800 text-white'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}>
                                        <Link2 size={19} />
                                        Shorten
                                    </div>
                                </Link>

                                {session ? (
                                    <>
                                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${pathname === '/dashboard'
                                                    ? 'bg-blue-800 text-white'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}>
                                                <LayoutDashboard size={19} />
                                                Dashboard
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => { signOut(); setIsOpen(false) }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-all text-left"
                                        >
                                            <LogOut size={19} />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${pathname === '/login'
                                                ? 'bg-blue-800 text-white'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}>
                                            <LogIn size={19} />
                                            Login
                                        </div>
                                    </Link>
                                )}

                                <div className="h-px bg-gray-200 my-3" />

                                {navLinks.map(({ href, label, icon: Icon }) => (
                                    <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                                        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${pathname === href
                                                ? 'text-blue-700 font-semibold bg-blue-50'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}>
                                            <Icon size={19} />
                                            {label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar