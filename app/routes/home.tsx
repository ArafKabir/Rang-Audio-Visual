import type { Route } from "./+types/home";
import { ImageSlider } from "~/components/ImageSlider";
import { FeatureCard} from "~/components/FeatureCard";

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
            image: "/Feature Card Icons/screen.png",
        },
        {
            title: "Audio Support",
            description: "Professional sound setup and support for crystal-clear audio.",
            image: "/Feature Card Icons/volume.png",
        },
        {
            title: "Lighting Support",
            description: "Dynamic lighting design and setup to enhance every moment.",
            image: "/Feature Card Icons/spotlight.png",
        },
        {
            title: "Custom Content",
            description: "Tailored visuals and animations to display on your LED screens.",
            image: "/Feature Card Icons/creative.png",
        },
        {
            title: "Photography",
            description: "Professional photography services for any occasion.",
            image: "/Feature Card Icons/camera.png",
        },
        {
            title: "LED Ads",
            description: "Run visually captivating LED advertisements that get noticed.",
            image: "/Feature Card Icons/ads.png",
        },

    ]
  return (
      <section className="bg-white text-black dark:bg-gray-950 dark:text-white">
        <ImageSlider />
          <div className="py-12 px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">What We Do</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
                  {features.map((feature) => (
                      <FeatureCard key={feature.title} {...feature} />
                  ))}
              </div>
          </div>
      </section>

  );
}