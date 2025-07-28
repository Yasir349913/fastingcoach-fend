import React from 'react';

const steps = [
  {
    icon: '💳',
    title: 'Make Payment',
    description: 'Securely pay using Stripe, Google Pay, or Apple Pay.',
  },
  {
    icon: '💬',
    title: 'Get WhatsApp Access',
    description: 'Instantly connect to our WhatsApp bot for fasting guidance.',
  },
  {
    icon: '🕐',
    title: 'Start Fasting Journey',
    description: 'Follow easy step-by-step instructions sent to your WhatsApp.',
  },
];

const HowItWorks = () => {
  return (
    <section
      className="py-20 text-center relative overflow-hidden"
      id="how-it-works">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            How It <span className="text-red-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with your fasting journey in just 3 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
              {/* Step Number */}
              <div className="absolute -top-4 left-8 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Connection Lines (Desktop Only) */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <div className="flex justify-between items-center px-20">
            <div className="w-20 h-0.5 bg-gradient-to-r from-red-400 to-pink-400 opacity-30"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-red-400 to-pink-400 opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
