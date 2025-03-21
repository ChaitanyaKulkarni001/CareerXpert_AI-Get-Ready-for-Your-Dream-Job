
import React from 'react';
import RegisterForm from './RegisterForm';

const SignUp = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Favicon and Meta Tags */}
      <link rel="shortcut icon" href="theme/images/favicon.png" />
      <meta name="theme-name" content="Pinwheel" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#141647" />
      <meta name="generator" content="gulp" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <title>Pinwheel-tailwind</title>

      {/* Stylesheets */}
      <link rel="stylesheet" href="theme/plugins/swiper/swiper-bundle.css" />
      <link rel="stylesheet" href="theme/plugins/font-awesome/v6/brands.css" />
      <link rel="stylesheet" href="theme/plugins/font-awesome/v6/solid.css" />
      <link rel="stylesheet" href="theme/plugins/font-awesome/v6/fontawesome.css" />
      <link href="theme/styles/main.css" rel="stylesheet" />

      {/* Main Section */}
      <section>
        <div className="container mx-auto px-4 py-10 lg:py-24">
          <div className="flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
              {/* <img className="mb-6 mx-auto" src="theme/images/flower.svg" alt="Flower" /> */}
              <h1 className="text-3xl font-bold text-center text-[#141647] mb-4">Sign Up</h1>
              <p className="text-center text-gray-600 mb-6">
                Join us and get started with your career journey.
              </p>

              <div className="signin-options mt-6">
                <a
                  className="btn btn-outline-[#141647] bg-white text-[#141647]  block w-full py-3 rounded-lg font-semibold hover:border-2 border-[#141647] transition-all"
                  href="#"
                >
                  Sign Up With Google
                </a>
              </div>

              <div className="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-[#141647] after:content-['']">
                <span className="relative z-[1] inline-block bg-white px-2 text-[#141647] font-semibold">
                  Or Sign Up With Email
                </span>
              </div>

              <RegisterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Debugging Helper */}
      

      {/* Scripts */}
      <script src="theme/plugins/swiper/swiper-bundle.js"></script>
      <script src="theme/plugins/shufflejs/shuffle.js"></script>
      <script src="theme/scripts/main.js"></script>
    </div>
  );
};

export default SignUp;