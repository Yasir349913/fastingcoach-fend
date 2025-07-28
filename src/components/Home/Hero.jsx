import React, { useRef, useEffect, useState } from 'react';
import Form from './Form';

const Hero = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const text = 'Your 72-Hour Fasting Journey';
    let currentIndex = 0;
    let isTyping = true;
    let timeoutId;

    const typeWriter = () => {
      if (!isAnimating) return;

      if (isTyping) {
        if (currentIndex < text.length) {
          setCurrentText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeWriter, 80); // Slightly faster typing
        } else {
          // Pause at the end before starting to delete
          timeoutId = setTimeout(() => {
            isTyping = false;
            typeWriter();
          }, 2500);
        }
      } else {
        if (currentIndex > 0) {
          setCurrentText(text.slice(0, currentIndex - 1));
          currentIndex--;
          timeoutId = setTimeout(typeWriter, 40); // Faster deletion
        } else {
          // Pause before starting to type again
          timeoutId = setTimeout(() => {
            isTyping = true;
            typeWriter();
          }, 1000);
        }
      }
    };

    // Start the animation after component mounts
    const startTimeout = setTimeout(() => {
      typeWriter();
    }, 500);

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      if (isAnimating) {
        setShowCursor((prev) => !prev);
      }
    }, 530);

    return () => {
      setIsAnimating(false);
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center p-10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Content */}
        <div className="text-center lg:text-left">
          {/* AI Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full mb-6 shadow-lg">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            AI-Powered WhatsApp Coach
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span
              ref={textRef}
              className="inline-block relative font-mono text-red-600 will-change-contents"
              style={{
                minHeight: '1.2em',
                minWidth: '1ch', // Prevents layout shift
              }}>
              {currentText}
              <span
                ref={cursorRef}
                className={`inline-block w-[3px] h-[1em] bg-red-600 ml-1 transition-opacity duration-100 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  verticalAlign: 'top',
                  transform: 'translateZ(0)', // Hardware acceleration
                }}
              />
            </span>
            <br />
            <span className="text-gray-700"> Starts Now</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Get daily guidance, support, and motivation from our AI-powered
            WhatsApp coach. Personalized fasting plans with real-time support.
            <span className="block mt-2 font-semibold text-red-600">
              One-time payment. Lifetime benefits.
            </span>
          </p>

          {/* Features list */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
            {[
              { icon: 'text-red-500', text: '24/7 WhatsApp Support' },
              { icon: 'text-pink-500', text: 'AI Personalization' },
              { icon: 'text-rose-500', text: 'Progress Tracking' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg
                  className={`w-5 h-5 ${feature.icon} mr-2`}
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/user"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-full transition duration-300 transform hover:-translate-y-1">
              Start My Fast
            </a>
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="relative">
          <div className="relative mx-auto max-w-sm">
            {/* Phone mockup */}
            <div className="relative bg-gray-900 rounded-[2.5rem] p-2">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Phone header */}
                <div className="bg-red-600 px-4 py-6 text-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">FastingCoach AI</h3>
                      <p className="text-red-100 text-sm">Online now</p>
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-4 bg-gray-50 min-h-[400px]">
                  <div className="flex">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm">
                        Hi! I'm your AI fasting coach. Ready to start your
                        72-hour journey? 🌟
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-red-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                      <p className="text-sm">Yes, I'm ready!</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm">
                        Great! I'll guide you through each phase with
                        personalized tips and motivation 💪
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm">
                        Hour 12: You're doing amazing! Stay hydrated and
                        remember why you started 🚰
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <span className="text-gray-500 text-sm flex-1">
                      How are you feeling?
                    </span>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
              AI Powered
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-red-200">
              72h Journey
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg w-10 h-10 flex items-center justify-center">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
