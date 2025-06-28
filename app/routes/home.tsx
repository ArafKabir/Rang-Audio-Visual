import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import { ImageSlider } from "~/components/ImageSlider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RangAV - Home" },
    { name: "description", content: "Welcome to Rang Audio Visual!" },
  ];
}

export default function Home() {
  return (
      <section className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <ImageSlider />
        <div className="mt-8">
          <Welcome />
        </div>
      </section>
  );
}