import { motion } from "framer-motion";
import clsx from "clsx";

export function FeatureCard({
                                title,
                                description,
                                image,
                                index,
                            }: {
    title: string;
    description: string;
    image?: string;
    index: number;
}) {
    // Subtle gradients depending on mode
    const lightGradients = [
        "from-blue-100 via-indigo-100 to-purple-100",
        "from-gray-100 via-slate-100 to-blue-100",
        "from-rose-100 via-pink-100 to-orange-100",
        "from-emerald-100 via-teal-100 to-cyan-100",
    ];

    const darkGradients = [
        "from-[#1a1c2b] via-[#141621] to-[#0f1018]",
        "from-[#1c1f2e] via-[#161825] to-[#0f111a]",
        "from-[#1b1618] via-[#151015] to-[#0e0c0f]",
        "from-[#10211f] via-[#0b1918] to-[#071010]",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{
                scale: 1.03,
                y: -6,
            }}
            transition={{ type: "tween", duration: 0.25 }}
            className={clsx(
                "relative overflow-hidden rounded-3xl shadow-xl cursor-pointer",
                "w-full max-w-full h-[20rem] md:h-[24rem] mx-auto",
                "flex items-end p-8 text-gray-800 dark:text-white transition-transform duration-300 ease-out"
            )}
            style={{
                backgroundImage: image
                    ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.75)), url(${image})`
                    : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Fallback gradient if no image */}
            {!image && (
                <>
                    <div
                        className={clsx(
                            `absolute inset-0 bg-gradient-to-br ${lightGradients[index % lightGradients.length]} opacity-90`,
                            "dark:hidden"
                        )}
                    />
                    <div
                        className={clsx(
                            `absolute inset-0 bg-gradient-to-br ${darkGradients[index % darkGradients.length]} opacity-95`,
                            "hidden dark:block"
                        )}
                    />
                </>
            )}

            {/* Overlay for slight dark tint when image exists */}
            {image && <div className="absolute inset-0 bg-black/10" />}

            {/* Text Content */}
            <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                    {title}
                </h3>
                <p className="text-lg md:text-xl text-white dark:text-gray-300 max-w-2xl leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
