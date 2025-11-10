import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Pricing() {
    return (
        <section className="relative py-20 px-6 transition-colors duration-700 text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto text-center mb-14">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold mb-4"
                >
                    Our Pricing
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
                >
                    We’re crafting customized packages that best fit your event needs. For now, get in touch with our
                    team for a personalized quote and package details.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative max-w-3xl mx-auto p-10 rounded-3xl shadow-2xl text-white
                           bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400
                           hover:scale-[1.02] transform transition duration-300"
            >
                {/* transparent overlay */}
                <div className="absolute inset-0 bg-black/25 rounded-3xl pointer-events-none" />

                <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-bold mb-4">Tailored Event Solutions</h3>
                    <p className="text-white/90 mb-6 max-w-xl mx-auto">
                        Every event is unique — from LED walls and sound setups to complete audiovisual coordination.
                        Our pricing is flexible and based on your exact needs.
                    </p>

                    <p className="text-lg italic text-white/80 mb-8">
                        Pricing available upon request
                    </p>

                    <Link
                        to="/contact"
                        className="inline-block bg-white/20 hover:bg-white/30 border border-white/30
                                   rounded-lg px-8 py-3 font-semibold text-sm transition-all duration-300"
                    >
                        Request a Quote
                    </Link>
                </div>
            </motion.div>

            {/* subtle glow blobs */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-indigo-400/30 blur-3xl rounded-full" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-400/30 blur-3xl rounded-full" />
        </section>
    );
}
