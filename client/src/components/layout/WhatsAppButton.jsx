import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Sub-buttons */}
      {open && (
        <div className="flex flex-col items-end gap-2">
          {/* Canada */}
          <a
            href="https://wa.me/14373755674"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            <FaWhatsapp className="text-lg" />
            Canada — (437) 375-5674
          </a>

          {/* USA */}
          <a
            href="https://wa.me/18043265442"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            <FaWhatsapp className="text-lg" />
            USA — (804) 326-5442
          </a>
        </div>
      )}

      {/* Main WhatsApp button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110"
        aria-label="WhatsApp"
      >
        {open ? <FaTimes className="text-2xl" /> : <FaWhatsapp className="text-3xl" />}
      </button>
    </div>
  );
};

export default WhatsAppButton;
