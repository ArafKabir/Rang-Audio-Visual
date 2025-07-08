
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Plus, Minus} from "lucide-react"

type FAQ = { question: string; answer: string };

const faqs: FAQ[] = [
    {
        question: "What size LED screens should I rent?",
        answer: "It depends on your audience, size and venue. Contact us for recommendations."
    },
    {
        question: "Do you offer LED screens for outdoor events?",
        answer: "Yes! Our LED screens are weatherproof and bright enough for daylight viewing."
    },
    {
        question:"Do you provide delivery and setup?",
        answer:"Yes! We handle delivery, setup and on-site technical support."
    }
];

export  function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="max-w-3xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-4">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;

                    return (
                        <motion.div key={i} className="border border-gray-300 rounded-lg overflow-hidden"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    whileHover={{
                                        scale: 1.01,
                                        boxShadow: "0 8px 24px rgba(84,103,122,0.35)",}}>
                            <button
                                className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                    <span className="font-medium">{faq.question}</span>
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { height: "auto", opacity: 1 },
                                            collapsed: { height: 0, opacity: 0 },
                                        }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="overflow-hidden bg-white px-6"
                                    >
                                        <motion.p
                                            className="py-4 text-gray-700"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {faq.answer}
                                        </motion.p>
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
