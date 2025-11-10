import { useState } from "react";
import { Link } from "react-router";
import SplitText from "./SplitText";
import { ImageSlider } from "./ImageSlider";

export default function HeroBanner() {
    const slides = [
        {
            title: "Illuminate Your Vision",
            subtitle: "LED screens, event lighting, and perfect audiovisuals.",
        },
        {
            title: "Unforgettable Experiences",
            subtitle: "From concerts to weddings, we make moments shine.",
        },
        {
            title: "Seamless Production",
            subtitle: "Professional setups, on time, every time.",
        },
        {
            title: "Where Technology Meets Art",
            subtitle: "Your event deserves Rang Audio Visual.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative w-full max-w-screen mx-auto h-[80vh] md:h-[55rem] rounded-3xl overflow-hidden shadow-2xl">

            <ImageSlider onSlideChange={setActiveIndex} />

            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 rounded-3xl pointer-events-none" />

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white px-10 md:px-20 z-10 transition-all duration-700">
                <SplitText
                    key={slides[activeIndex].title}
                    text={slides[activeIndex].title}
                    className="text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
                    delay={80}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, x: -30 }}
                    to={{ opacity: 1, x: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                />

                <p className="text-lg md:text-2xl font-light max-w-2xl text-white/90 mb-8 animate-fadeIn transition-opacity duration-700">

                    <SplitText
                        key={slides[activeIndex].subtitle}
                        text={slides[activeIndex].subtitle}
                        className="text-4xl md:text-2xl font-extrabold mb-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
                        delay={80}
                        duration={1}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, x: -30 }}
                        to={{ opacity: 1, x: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                    />

                </p>

                <Link
                    to="/booking"
                    className="relative inline-block overflow-hidden px-8 py-3 border border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                    <span className="relative z-10 font-semibold">Book Now</span>
                </Link>
            </div>

            {/* Glow accents */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
        </div>
    );
}
