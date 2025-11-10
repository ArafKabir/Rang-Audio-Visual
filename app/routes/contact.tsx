import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, type Variants } from "framer-motion";

const SERVICE_ID = "service_zi6ca3e";
const TEMPLATE_ID = "template_9retsjb";
const PUBLIC_KEY = "SPUutnMH7qJtfENOD";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export default function ContactUs() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle"
    );

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
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6  transition-colors duration-500">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Get in Touch
                </h1>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    We'd love to hear from you — whether it’s a project inquiry, partnership
                    idea, or just a friendly hello.
                </p>
            </motion.div>

            {/* CONTACT CARD */}
            <motion.div
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* LEFT SECTION — GRADIENT INFO */}
                <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-500 to-blue-400 text-white p-10 lg:p-14 flex flex-col justify-center space-y-6">
                    <div className="h-full absolute inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl font-semibold">Contact Information</h2>
                        <ul className="space-y-5 text-lg text-gray-100">
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/phone-call.png" alt="Phone" className="w-6 h-6" />
                                <span>+1 403-399-4074</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/mail.png" alt="Email" className="w-6 h-6" />
                                <span>
                  <a href="mailto:Rent4304@gmail.com" className="underline hover:text-indigo-200">Rent4304@gmail.com</a>
                  <span className="mx-1" />
                  <a href="mailto:hrr@live.ca" className="underline hover:text-indigo-200">hrr@live.ca</a>
                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/location.png" alt="Address" className="w-6 h-6" />
                                <span>Chestermere, AB, Canada</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="/contact-icons/social-media.png" alt="Facebook" className="w-6 h-6" />
                                <a
                                    href="https://www.facebook.com/profile.php?id=61561435937177"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-indigo-200"
                                >
                                    fb.com/rangaudiovisual
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT SECTION — TRANSLUCENT GLASS FORM */}
                <div className="relative bg-white/30 dark:bg-white/10 backdrop-blur-xl p-10 lg:p-14 flex flex-col justify-center">
                    {status === "success" ? (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-green-500 mb-3">
                                Thank you!
                            </h3>
                            <p className="text-gray-800 dark:text-gray-200">
                                We’ve received your message and will get back to you soon.
                            </p>
                        </div>
                    ) : (
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-5 text-gray-900 dark:text-white"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <input
                                name="subject"
                                placeholder="Subject"
                                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Your Message (max 500 chars)"
                                maxLength={500}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            {status === "error" && (
                                <p className="text-red-400 text-sm">
                                    Something went wrong. Please try again.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition disabled:opacity-50"
                            >
                                {status === "loading" ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
