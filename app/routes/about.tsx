import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <div className="min-h-screen text-gray-100 flex flex-col">
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
                    className="text-4xl font-bold text-gray-900 dark:text-gray-300 "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    About Rang Audio Visual
                </motion.h1>
                <motion.p
                    className="max-w-2xl mt-4 text-gray-500 dark:text-gray-400"
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
                    bg-gray-300 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full
                    grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8
                    hover:shadow-[0_0_30px_rgba(84,103,122,0.9)] transition-shadow duration-300"
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
                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-900 shadow-md dark:border-gray-200"
                        />
                    </div>


                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold text-blue-900 dark:text-gray-300">Hasan Rahman</h2>
                        <p className="text-gray-900 dark:text-gray-400 font-medium mb-2">CEO</p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Mr. Hasan is the Chief Executive Officer (CEO) and founder of Rang Audio Visual, with primary responsibility for overall business strategy, financial oversight, and scalable company growth.

                            His leadership is built on practical experience: he started the business as the Installation Team Lead, giving him a deep, operational understanding of every technical requirement for LED screen production. Today, Mr. Hasan uses that essential knowledge to drive the company's executive functions. His focus is on strategic sales, major client acquisition, and managing long-term partnerships, ensuring the business remains financially stable and competitive in the AV solutions market.
                        </p>
                    </div>


                </motion.div>
            </section>
            <section className="flex justify-center px-4 pb-24">
            <motion.div
                className="
                    bg-gray-300 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full
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
                        src="/lead.jpg"
                        alt="Company Lead"
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-900 shadow-md dark:border-gray-200"
                    />
                </div>


                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-blue-900 dark:text-gray-300">Kazi Al Araf Kabir</h2>
                    <p className="text-gray-900 dark:text-gray-400 font-medium mb-2">Technical Operations Lead</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Kazi Al Araf Kabir is the Technical Operations Lead and the driving force behind the seamless execution of our LED screen rental projects and our digital presence.

                        Araf started with the company two years ago as a dedicated member of the installation team and quickly advanced to overseeing technical operations. His role is uniquely diverse: he leads our on-site installation crews, serves as the primary live event video operator, and is the key resource for all complex hardware and signal troubleshooting. Beyond the physical setup, Araf single-handedly developed and maintains this company website, ensuring our digital platform is as reliable and professional as our on-site services.
                    </p>
                </div>


            </motion.div>
            </section>
        </div>
    );
}
