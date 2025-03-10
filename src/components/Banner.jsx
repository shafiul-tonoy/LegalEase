import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img1 from "../assets/three.jpg";
import img2 from "../assets/two.jpg";
import img3 from "../assets/one.jpg";

export default function Banner() {
  const images = [img1, img2, img3];
  const texts = [
    "",
    "" , 
    "" 
  ];
  return (
    <div className="w-full mx-auto swiper overflow-visible">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Number of visible slides
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
        autoplay={{ delay: 3000 }} // Enable autoplay
        loop // Enables infinite looping
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[50vh] object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <h2 className="text-white text-4xl font-bold">
                {texts[index]}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}