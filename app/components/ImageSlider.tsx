import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
    onSlideChange?: (index: number) => void;
}

export function ImageSlider({ onSlideChange }: ImageSliderProps) {
    const slides = [
        "/home-carousel/slide1.jpg",
        "/home-carousel/slide2.jpg",
        "/home-carousel/slide3.jpg",
        "/home-carousel/slide4.jpg",
    ];

    return (
        <div className="w-full max-w-screen-2xl mx-auto h-[90vh] md:h-[45rem] rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop
                slidesPerView={1}
                centeredSlides={false}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => onSlideChange?.(swiper.realIndex)}
                className="w-full h-full !overflow-hidden"
            >
                {slides.map((src) => (
                    <SwiperSlide key={src} className="!m-0 !p-0">
                        <img
                            src={src}
                            alt="Rang Audio Visual Event"
                            className="w-full h-full object-cover brightness-[0.45] select-none pointer-events-none"
                            draggable={false}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
