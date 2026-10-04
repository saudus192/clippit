"use client";
import React, { useState } from "react";

const faqsData = [
    {
        question: "What is Clippit?",
        answer:
            "Clippit is a free URL shortening service that allows you to create short, easy-to-share links from long URLs. It’s perfect for sharing on social media, in emails, or anywhere you want to save space.",
    },
    {
        question: "How do I shorten a URL?",
        answer:
            "Simply go to the homepage, enter your long URL into the input field, and click the 'Shorten' button. Your shortened URL will be generated instantly and ready to share!",
    },
    {
        question: "Do I need an account to use Clippit?",
        answer:
            "No, you can shorten URLs without creating an account. However, signing up allows you to manage links, track clicks, and organize URLs.",
    },
    {
        question: "Is Clippit free to use?",
        answer:
            "Yes, Clippit is completely free. A premium plan is also available for advanced features and analytics.",
    },
    {
        question: "How long do shortened URLs last?",
        answer:
            "Shortened URLs remain active indefinitely unless reported for abuse.",
    },
];

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto mt-20 px-4">
            <h2 className="sm:text-3xl text-2xl font-bold mb-8 text-center">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faqsData.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-mist-300 rounded-xl shadow-sm border border-gray-200"
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center p-5 text-left"
                        >
                            <h3 className="text-lg font-semibold">
                                {faq.question}
                            </h3>

                            {/* Arrow */}
                            <span
                                className={`text-2xl transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {/* Answer */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-55 p-5 pt-0" : "max-h-0"
                                }`}
                        >
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faqs;