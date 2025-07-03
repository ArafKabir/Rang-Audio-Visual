import type { Route } from "./+types/home";
import { ImageSlider } from "~/components/ImageSlider";
import {motion, type Variants} from "framer-motion";
import { FeatureCard} from "~/components/FeatureCard";

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
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

    ]
  return (
      <section className="bg-white text-black">
        <ImageSlider />
          <div className="py-12 px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-center text-black  mb-12">
                  What We Do
              </h2>
              <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
              >
                  {features.map((feature) => (
                      <FeatureCard index={0} key={feature.title} {...feature} />
                  ))}
              </motion.div>
          </div>
      </section>

  );
}