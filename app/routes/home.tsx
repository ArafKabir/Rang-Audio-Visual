import type { Route } from "./+types/home";
import { ImageSlider } from "~/components/ImageSlider";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { FeatureCard } from "~/components/FeatureCard";
import { useEffect } from "react";

// Declare the custom element to avoid JSX/TS errors
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                "ios-src"?: string;
                "ar-modes"?: string;
                ar?: boolean;
                "camera-controls"?: boolean;
                "auto-rotate"?: boolean;
            };
        }
    }
}

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
            image: "/feature-card-icons/screen.png",
        },
        {
            title: "Audio Support",
            description: "Professional sound setup and support for crystal-clear audio.",
            image: "/feature-card-icons/volume.png",
        },
        {
            title: "Lighting Support",
            description: "Dynamic lighting design and setup to enhance every moment.",
            image: "/feature-card-icons/spotlight.png",
        },
        {
            title: "Custom Content",
            description: "Tailored visuals and animations to display on your LED screens.",
            image: "/feature-card-icons/creative.png",
        },
        {
            title: "Photography",
            description: "Professional photography services for any occasion.",
            image: "/feature-card-icons/camera.png",
        },
        {
            title: "LED Ads",
            description: "Run visually captivating LED advertisements that get noticed.",
            image: "/feature-card-icons/ads.png",
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

    // @ts-ignore
    // @ts-ignore
    return (
        <section className="bg-white text-black">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <ImageSlider />
            </motion.div>

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center text-black mb-12">What We Do</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {features.map((feature, i) => (
                        <FeatureCard key={feature.title} index={i} {...feature} />
                    ))}
                </motion.div>

                {/* AR Section */}
                <div className="mt-20">
                    <h2 className="text-xl font-semibold text-center mb-4">Experience Our LED Screen in AR</h2>
                    <model-viewer
                        src="/models/led-screen.glb"
                        ios-src="/models/led-screen.usdz"
                        ar
                        ar-modes="scene-viewer quick-look webxr"
                        camera-controls
                        auto-rotate
                        style={{ width: '100%', height: '500px' }}
                    >
                        <button slot="ar-button" className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">
                            View in your space
                        </button>
                    </model-viewer>
                </div>
            </div>
        </section>
    );
}
