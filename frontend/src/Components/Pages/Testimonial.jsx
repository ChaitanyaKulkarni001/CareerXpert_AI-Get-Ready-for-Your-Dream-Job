import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonial() {

    const testimonials = [
        {
            name: "Courtney Henry",
            company: "Microsoft Corp",
            feedback: "NexHire helped me land my first job! The mock interviews and resume reviews were super helpful. The AI-powered insights were spot-on!",
            avatar: "theme/images/users/user-5.png",
            rating: 4,
        },
        {
            name: "Ronald Richards",
            company: "Meta Limited",
            feedback: "NexHire helped me land my first job! The mock interviews and resume reviews were super helpful. The AI-powered insights were spot-on!",
            avatar: "theme/images/users/user-2.png",
            rating: 4,
        },
        {
            name: "Bessie Cooper",
            company: "Apple Inc Ltd",
            feedback: "NexHire helped me land my first job! The mock interviews and resume reviews were super helpful. The AI-powered insights were spot-on!",
            avatar: "theme/images/users/user-6.png",
            rating: 4,
        },
    ];


    return (
        <div>
  <section className="reviews bg-gray-50 py-16">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Our customers have nice things to say about us
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Hear from our happy customers about their experience.
        </p>
      </div>

      {/* Correct CSS inside a JSX style tag */}
      <style>
        {`
          .reviews-carousel .swiper-pagination-bullet {
            height: 14px;
            width: 14px;
            background-color: #8d8d8d;
            opacity: 1;
            transition: background-color 0.3s ease;
          }

          .reviews-carousel .swiper-pagination-bullet-active {
            background-color: #011638;
          }
        `}
      </style>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="reviews-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="review text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="review-author-avatar mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-500 mb-4">{testimonial.company}</p>
              <p className="text-gray-700">{testimonial.feedback}</p>
              <div className="review-rating mt-6 flex justify-center space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < testimonial.rating
                          ? "theme/images/icons/star.svg"
                          : "theme/images/icons/star-white.svg"
                      }
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
</div>

    )
}
