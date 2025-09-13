'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Share2, X } from 'lucide-react';

export default function ShareQR() {
  const [showQR, setShowQR] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://finance-buddy.vercel.app';

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-lg"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Finance Buddy</span>
      </button>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">Share Finance Buddy</h3>
            
            <div className="bg-white p-4 rounded-xl mb-4 inline-block">
              <QRCode value={currentUrl} size={200} />
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Scan this QR code to visit Finance Buddy
            </p>
            
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg break-all">
              {currentUrl}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
