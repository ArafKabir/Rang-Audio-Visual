import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";

export function ImageSlider() {
    const slides = [
        "/home-carousel/slide1.jpg",
        "/home-carousel/slide2.jpg",
        "/home-carousel/slide3.jpg",
        "/home-carousel/slide4.jpg"
    ];

    return (
        <div className="mt-[50px] w-full max-w-screen-2xl mx-auto"> {/* wrapper controls overall width */}
            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                centeredSlides
                slidesPerView="auto"
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                /* wider + taller */
                className="w-full  h-full md:h-[45rem] rounded-2xl overflow-hidden
    "
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
