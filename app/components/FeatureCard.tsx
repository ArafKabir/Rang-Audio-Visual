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
    image: string;
    index: number;
}) {
    // @ts-ignore
    return (
        <motion.div
            /* Entrance animation when in view */
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 24px rgba(84,103,122,0.35)",
            }}
            transition={{ type: "tween", duration: 0.18 }} // Smooth and snappy

            className={clsx(
                "relative cursor-pointer rounded-xl p-6 border",
                "bg-gray-300 border-gray-200",
                "shadow-md will-change-transform transition-transform duration-200 ease-out"
            )}
        >
            <img
                src={image}
                alt={title}
                className="w-12 h-12 mb-4 transition-opacity duration-75"
            />
            <h3 className="text-xl font-semibold mb-2 text-blue-800 transition-colors duration-75">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-800 transition-colors duration-75">
                {description}
            </p>
        </motion.div>
    );
}
