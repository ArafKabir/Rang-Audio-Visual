// pages/ContactUs.tsx
// Contact page with Framer‑Motion animated card + hero background.
// Requirements: npm i @emailjs/browser framer-motion clsx (if not installed)

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, type Variants } from "framer-motion";

const SERVICE_ID = "service_zi6ca3e";
const TEMPLATE_ID = "template_9retsjb";
const PUBLIC_KEY = "SPUutnMH7qJtfENOD";

// Variants for the info+form card entrance
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ContactUs() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
            setStatus("success");
            formRef.current?.reset();
        } catch (e) {
            console.error(e);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-100 flex flex-col">
            <div
                className="relative h-[300px]  bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/support.png')" }}
            >
                <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-xs" />
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center px-4 max-w-2xl"
                >
                    <h1 className="font-sans text-4xl font-bold mb-4">Get in touch</h1>
                    <p className="text-gray-200">
                        If you would like to find out more about how we can help you, please give us a call or drop
                        us an email. We welcome your comments and suggestions.
                    </p>
                </motion.div>
            </div>

            {/* ─── Animated Contact Card ──────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 flex justify-center">
                <motion.div
                    className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-gray rounded-lg shadow-xl overflow-hidden"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Left info */}
                    <div className="bg-blue-600 p-10 space-y-6">
                        <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
                        <ul className="space-y-4 text-sm text-indigo-100">
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/phone-call.png" alt="Phone" className="w-5 h-5" />
                                <span>+1 403-399-4074</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/mail.png" alt="Email" className="w-5 h-5" />
                                <span>
                  <a href="mailto:Rent4304@gmail.com" className="underline hover:text-indigo-200">Rent4304@gmail.com</a>,
                  <span className="mx-1" />
                  <a href="mailto:hrr@live.ca" className="underline hover:text-indigo-200">hrr@live.ca</a>
                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/location.png" alt="Address" className="w-5 h-5" />
                                <span>Chestermere, AB, Canada, Alberta</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/social-media.png" alt="Facebook" className="w-5 h-5" />
                                <a
                                    href="https://www.facebook.com/profile.php?id=61561435937177"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                >
                                    fb.com/rangaudiovisual
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right form */}
                    <div className="p-10 bg-gray-200 backdrop-blur">
                        {status === "success" ? (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold text-green-400 mb-2">Thank you!</h3>
                                <p>We received your message and will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-2 rounded bg-white border border-gray-700 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                        className="w-full px-4 py-2 rounded bg-white border border-gray-700 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <input
                                    name="subject"
                                    placeholder="Subject"
                                    className="w-full px-4 py-2 rounded bg-white border border-gray-700 placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Your Message (max 500 chars)"
                                    maxLength={500}
                                    required
                                    className="w-full px-4 py-2 rounded bg-white border border-gray-700 placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition disabled:opacity-50"
                                >
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
