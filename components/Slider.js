import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Slider() {
  return (
    <div className="mb-[50px]">
      <section className="relative mt-7 shadow-lg max-w-screen-2xl mx-auto w-full h-[500px]">
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
              src="/images/stanley/photo1.jpeg"
              alt="Stanley Ukasoanya"
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div>
            <img
              loading="lazy"
              src="/images/stanley/photo2.jpeg"
              alt="Stanley Ukasoanya"
              className="w-full h-[500px] object-contain"
            />
          </div>

          <div>
            <img
              loading="lazy"
              src="/images/stanley/photo3.jpeg"
              alt="Stanley Ukasoanya"
              className="w-full h-[500px] object-contain"
            />
          </div>
        </Carousel>
      </section>
    </div>
  );
}

export default Slider;
