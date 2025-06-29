import {motion} from "framer-motion";

export function FeatureCard({title, description, image}:{title: string, description: string, image: string}) {
    return (
        <motion.div
            whileHover={{scale: 1.05, rotate: 1}}
            whileTap={{scale: 0.95}}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md transition duration-300">
            <img src={image} alt="" className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );

}