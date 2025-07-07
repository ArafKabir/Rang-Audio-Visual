import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-100 flex flex-col">
            <header className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <motion.img
                    src="/RAV logo1.png"
                    alt="Company Logo"
                    className="w-32 h-32 object-contain mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 2 }}
                    transition={{ duration: 0.8, ease: "easeOut"}}
                    whileHover={{
                        scale: 2.5,
                    }}
                />
                <motion.h1
                    className="text-4xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    About Rang Audio Visual
                </motion.h1>
                <motion.p
                    className="max-w-2xl mt-4 text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    At Rang Audio Visual, we rent top-of-the-line, customizable LED display screens that make every seat feel like the front row. Whether it’s an indoor or outdoor event, we supply, install, and maintain high-resolution LED screens tailored to your needs.

                    Our service coverage spans across Calgary, Chestermere, Edmonton, Cochrane, and Canmore, ensuring your event gets the visual impact it deserves—anywhere, anytime.
                </motion.p>
            </header>

            <section className="flex justify-center px-4 pb-24">
                <motion.div
                    className="
                    bg-gray-300 p-8 rounded-lg shadow-lg max-w-3xl w-full
                    grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8
                    hover:shadow-[0_0_30px_rgba(84,103,122,0.9)] transition-shadow duration-300
  "
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.08 }}
                >

                    <div className="flex justify-center">
                        <img
                            src="/owner.JPG"
                            alt="Company Owner"
                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-900 shadow-md"
                        />
                    </div>


                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold text-blue-900">Hasan Rahman</h2>
                        <p className="text-gray-900 font-medium mb-2">Founder & Chief Visionary</p>
                        <p className="text-gray-700">
                            "Mr. Hasan has spent the last decade curating world‑class audio‑visual productions for
                            concerts, weddings, and corporate galas. His passion for cutting‑edge tech and
                            storytelling drives Rang AV's commitment to excellence."
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
