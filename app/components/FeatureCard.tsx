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
                "bg-gray-300  border-gray-200 ",
                "shadow-md",
                "transition-transform duration-75 ease-out",
                "hover:shadow-[0_0_30px_rgba(84,103,122,0.9)]"
            )}
        >
            <img src={image} alt={title} className="w-12 h-12 mb-4 transition-opacity duration-75" />
            <h3 className="text-xl font-semibold mb-2 text-blue-800  transition-colors duration-75">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-800 transition-colors duration-75">
                {description}
            </p>
        </motion.div>
    );
}
