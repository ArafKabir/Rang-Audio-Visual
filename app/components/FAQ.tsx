import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SplitText from "~/components/SplitText";

type FAQ = { question: string; answer: string };

const faqs: FAQ[] = [
    {
        question: "What size LED screens should I rent?",
        answer: "It depends on your audience size and venue. Contact us for tailored recommendations.",
    },
    {
        question: "Do you offer LED screens for outdoor events?",
        answer: "Yes! Our LED screens are weatherproof and bright enough for daylight viewing.",
    },
    {
        question: "Do you provide delivery and setup?",
        answer: "Absolutely. We handle delivery, setup, calibration, and on-site technical support.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative py-20 px-6 sm:px-10 mt-30 max-w-5xl mx-auto">
            {/* Background Accent Blobs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />
            </div>

            {/* Title */}
            <div className="text-center mb-14">
                <SplitText
                    text="Frequently Asked Questions"
                    className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400"
                    delay={80}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                />
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                    Answers to common questions about our LED screens, setups, and services.
                </p>
            </div>

            {/* FAQ Cards */}
            <div className="space-y-5">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;

                    return (
                        <motion.div
                            key={i}
                            className="rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/60
                                       border border-gray-200/40 dark:border-gray-700/50 shadow-lg
                                       overflow-hidden hover:shadow-indigo-400/20 transition-shadow"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <button
                                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                            >
                                <span className="flex items-center gap-3 text-gray-900 dark:text-gray-100 font-semibold text-lg">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                                >
                                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200/50 dark:border-gray-700/40">
                                            <motion.p
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {faq.answer}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
