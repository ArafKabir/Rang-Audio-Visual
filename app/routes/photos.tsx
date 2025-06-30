import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Lightbox, {type Slide } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const slides: Slide[] = [
    { src: "/gallery/1.jpg"},
    { src: "/gallery/2.jpg", alt: "" },
    { src: "/gallery/3.jpg", alt: "" },
    { src: "/gallery/4.jpg", alt: "" },
    { src: "/gallery/5.jpg", alt: "" },
    { src: "/gallery/6.jpg", alt: "" },
    { src: "/gallery/7.jpg"},
    { src: "/gallery/8.jpg"},
    { src: "/gallery/9.jpg"},
    { src: "/gallery/10.jpg"},
    { src: "/gallery/11.jpg"},
    { src: "/gallery/12.jpg"},
    { src: "/gallery/13.jpg"},
    { src: "/gallery/14.jpg"},
    { src: "/gallery/15.jpg"},
    { src: "/gallery/16.jpg"},
    { src: "/gallery/17.jpg"},
    { src: "/gallery/18.jpg"},
    { src: "/gallery/19.jpg"},
    { src: "/gallery/20.jpg"},
    { src: "/gallery/21.jpg"},
];

export default function Photos() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
                Photo Gallery
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                Browse our gallery showcasing event setups, LED walls, and moments with our satisfied clients.
            </p>

            {/* Tailwind responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide, i) => (
                    <motion.button
                        key={slide.src}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                        }}
                        className="group focus:outline-none"
                    >
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className={clsx(
                                "w-full h-64 object-cover rounded-lg",
                                "transform transition duration-200 ease-out",
                                "group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
                            )}
                        />
                    </motion.button>
                ))}
            </div>

            {/* Lightbox */}
            {open && (
                <Lightbox
                    open={open}
                    index={index}
                    close={() => setOpen(false)}
                    slides={slides}
                    plugins={[Thumbnails]}
                    animation={{ fade: 250 }}
                />
            )}
        </section>
    );
}
