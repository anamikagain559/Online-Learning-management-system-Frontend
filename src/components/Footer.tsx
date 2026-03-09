"use client";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Plane, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="h-5 w-5" />,
    href: "#",
    label: "Instagram",
  },
  { icon: <FaFacebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = ({
  sections,
  description = "Connect with like-minded travelers, plan unforgettable adventures, and explore the world together.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} TravelBuddy. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  className,
}: FooterProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    getUserInfo().then((data) => {
      if (isMounted) setUserInfo(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const defaultSections = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "Explore Travelers", href: "/explore" },
        { name: "Match", href: "/match" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "Subscription", href: "/subscription" },
        { name: "All User", href: "/allUser" },
        ...(userInfo ? [{ name: "Dashboard", href: "/dashboard" }] : []),
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer
      className={cn(
        "relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden",
        className
      )}
    >
      {/* decorative blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* ── Brand column ── */}
          <div className="flex flex-col gap-6 lg:w-1/3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Travel
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Buddy
                </span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {description}
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400" />
                hello@travelbuddy.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-400" />
                San Francisco, CA
              </div>
            </div>

            {/* Socials */}
            <ul className="flex gap-3 mt-2">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Link columns ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {(sections || defaultSections).map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        <span className="h-px w-0 bg-indigo-400 group-hover:w-3 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter row ── */}
        <div className="mt-14 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-white">Stay Updated</h4>
            <p className="text-sm text-slate-400">
              Get the latest travel tips and community updates.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-l-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="px-6 py-2.5 rounded-r-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>{copyright}</p>
          <ul className="flex flex-wrap gap-6">
            {defaultLegalLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
