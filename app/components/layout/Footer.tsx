"use client";

import { useState } from "react";
import Link from "next/link";
import CountrySelectorModal from "../ui/country-selector-modal";
import { Facebook, Instagram, Pin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  const footerLinks = {
    help: [
      { label: "HELP", href: "#" },
      { label: "MY PURCHASES", href: "#" },
      { label: "RETURNS", href: "#" },
    ],
    company: [
      { label: "COMPANY", href: "#" },
      { label: "WORK FOR MANGO", href: "#" },
      { label: "PRESS", href: "#" },
    ],
    legal: [
      { label: "PRIVACY POLICY AND COOKIES", href: "#" },
      { label: "TERMS AND CONDITIONS", href: "#" },
      { label: "ETHICS CHANNEL", href: "#" },
    ],
    responsibility: [
      { label: "RESPONSIBILITY", href: "#" },
      { label: "STORES", href: "#" },
    ],
  };

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      label: "Pinterest",
      href: "#",
      icon: Pin,
    },
    {
      label: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      label: "YouTube",
      href: "#",
      icon: Youtube,
    },
  ];

  return (
    <footer className="bg-white">
      {/* Main Footer Links */}
      <div className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowCountrySelector(true)}
              className="text-sm hover:opacity-70 flex items-center gap-2 cursor-pointer"
            >
              INDIA
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              );
            })}
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key} className="space-y-4">
                {links.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href} className="hover:opacity-70 text-sm">
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CountrySelectorModal
        isOpen={showCountrySelector}
        onClose={() => setShowCountrySelector(false)}
      />
    </footer>
  );
}
