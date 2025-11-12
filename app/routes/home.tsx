import type { Route } from "./+types/home";
import { ImageSlider } from "~/components/ImageSlider";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { FeatureCard } from "~/components/FeatureCard";
import {FAQ} from "~/components/FAQ";
import { useEffect } from "react";
import HeroBanner from "~/components/HeroBanner";
import {SplitText} from "~/components/SplitText";

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RangAV - Home" },
        { name: "description", content: "Welcome to Rang Audio Visual!" },
    ];
}

export default function Home() {
    const features = [
        {
            title: "LED Wall Install",
            description: "High quality LED wall installations for events, stages and venues.",
            image: "/gallery/1.jpg"
        },
        {
            title: "Audio-Visual Playback",
            description:
                "Experience synchronized sound and visuals — play movies, live sports, or custom content on large LED screens with immersive audio systems.",
            image: "/gallery/21.jpg"
        },
        {
            title: "Event Photography",
            description: "Professional photography services for any occasion.",
            image: "/gallery/Photography.jpg"
        },
        {
            title: "Live Stream",
            description: "We provide real-time live streaming of your event directly to big LED screens or online platforms, ensuring every moment reaches your audience instantly.",
            image: "/gallery/3.jpg"
        },
        {
            title: "Custom Content",
            description: "Tailored visuals and animations to display on your LED screens.",
            image: "/gallery/6.jpg"
        },
        {
            title: "LED Ads",
            description: "Run visually captivating LED advertisements that get noticed.",
            image: "/gallery/ads.jpg"
        },
    ];

    const SECTION_HEIGHT = 1000;
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, SECTION_HEIGHT], [1, 0]);


    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
        document.head.appendChild(script);
    }, []);


    return (
        <section className=" text-black">
            <div className="mt-20 mb-40">
                <HeroBanner/>
            </div>
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center mb-10 w-full text-center">
                    <SplitText
                        text="Our Services"
                        className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight tracking-tight text-center"
                        delay={80}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                    />
                </div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-12 gap-y-16  mx-auto px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {features.map((feature, i) => (
                        <FeatureCard key={feature.title} index={i} {...feature} />
                    ))}
                </motion.div>

                <div className="flex justify-center items-center mt-60 w-full text-center">
                    <SplitText
                        text="Experience Our LED Screen in AR"
                        className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight tracking-tight text-center"
                        delay={80}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                    />
                </div>
                <motion.div className=" bg-gradient-to-br from-[#DCCDD5] via-[#5E81C0] to-[#81C4BF]
                     dark:from-[#0D1117] dark:via-[#1B263B] dark:to-[#040B34] mt-10 rounded-lg shadow-lg p-8 w-full max-w-screen-2xl mx-auto"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}>
                    <model-viewer
                        src="/models/led-screen.glb"
                        ios-src="/models/led-screen.usdz"
                        ar
                        ar-placement="floor"
                        ar-modes="scene-viewer quick-look webxr"
                        camera-controls
                        auto-rotate
                        style={{ width: '100%', height: '500px' }}
                    >
                        <button slot="ar-button" className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
                            View in your space
                        </button>
                    </model-viewer>
                </motion.div>
                <FAQ/>
            </div>
        </section>
    );
}
