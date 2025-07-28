import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'You can return items within 30 days.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Use the tracking number in your email.',
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes, 24/7 live chat and email support.',
  },
  {
    question: 'Are there any discounts for bulk orders?',
    answer: 'Yes, contact us for bulk pricing.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use top-grade encryption.',
  },
  {
    question: 'Can I change my order?',
    answer: 'You can modify within 2 hours of placing it.',
  },
  {
    question: 'Where do you ship?',
    answer: 'We ship worldwide with some exceptions.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: "Log in and click 'Cancel Subscription'.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our fasting coaching service
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 overflow-hidden ${
                openIndex === index ? 'ring-2 ring-red-200 shadow-xl' : ''
              }`}>
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer p-6 hover:bg-red-50 transition-colors duration-300">
                <h4
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    openIndex === index
                      ? 'text-red-600'
                      : 'text-gray-800 group-hover:text-red-600'
                  }`}>
                  {faq.question}
                </h4>
                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-red-100 text-red-600 rotate-180'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-600'
                  }`}>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Answer section */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-red-200 to-pink-200 mb-4"></div>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
