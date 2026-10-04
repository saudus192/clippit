"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Trash2, ExternalLink, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardClient({ user, links: initialLinks }) {

    const [links, setLinks] = useState(initialLinks);
    const [copiedId, setCopiedId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const totalClicks = links.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const activeLinks = links.filter(
        (link) => !link.expirationDate || new Date(link.expirationDate) > new Date()
    ).length;
    const expiredLinks = links.length - activeLinks;

    const handleCopy = async (shortUrl, id) => {
        await navigator.clipboard.writeText(shortUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete link");
            }

            setLinks((prev) => prev.filter((link) => link._id !== id));
        } catch (err) {
            console.error("Delete failed:", err.message || err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-slate-900 px-6 py-10 md:px-12">
            {/* User info bar */}
            <div className="flex flex-col sm:flex-row sm:gap-0 gap-3 items-center justify-between mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    {user?.image && (
                        <Image
                            width={48}
                            height={48}
                            priority
                            src={user.image}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-sm"
                        />
                    )}
                    <div>
                        <h1 className="font-syne text-2xl font-bold text-slate-900">
                            {user?.name}
                        </h1>
                        <p className="font-dm-mono text-sm text-slate-500">{user?.email}</p>
                    </div>
                </div>

                <Link
                    href="/shorten "
                    className="bg-linear-to-r from-teal-500 to-emerald-500 text-white font-syne font-semibold px-5 py-2.5 rounded-lg hover:from-teal-400 hover:to-emerald-400 transition-all shadow-sm"
                >
                    + New Link
                </Link>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatCard label="Total Links" value={links.length} />
                <StatCard label="Total Clicks" value={totalClicks} />
                <StatCard label="Active Links" value={activeLinks} />
                <StatCard label="Expired Links" value={expiredLinks} />
            </div>

            {/* Links list */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70">
                    <h2 className="font-syne text-lg font-semibold text-slate-900">
                        Your Links
                    </h2>
                </div>

                {links.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="divide-y divide-slate-200">
                        <AnimatePresence>
                            {links.map((link, index) => {
                                const isExpired =
                                    link.expirationDate && new Date(link.expirationDate) < new Date();

                                return (
                                    <motion.div
                                        key={link._id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25, delay: index * 0.03 }}
                                        className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="p-2 bg-emerald-400/10 rounded-lg shrink-0">
                                                <Link2 className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-dm-mono text-teal-700 text-sm">
                                                        {link.shortUrl}
                                                    </span>
                                                    {isExpired && (
                                                        <span className="text-xs font-dm-mono px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                                                            Expired
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-500 text-sm truncate max-w-md">
                                                    {link.url}
                                                </p>
                                                {/* Click count display if smaller than sm */}
                                                <div className="sm:hidden *:flex items-center gap-1 mt-1">
                                                    <p className="font-dm-mono text-slate-800 text-sm">
                                                        {link.clickCount || 0}
                                                    </p>
                                                    <p className="text-xs text-slate-500">clicks</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 shrink-0">
                                            <div className="text-right hidden sm:block">
                                                <p className="font-dm-mono text-slate-800 text-sm">
                                                    {link.clickCount || 0}
                                                </p>
                                                <p className="text-xs text-slate-500">clicks</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleCopy(link.shortUrl, link._id)}
                                                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                    title="Copy link"
                                                >
                                                    {copiedId === link._id ? (
                                                        <Check className="w-4 h-4 text-emerald-600" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-slate-500" />
                                                    )}
                                                </button>

                                                <Link
                                                    href={link.shortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                    title="Visit original"
                                                >
                                                    <ExternalLink className="w-4 h-4 text-slate-500" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(link._id)}
                                                    disabled={deletingId === link._id}
                                                    className="p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                                                    title="Delete link"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm"
        >
            <p className="font-dm-mono text-3xl font-bold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                {value}
            </p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="p-4 bg-emerald-100 rounded-full mb-4">
                <Link2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-syne text-lg font-semibold text-slate-900 mb-1">
                No links yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
                Create your first shortened link to see it here.
            </p>
            <Link
                href="/shorten"
                className="bg-linear-to-r from-teal-500 to-emerald-500 text-white font-syne font-semibold px-5 py-2.5 rounded-lg hover:from-teal-400 hover:to-emerald-400 transition-all"
            >
                + New Link
            </Link>
        </div>
    );
}