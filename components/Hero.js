import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Hero() {
  return (
    <section className="w-auto">
      {/* carousel for mobile */}
      <div className="lg:hidden">
        <section className="relative mt-1 shadow-lg max-w-screen-2xl mx-auto w-full h-[300px] mb-4">
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
          >
            <div>
              <img
                loading="lazy"
                src="/images/stanley/stanley_2.jpg"
                alt="Stanley Ukasoanya"
                className="w-full h-[300px] object-contain"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="/images/stanley/stanley_3.jpg"
                alt="Stanley Damian Ukasoanya"
                className="w-full h-[300px] object-contain"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="/images/stanley/stanley_4.jpg"
                alt="Stanley Damian Ukasoanya"
                className="w-full h-[300px] object-contain"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="/images/stanley/stanley_5.jpg"
                alt="Stanley Damian Ukasoanya"
                className="w-full h-[300px] object-contain"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="/images/stanley/stanley_6.jpg"
                alt="Stanley Damian Ukasoanya"
                className="w-full h-[300px] object-contain"
              />
            </div>
          </Carousel>
        </section>
      </div>

      {/* Hero meta */}
      <div className="md:mb-7">
        <div className="mb-2">
          <p className="text-sm text-gray-600">IN LOVING MEMORY OF</p>
          <p className="text-xl lg:text-3xl font-semibold" component="h1">
            Rev Fr. Stanley Damian Ukasoanya
          </p>
        </div>

        {/* Date */}
        <div className="w-auto ">
          <p className="text-base ">6th June, 1992 - 8th August, 2023</p>
        </div>
      </div>

      {/* Hero images */}
      <div className="hidden lg:block w-full">
        {/* image grid for large screens */}
        <div className="flex items-center justify-center w-full space-x-1">
          <div className="relative w-[50%] h-[500px]">
            <Image
              src="/images/stanley/stanley_2copy.jpg"
              alt="Stanley Damian Ukasoanya"
              quality="100"
              layout="fill"
            />
          </div>

          <div className="grid grid-col-2 w-[50%] h-[500px] gap-1">
            <div className="flex space-x-1">
              <div className="relative w-[50%] h-[250px]">
                <Image
                  src="/images/stanley/stanley_3copy.jpg"
                  alt="Stanley Damian Ukasoanya"
                  layout="fill"
                  quality="100"
                />
              </div>

              <div className="relative w-[50%] h-[250px]">
                <Image
                  src="/images/stanley/stanley_4copy.jpg"
                  alt="Stanley Damian Ukasoanya"
                  layout="fill"
                  quality="100"
                />
              </div>
            </div>

            <div className="flex space-x-1">
              <div className="relative w-[50%] h-[250px]">
                <Image
                  src="/images/stanley/stanley_5copy.jpg"
                  alt="Stanley Damian Ukasoanya"
                  layout="fill"
                  quality="100"
                />
              </div>

              <div className="relative w-[50%] h-[250px]">
                <Image
                  src="/images/stanley/stanley_6copy.jpg"
                  alt="Stanley Damian Ukasoanya"
                  layout="fill"
                  quality="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
