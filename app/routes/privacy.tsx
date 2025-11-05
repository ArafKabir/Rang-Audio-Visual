import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Section = {
    id: string;
    title: string;
    content: React.ReactNode;
};

const sections: Section[] = [
    {
        id: "overview",
        title: "Overview",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    Rang Audio Visual ("we", "us", "our") operates{" "}
                    <strong>RangAudioVisual.com</strong>. This Privacy Policy explains what
                    information we collect, why we collect it, and how we use it.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <em>Effective date:</em> {new Date().toLocaleDateString()}
                </p>
            </>
        ),
    },
    {
        id: "what-we-collect",
        title: "Information We May Collect",
        content: (
            <>
                <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300">
                    <li>
                        <strong>Contact info you provide:</strong> name, email, message — only
                        if you use our contact form or email us.
                    </li>
                    <li>
                        <strong>Automatically collected data:</strong> non-identifying
                        technical info (IP address, browser type, pages visited) for analytics
                        & security.
                    </li>
                    <li>
                        <strong>Cookies & similar tech:</strong> small files used to improve
                        performance and analytics.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "how-we-use",
        title: "How We Use Information",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    We use information you provide to respond to inquiries and to deliver
                    the service you request. Automatically collected data helps us maintain
                    and improve the website, protect against abuse, and analyze traffic
                    trends.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    We <strong>do not</strong> sell or rent personal information to third
                    parties.
                </p>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Cookies & Analytics",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    We may use cookies and third-party analytics (for example Google
                    Analytics) to understand how visitors use the site and for performance
                    improvements. You can disable cookies via your browser settings, though
                    parts of the site may not function correctly if cookies are disabled.
                </p>
            </>
        ),
    },
    {
        id: "sharing",
        title: "Sharing & Disclosure",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    We only share your information when necessary to comply with the law,
                    protect our rights, or with service providers who perform services on
                    our behalf (e.g., analytics). Such providers are contractually required
                    to keep information secure.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "Data Security",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    We implement reasonable technical and organizational measures to protect
                    information. However, no internet transmission is completely secure — we
                    cannot guarantee absolute security.
                </p>
            </>
        ),
    },
    {
        id: "your-rights",
        title: "Your Choices & Rights",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    If you contact us and provide personal details, you may request access,
                    correction, or deletion of those details. To do so, contact us at the
                    email below.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "Contact",
        content: (
            <>
                <p className="mb-2 text-gray-800 dark:text-gray-300">
                    Questions or requests about this policy? Reach out:
                </p>
                <ul className="pl-5 list-inside text-gray-800 dark:text-gray-300">
                    <li>
                        Email:{" "}
                        <a
                            className="text-indigo-600 dark:text-indigo-400 underline"
                            href="mailto:Rent4304@gmail.com"
                        >
                            Rent4304@gmail.com
                        </a>
                    </li>
                    <li>
                        Phone:{" "}
                        <a
                            className="text-indigo-600 dark:text-indigo-400 underline"
                            href="tel:+14033994074"
                        >
                            +1 (403) 399-4074
                        </a>
                    </li>
                </ul>
            </>
        ),
    },
];

const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PrivacyPolicy() {
    const [open, setOpen] = useState<string | null>("overview");

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-gray-800 dark:text-gray-400 sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl md:max-w-3xl">
                        Simple, transparent, and friendly — how we handle information on
                        RangAudioVisual.com.
                    </p>
                </motion.header>

                {/* Card */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="
            rounded-2xl
            bg-gradient-to-b from-gray-50 via-gray-200 to-blue-100
            dark:from-gray-800 dark:via-gray-900 dark:to-gray-950
            shadow-xl ring-1 ring-black/10 dark:ring-white/10
            overflow-hidden transition-colors duration-500
          "
                >
                    {/* top summary bar */}
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M12 1v11"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 7h16"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7 21h10"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    Rang Audio Visual
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Privacy & data handling
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                No accounts • No tracking by default
                            </div>
                        </div>
                    </div>

                    {/* body */}
                    <div className="p-6 space-y-6">
                        <motion.div
                            variants={item}
                            className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300"
                        >
                            <p>
                                This site is purely informational. We don’t run user accounts,
                                store payment info, or sell data. Below is how we handle the very
                                small amount of data that may be generated while you visit.
                            </p>
                        </motion.div>

                        {/* Accordion */}
                        <motion.div variants={item} className="space-y-3">
                            {sections.map((s) => {
                                const isOpen = open === s.id;

                                return (
                                    <motion.article
                                        key={s.id}
                                        className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        <header className="flex items-center justify-between px-4 py-3">
                                            <button
                                                onClick={() => setOpen(isOpen ? null : s.id)}
                                                className="flex items-center gap-3 text-left w-full"
                                                aria-expanded={isOpen}
                                                aria-controls={`${s.id}-content`}
                                            >
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white dark:bg-gray-900 shadow">
                          <svg
                              className={`w-5 h-5 text-indigo-600 dark:text-indigo-400 transform transition-transform ${
                                  isOpen ? "rotate-45" : "rotate-0"
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                          >
                            <path
                                d="M12 5v14M5 12h14"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {s.title}
                                                    </div>
                                                </div>
                                            </button>
                                        </header>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    id={`${s.id}-content`}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{
                                                        duration: 0.36,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="px-4 pb-4 pt-0 text-gray-700 dark:text-gray-300"
                                                >
                                                    <div className="pt-2 text-sm leading-7">
                                                        {s.content}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                );
                            })}
                        </motion.div>

                        {/* footer notes */}
                        <motion.footer
                            variants={item}
                            className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4"
                        >
                            <p>
                                Last updated:{" "}
                                <strong>{new Date().toLocaleDateString()}</strong>. We may update
                                this policy occasionally — changes will be posted here.
                            </p>
                            <p className="mt-2">
                                Prefer a plain text copy or need us to delete your contact
                                message? Email{" "}
                                <a
                                    href="mailto:Rent4304@gmail.com"
                                    className="text-indigo-600 dark:text-indigo-400 underline"
                                >
                                    Rent4304@gmail.com
                                </a>
                                .
                            </p>
                        </motion.footer>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
