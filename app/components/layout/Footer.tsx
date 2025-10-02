"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CountrySelectorModal from "../ui/country-selector-modal";
import {
  Loader2,
  Facebook,
  Instagram,
  Pin,
  Twitter,
  Youtube,
  Linkedin,
  Send, // for Telegram (lucide-react "Send")
  Phone, // for Skype (or use a custom icon)
  MessageCircle, // for Snapchat
  Music, // for TikTok
} from "lucide-react";
import { DynamicPageItem, StoreSocial } from "@/lib/types";

export default function Footer() {
  const [showCountrySelector, setShowCountrySelector] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageListdata, setPageListdata] = useState([]);
  const [storeSocialLinks, setStoreSocialLinks] = useState<StoreSocial>();

  const fetchPagesData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/page`);
      const pagesData = await response.json();
      setPageListdata(pagesData?.pageListData);
      setStoreSocialLinks(pagesData?.storeSocialData);
    } catch (error) {
      console.error("Error fetching header data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPagesData();
  }, []);

  // const footerLinks = {
  //   help: [
  //     { label: "HELP", href: "#" },
  //     { label: "MY PURCHASES", href: "#" },
  //     { label: "RETURNS", href: "#" },
  //   ],
  //   company: [
  //     { label: "COMPANY", href: "#" },
  //     { label: "WORK FOR MANGO", href: "#" },
  //     { label: "PRESS", href: "#" },
  //   ],
  //   legal: [
  //     { label: "PRIVACY POLICY AND COOKIES", href: "#" },
  //     { label: "TERMS AND CONDITIONS", href: "#" },
  //     { label: "ETHICS CHANNEL", href: "#" },
  //   ],
  //   responsibility: [
  //     { label: "RESPONSIBILITY", href: "#" },
  //     { label: "STORES", href: "#" },
  //   ],
  // };

  // const socialLinks = [
  //   {
  //     label: "Facebook",
  //     href: storeSocialLinks?.socialFacebook || "#",
  //     icon: Facebook,
  //   },
  //   {
  //     label: "Instagram",
  //     href: storeSocialLinks?.socialInstagram || "#",
  //     icon: Instagram,
  //   },
  //   {
  //     label: "Pinterest",
  //     href: storeSocialLinks?.socialPinterest || "#",
  //     icon: Pin,
  //   },
  //   {
  //     label: "Twitter",
  //     href: storeSocialLinks?.socialTwitter || "#",
  //     icon: Twitter,
  //   },
  //   {
  //     label: "YouTube",
  //     href: storeSocialLinks?.socialYoutube || "#",
  //     icon: Youtube,
  //   },
  // ];

  const socialLinks = [
    {
      label: "Facebook",
      href: storeSocialLinks?.socialFacebook || "#",
      icon: Facebook,
      isHidden: !storeSocialLinks?.socialFacebook,
    },
    {
      label: "Instagram",
      href: storeSocialLinks?.socialInstagram || "#",
      icon: Instagram,
      isHidden: !storeSocialLinks?.socialInstagram,
    },
    {
      label: "Pinterest",
      href: storeSocialLinks?.socialPinterest || "#",
      icon: Pin,
      isHidden: !storeSocialLinks?.socialPinterest,
    },
    {
      label: "Twitter",
      href: storeSocialLinks?.socialTwitter || "#",
      icon: Twitter,
      isHidden: !storeSocialLinks?.socialTwitter,
    },
    {
      label: "YouTube",
      href: storeSocialLinks?.socialYoutube || "#",
      icon: Youtube,
      isHidden: !storeSocialLinks?.socialYoutube,
    },
    // {
    //   label: "Tumblr",
    //   href: storeSocialLinks?.socialTumblr || "#",
    //   icon: Tumblr,
    //   isHidden: !storeSocialLinks?.socialTumblr,
    // },
    {
      label: "LinkedIn",
      href: storeSocialLinks?.socialLinkedin || "#",
      icon: Linkedin,
      isHidden: !storeSocialLinks?.socialLinkedin,
    },
    {
      label: "Telegram",
      href: storeSocialLinks?.socialTelegram || "#",
      icon: Send,
      isHidden: !storeSocialLinks?.socialTelegram,
    },
    {
      label: "Skype",
      href: storeSocialLinks?.socialSkype || "#",
      icon: Phone,
      isHidden: !storeSocialLinks?.socialSkype,
    },
    {
      label: "Snapchat",
      href: storeSocialLinks?.socialSnapchat || "#",
      icon: MessageCircle,
      isHidden: !storeSocialLinks?.socialSnapchat,
    },
    {
      label: "TikTok",
      href: storeSocialLinks?.socialTiktok || "#",
      icon: Music,
      isHidden: !storeSocialLinks?.socialTiktok,
    },
  ];

  return (
    <footer className="bg-white">
      {/* Main Footer Links */}
      <div className="py-8 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
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
          <div className="flex flex-wrap justify-center sm:gap-x-6 gap-x-4 sm:gap-y-4 gap-y-4 mb-8">
            {socialLinks
              .filter((link) => !link.isHidden)
              .map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label={link.label}
                    target="_blank"
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
            {/* {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label={link.label}
                  target="_blank"
                >
                  <Icon className="w-6 h-6" />
                </Link>
              );
            })} */}
          </div>

          {/* Footer Links Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
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
          </div> */}
          {isLoading ? (
            <div className="flex items-center space-x-2 justify-center p-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-base text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-1 md:gap-y-4">
              {pageListdata.length > 0 &&
                pageListdata.map((pageItem: DynamicPageItem, idx) => (
                  <Link
                    key={idx}
                    href={`/p/${pageItem?.pageUrl}`}
                    className="hover:opacity-70 sm:text-sm text-[13px] uppercase"
                  >
                    {pageItem?.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      <CountrySelectorModal
        isOpen={showCountrySelector}
        onClose={() => setShowCountrySelector(false)}
      />
    </footer>
  );
}
