
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Every Book Opens a New World",
    description:
      "Discover wonderful stories, explore new ideas, and find your next favorite book.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600",
  },
  {
    subtitle: "DISCOVER YOUR NEXT READ",
    title: "Stories That Stay With You",
    description:
      "Explore books that inspire, entertain, and bring new perspectives.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600",
  },
  {
    subtitle: "YOUR READING JOURNEY",
    title: "Make Time for Great Stories",
    description:
      "Find your favorite books and make every reading moment meaningful.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600",
  },
];

export default function HeroSlider() {
  return (
    <section className="px-4 pt-6 md:px-8">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="overflow-hidden rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex min-h-[440px] items-center overflow-hidden bg-[#25231F] md:min-h-[540px]">
              <img
                src={slide.image}
                alt="BookNook reading collection"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#25231F] via-[#25231F]/80 to-transparent" />

              <div className="relative z-10 max-w-2xl px-8 py-16 text-white md:px-16">
                <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[#D0A77F]">
                  {slide.subtitle}
                </p>

                <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-white/75 md:text-lg">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="mt-8 inline-block rounded-md bg-[#B58A62] px-7 py-3.5 font-semibold text-white transition hover:bg-[#9A7250]"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
