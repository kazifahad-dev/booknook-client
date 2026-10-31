"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Your Neighbourhood Library, Online",
    text: "Browse a growing shelf of books shared by readers just like you.",
    bg: "bg-primary text-primary-content",
  },
  {
    title: "Add a Book to the Shelf",
    text: "Finished reading? Share your book so someone else can enjoy it next.",
    bg: "bg-secondary text-secondary-content",
  },
  {
    title: "Borrow Today, Return Anytime",
    text: "Take a book home for a few days and bring it back when you are done.",
    bg: "bg-accent text-accent-content",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={`flex h-[380px] flex-col items-center justify-center gap-4 px-6 text-center md:h-[480px] ${slide.bg}`}
          >
            <h1 className="max-w-2xl text-3xl font-bold md:text-5xl">
              {slide.title}
            </h1>
            <p className="max-w-xl text-base md:text-lg">{slide.text}</p>
            <Link href="/books" className="btn btn-neutral mt-2">
              Browse Books
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}