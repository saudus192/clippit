"use client";

import Faqs from "@/components/faqs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-between sm:p-24 p-10">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:text-3xl text-2xl font-bold text-center"
      >
        Shorten your long URLs in seconds — no signup required.
      </motion.h1>

      {/* Hero Section */}
      <div className="mt-10 flex md:flex-row flex-col items-center justify-center gap-6">

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sm:text-xl text-lg md:w-1/2 w-full text-center"
        >
          Use our fast and simple URL shortener instantly without creating an account.
          Need more control? Create a free account to manage your links, track activity,
          and organize everything in one place.
        </motion.p>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            className="rounded-lg mix-blend-darken"
            src={"/home_vector.png"}
            alt="Home Vector"
            width={500}
            height={200}
          />
        </motion.div>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 flex items-center justify-center gap-6"
      >
        <Link href="/shorten">
          <button className="sm:px-4 px-2 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300">
            Shorten Now
          </button>
        </Link>
        <Link href="/login">
          <button className="sm:px-4 px-2 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-300">
            Create Account
          </button>
        </Link>
      </motion.div>

      <Faqs />
    </div>
  );
}