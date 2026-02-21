import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import xLogo from '../assets/x.png';
import slide2 from '../assets/slide2.jpg';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); };

  return (
    <div className="bg-black text-white">

      {/* ── Hero ── */}
      <section
        className="relative h-56 sm:h-72 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide uppercase">Contact Us</h1>
          <p className="mt-2 text-sm text-gray-300">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-red-500">Contact Us</span>
          </p>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={xLogo} alt="X" className="w-5 h-5 object-contain" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            CONTACT <span className="text-red-600">INFORMATION</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-3">
            We're available across Canada and the USA. Reach out to the nearest warehouse or fill in the form and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: <FaMapMarkerAlt className="text-2xl" />,
              title: 'Canada Warehouse',
              lines: ['857 Winterton Way,', 'Mississauga, ON L5V 1Z5'],
            },
            {
              icon: <FaMapMarkerAlt className="text-2xl" />,
              title: 'USA Warehouse',
              lines: ['11815 Medway Church Loop,', 'Manassas, VA 20109'],
            },
            {
              icon: <FaPhone className="text-2xl" />,
              title: 'Phone Numbers',
              lines: ['CA: (437) 375-5674', 'USA: (804) 326-5442'],
            },
            {
              icon: <FaEnvelope className="text-2xl" />,
              title: 'Email Address',
              lines: ['Info@Xtrememobiletire.com'],
            },
          ].map(({ icon, title, lines }) => (
            <div
              key={title}
              className="bg-[#111] border border-gray-800 hover:border-red-600 rounded-lg p-6 text-center group transition"
            >
              <div className="w-14 h-14 bg-red-600 group-hover:bg-red-700 rounded-full flex items-center justify-center text-white mx-auto mb-4 transition">
                {icon}
              </div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-3">{title}</h3>
              {lines.map((line, i) => (
                <p key={i} className="text-gray-400 text-xs leading-relaxed">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* ── Form + Map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Form */}
          <div className="bg-[#111] border border-gray-800 rounded-lg p-8">
            <h3 className="text-white font-extrabold text-xl mb-1">Send Us a Message</h3>
            <p className="text-gray-400 text-xs mb-6">Fill out the form below and our team will respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    required
                    className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded text-sm outline-none transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (000) 000-0000"
                    className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded text-sm outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Tire Change Request"
                    className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded text-sm outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  required
                  className="w-full bg-black border border-gray-700 focus:border-red-600 text-white placeholder-gray-600 px-4 py-3 rounded text-sm outline-none transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right — Hours + Social + Map */}
          <div className="flex flex-col gap-6">

            {/* Business Hours */}
            <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-white text-sm" />
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide">Business Hours</h3>
              </div>
              <ul className="space-y-2">
                {[
                  { day: 'Monday – Friday', hours: '24 Hours' },
                  { day: 'Saturday', hours: '24 Hours' },
                  { day: 'Sunday', hours: '24 Hours' },
                  { day: 'Emergency / Roadside', hours: '24/7 Available' },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex justify-between text-xs border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-400">{day}</span>
                    <span className="text-red-500 font-semibold">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: <FaFacebookF />, label: 'Facebook' },
                  { icon: <FaTwitter />, label: 'Twitter' },
                  { icon: <FaInstagram />, label: 'Instagram' },
                  { icon: <FaYoutube />, label: 'YouTube' },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Google Map — Canada warehouse */}
            <div className="rounded-lg overflow-hidden border border-gray-800 flex-1 min-h-[200px]">
              <iframe
                title="Xtreme Mobile Tire - Canada Warehouse"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.123456789!2d-79.6441!3d43.5890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s857+Winterton+Way%2C+Mississauga%2C+ON+L5V+1Z5!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '220px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA Strip ── */}
      <section className="bg-red-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-extrabold text-lg">Need Emergency Tire Help?</h3>
            <p className="text-red-200 text-sm">We're available 24/7 for roadside assistance across Canada & USA.</p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:4373755674"
              className="bg-white text-red-600 hover:bg-gray-100 px-5 py-2.5 rounded font-bold text-sm transition"
            >
              CA: (437) 375-5674
            </a>
            <a
              href="tel:8043265442"
              className="bg-black/30 hover:bg-black/50 text-white border border-white/30 px-5 py-2.5 rounded font-bold text-sm transition"
            >
              USA: (804) 326-5442
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
