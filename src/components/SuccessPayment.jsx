import React, { useState, useEffect } from 'react';
import getQRCode from '../api/qrApi';

const SuccessPayment = () => {
  const [showCard, setShowCard] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [phone, setPhone] = useState('');
  const [isLoadingQr, setIsLoadingQr] = useState(true);
  const [qrError, setQrError] = useState(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');

    if (storedPhone) {
      setPhone(storedPhone.toString());

      // Fetch QR Code
      const fetchQr = async () => {
        try {
          setIsLoadingQr(true);
          const data = await getQRCode(`whatsapp:${storedPhone}`);
          console.log(data);

          setQrCode(data);
          setQrError(null);
        } catch (error) {
          console.error('Failed to get QR code:', error);
          setQrError(error.message || 'Failed to load QR code');
        } finally {
          setIsLoadingQr(false);
        }
      };

      fetchQr();
    } else {
      setIsLoadingQr(false);
    }

    // Animate elements in sequence
    setTimeout(() => setShowCard(true), 300);
    setTimeout(() => setShowButton(true), 800);
  }, []);

  const handleGoHome = () => {
    console.log('Navigating to home...');
    // Clear localStorage before navigating
    localStorage.removeItem('phone');
    window.location.href = '/';
  };

  return (
    <>
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-200/20 rounded-full animate-ping"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Success Card with Enhanced Animation */}
          <div
            className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all duration-1000 transform ${
              showCard
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-8 opacity-0 scale-95'
            }`}>
            {/* Success Icon Section */}
            <div className="bg-green-500 px-8 py-16 text-center relative overflow-hidden">
              <div className="relative">
                {/* Multi-layered Success Icon */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                  {/* Outer rotating ring */}
                  <div
                    className="absolute inset-0 border-4 border-white/30 rounded-full animate-spin"
                    style={{ animationDuration: '4s' }}
                  />

                  {/* Middle pulsing ring */}
                  <div className="absolute inset-2 border-2 border-white/50 rounded-full animate-pulse" />

                  {/* Inner success icon */}
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Text with Animation */}
              <div className="relative">
                <h1 className="text-3xl font-bold text-white mb-3">
                  Registration Successful!
                </h1>
                <p className="text-green-100 text-sm leading-relaxed">
                  Your profile has been created successfully
                </p>
                {phone && (
                  <p className="text-green-100 text-xs mt-2 opacity-75">
                    Phone: {phone}
                  </p>
                )}
              </div>
            </div>

            <div className="px-8 py-8 relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-8 right-8 h-px bg-green-200" />

              {/* QR Code Section */}
              <div className="bg-green-50 rounded-2xl p-6 mb-6 border border-green-100">
                <div className="text-center">
                  <div className="text-green-600 font-medium mb-4">
                    Welcome to Fasting Coach!
                  </div>

                  {/* QR Code Display */}
                  <div className="flex flex-col items-center space-y-3">
                    {isLoadingQr ? (
                      // Loading State
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                      </div>
                    ) : qrError ? (
                      // Error State
                      <div className="w-32 h-32 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center">
                        <svg
                          className="w-8 h-8 text-red-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span className="text-xs text-red-600 text-center px-2">
                          {qrError}
                        </span>
                      </div>
                    ) : qrCode ? (
                      // QR Code Display
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        {qrCode.qrCodeDataUrl && (
                          <img
                            src={qrCode.qrCodeDataUrl}
                            alt="QR Code"
                            className="w-48 h-48 object-contain"
                          />
                        )}
                      </div>
                    ) : (
                      // No QR Code available
                      <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500 text-center">
                          No QR Code
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm max-w-xs">
                      Start your fasting journey, scan the QR code to connect
                      with your personal AI coach on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Button */}
              <div
                className={`transition-all duration-1000 transform ${
                  showButton
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}>
                <button
                  onClick={handleGoHome}
                  className="group w-full cursor-pointer bg-green-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden">
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <span className="relative flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Back to Home
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPayment;
