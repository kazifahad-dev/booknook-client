"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Your Neighbourhood Library, Online",
    text: "Browse a growing shelf of books shared by readers just like you.",
    image: "/slides/slide1.jpg",
  },
  {
    title: "Add a Book to the Shelf",
    text: "Finished reading? Share your book so someone else can enjoy it next.",
    image: "/slides/slide2.jpg",
  },
  {
    title: "Borrow Today, Return Anytime",
    text: "Take a book home for a few days and bring it back when you are done.",
    image: "/slides/slide3.jpg",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full"
      style={{
        "--swiper-navigation-color": "#ffffff",
        "--swiper-pagination-color": "#c9a227",
        "--swiper-pagination-bullet-inactive-color": "#ffffff",
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.title}>
          <div className="relative h-[420px] w-full bg-[#3b2a1f] md:h-[540px]">
            
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

            
            <div className="relative mx-auto flex h-full max-w-6xl flex-col items-start justify-center gap-4 px-6 text-white lg:px-8">
              <h1 className="max-w-xl text-3xl font-bold leading-tight md:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-md text-base text-white/90 md:text-lg">
                {slide.text}
              </p>
              <Link
                href="/books"
                className="btn mt-2 border-none bg-[#c9a227] text-[#2b1d0e] hover:bg-[#e0b93a]"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}