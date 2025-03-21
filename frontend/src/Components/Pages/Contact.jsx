import React from 'react'

export default function Contact() {
  return (
<div>
  <section className="bg-white min-h-screen flex items-center justify-center px-6">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-900">Get in Touch</h2>
      <p className="text-lg text-gray-600 text-center mt-3">
        Need assistance with your interview preparation? We're here to help.
      </p>

      <form className="mt-6 space-y-5">
        {/* Name Input */}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md"
          />
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md"
          />
        </div>

        {/* Message Input */}
        <div>
          <textarea
            placeholder="Write your message here"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="w-full py-3 bg-[#011638] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
          Send Message
        </button>
      </form>
    </div>
  </section>
</div>

  )
}
