"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
)

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

const CloseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

/**
 * toast shape: { visible: boolean, type: "success" | "error", url?: string, message?: string }
 * onClose: () => void  -> called when the user dismisses manually
 */
export const Toast = ({ toast, onClose }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (!toast.url) return
        try {
            await navigator.clipboard.writeText(toast.url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Copy failed:", err)
        }
    }

    return (
        <AnimatePresence>
            {toast.visible && (
                <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`fixed top-6 right-6 z-50 w-95 max-w-[calc(100vw-2rem)] rounded-lg border-l-4 bg-zinc-900/95 backdrop-blur-sm shadow-2xl shadow-black/40 ${toast.type === "error" ? "border-red-500" : "border-lime-400"
                        }`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-2">
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-2 w-2 rounded-full ${toast.type === "error" ? "bg-red-500" : "bg-lime-400"
                                    }`}
                            />
                            <p className="font-['Syne'] text-sm font-semibold text-white">
                                {toast.type === "error" ? "Something went wrong" : "URL shortened successfully"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-zinc-500 hover:text-white transition-colors"
                            aria-label="Dismiss notification"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {toast.type !== "error" && toast.url && (
                        <div className="mx-4 mb-3 flex items-center justify-between gap-2 rounded-md bg-zinc-800/80 px-3 py-2">
                            <span className="truncate font-['DM_Mono'] text-sm text-lime-300">
                                {toast.url}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="flex shrink-0 items-center gap-1 rounded-md bg-lime-400/10 px-2 py-1 text-xs font-medium text-lime-400 transition-colors hover:bg-lime-400/20"
                            >
                                {copied ? <CheckIcon /> : <CopyIcon />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    )}

                    {toast.type === "error" && toast.message && (
                        <p className="mx-4 mb-3 font-['DM_Mono'] text-xs text-zinc-400">
                            {toast.message}
                        </p>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Toast