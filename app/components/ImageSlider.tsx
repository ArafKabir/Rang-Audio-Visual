// app/components/ImageSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

export function ImageSlider() {
    const slides = [
        "/HomeCarousel/slide1.jpg",
        "/HomeCarousel/slide2.jpg",
        "/HomeCarousel/slide3.jpg",
    ];

    return (
        <div className="mx-auto max-w-screen-lg">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-64 md:h-96 rounded-lg overflow-hidden"
            >
                {slides.map((src) => (
                    <SwiperSlide key={src} className="relative">
                        <img src={src} className="w-full h-full object-cover" />

                        {/* BOOK NOW */}
                        <Link
                            to="/booking"
                            className="
                            cta
                absolute bottom-6 left-6
                group inline-block overflow-hidden
                px-6 py-2 border border-white text-white
                backdrop-blur-md bg-white/5
                transition-colors duration-300
              "
                        >
                            {/* spinning‑in fill effect */}
                            <span
                                className="
                  absolute inset-0 bg-indigo-600/70
                  translate-x-full group-hover:translate-x-0
                  transition-transform duration-300
                "
                            />
                            <span className="relative z-10">Book&nbsp;Now</span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
