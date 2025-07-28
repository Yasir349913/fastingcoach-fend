import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addUser from '../../api/userApi';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

// Toast Component
const Toast = ({ message, type = 'info', onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = iconMap[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm animate-in slide-in-from-top-2 ${typeStyles[type]}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-0.5 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast management
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Auto dismiss after 5 seconds
  };

  const closeToast = () => {
    setToast(null);
  };

  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/[^\d+]/g, '');

    if (cleaned.length > 0 && !cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }

    if (cleaned.length > 16) {
      cleaned = cleaned.slice(0, 16);
    }

    return cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+\d{7,15}$/.test(formData.phone)) {
      newErrors.phone =
        'Please enter a valid international phone number (e.g., +923250042003)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting form data:', formData);

      const response = await addUser(formData);
      console.log('Response:', response);

      // Handle different success scenarios and navigate to success page
      if (response.message === 'User already exists with pending status.') {
        showToast('Profile updated! Redirecting...', 'warning');
      } else if (response.message === 'User created successfully') {
        showToast('Profile created successfully! Redirecting...', 'success');
      } else {
        showToast('Profile saved successfully! Redirecting...', 'success');
      }

      localStorage.setItem('phone', formData.phone);
      setTimeout(() => navigate('/success'), 100);
    } catch (error) {
      // Handle different error scenarios
      if (error.response?.status === 400) {
        const errorMessage =
          error.response.data?.message || 'Phone number already exists';

        if (errorMessage.includes('Phone number already exists')) {
          showToast('This phone number is already registered.', 'error');
        } else if (
          errorMessage.includes('Please provide name and phone number')
        ) {
          showToast('Name and phone number are required.', 'error');
        } else {
          showToast(errorMessage, 'error');
        }
      } else if (error.response?.status === 500) {
        showToast('Server error. Please try again later.', 'error');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        showToast(
          'Network error. Please check your connection and try again.',
          'error'
        );
      } else {
        showToast('Something went wrong. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo/Brand Area */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 text-sm">
              We need a few details to get you started
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 transition-all duration-200
                  ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                      : 'border-gray-300 focus:ring-red-100 focus:border-red-400'
                  }`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 transition-all duration-200
                  ${
                    errors.phone
                      ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                      : 'border-gray-300 focus:ring-red-100 focus:border-red-400'
                  }`}
                placeholder="+447911123456"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
                ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 active:bg-red-800'
                }`}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Continue'
              )}
            </button>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
