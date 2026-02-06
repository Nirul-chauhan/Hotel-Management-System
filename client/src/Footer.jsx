import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Room Booking", path: "/Book" },
    { name: "Guest Registration", path: "/Register" },
    { name: "Manage Hotels", path: "/manage_hotels" },
    { name: "View Bookings", path: "/bookings" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-blue-400" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-600" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="relative bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="./icons8-5-star-hotel-96.png" className="h-10 w-10" alt="Hotel Logo" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Hotel Management
              </h2>
            </div>
            <p className="text-sm leading-relaxed">
              Streamline your hotel operations with our comprehensive management system. Efficient, reliable, and easy to use.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${social.color} transition-all duration-200 hover:scale-110 hover:shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <span className="text-sm">123 Hotel Street, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <a href="tel:+911234567890" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  +91 1234567890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <a href="mailto:support@hotelmanagement.com" className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  support@hotelmanagement.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Hotel Management System. All rights reserved.
            </p>
            
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Developed with</span>
              <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400">by Nirul</span>
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> @Nirul Chauhan</span>
            </div>

            <div className="flex gap-4 text-sm">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
