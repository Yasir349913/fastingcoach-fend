import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1';

const getQRCode = async (from) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/twilio/qr`,
      { From: from },
      { responseType: 'blob' } // 👈 expect image as blob
    );

    const blob = response.data;
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob); // 👈 convert blob to base64 DataURL
    });

    return {
      qrCodeDataUrl: dataUrl,
      whatsappUrl: `https://wa.me/${from.replace('whatsapp:', '')}`,
    };
  } catch (error) {
    console.error('QR Code fetch error:', error);
    throw error;
  }
};

export default getQRCode;
