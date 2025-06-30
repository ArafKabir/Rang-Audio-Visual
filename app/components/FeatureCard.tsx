import {motion} from "framer-motion";
import clsx from "clsx";


export function FeatureCard({title, description, image, index}:{title: string, description: string, image: string, index: number}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.08 }}
            className={clsx(
                "relative cursor-pointer rounded-xl p-6 border",
                "bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-700",
                "shadow-md",
                "transition-transform duration-75 ease-out",
                "hover:shadow-[0_0_30px_rgba(151,40,205,0.9)]"
            )}
        >
            <img src={image} alt={title} className="w-12 h-12 mb-4 transition-opacity duration-75" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-400 transition-colors duration-75">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-75">
                {description}
            </p>
        </motion.div>
    );
}
