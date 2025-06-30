import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";

export function ImageSlider() {
    const slides = [
        "/HomeCarousel/slide1.jpg",
        "/HomeCarousel/slide2.jpg",
        "/HomeCarousel/slide3.jpg",
        "/HomeCarousel/slide4.jpg"
    ];

    return (
        <div className="mx-auto max-w-screen-lg">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                centeredSlides                    // NEW: keeps active slide in the middle
                slidesPerView={"auto"}            // NEW: respect custom width we set in CSS
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-96 md:h-[32rem] rounded-lg"  /* keep height responsive */
            >
                {slides.map((src) => (
                    <SwiperSlide key={src} className="relative">
                        <img src={src} className="w-full h-full object-cover" />

                        <Link
                            to="/booking"
                            className="
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
                            <span className="relative z-10">Book Now</span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
