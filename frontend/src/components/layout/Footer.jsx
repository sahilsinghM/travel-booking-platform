import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import api from '../../services/api';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-ocean-blue-600 to-mint-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">{settings?.siteInfo?.name || 'TravelBooking'}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings?.footer?.companyInfo || 'Discover amazing destinations and create unforgettable memories with our carefully curated travel packages.'}
            </p>
            <div className="flex space-x-4">
              {settings?.contact?.socialMedia?.facebook && (
                <a href={settings.contact.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ocean-blue-400 transition-colors duration-200">
                  <FiFacebook size={20} />
                </a>
              )}
              {settings?.contact?.socialMedia?.twitter && (
                <a href={settings.contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ocean-blue-400 transition-colors duration-200">
                  <FiTwitter size={20} />
                </a>
              )}
              {settings?.contact?.socialMedia?.instagram && (
                <a href={settings.contact.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ocean-blue-400 transition-colors duration-200">
                  <FiInstagram size={20} />
                </a>
              )}
              {settings?.contact?.socialMedia?.linkedin && (
                <a href={settings.contact.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ocean-blue-400 transition-colors duration-200">
                  <FiLinkedin size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-ocean-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-ocean-blue-400 transition-colors duration-200">
                  Travel Packages
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ocean-blue-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-ocean-blue-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Destinations</h3>
            <ul className="space-y-2">
              {(settings?.footer?.destinations || ['Goa, India', 'Manali, Himachal Pradesh', 'Kerala Backwaters', 'Andaman Islands']).slice(0, 4).map((destination, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-ocean-blue-400 transition-colors duration-200">
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="text-ocean-blue-400" size={18} />
                <span className="text-gray-300 text-sm">{settings?.contact?.email || 'support@travelqbx.in'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-ocean-blue-400" size={18} />
                <span className="text-gray-300 text-sm">{settings?.contact?.phone || '+91 9599667129'}</span>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-ocean-blue-400 mt-1" size={18} />
                <span className="text-gray-300 text-sm">
                  {settings?.contact?.address || 'Gurugram, Haryana, India'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 TravelBooking. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-ocean-blue-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-ocean-blue-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-ocean-blue-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


