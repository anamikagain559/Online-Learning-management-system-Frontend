"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";

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
  { icon: <FaInstagram className="h-5 w-5" />, href: "#", label: "Instagram" },
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
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 TravelBuddy. All rights reserved.",
  legalLinks = defaultLegalLinks,
  className,
}: FooterProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  // Fetch user info safely in useEffect
  useEffect(() => {
    let isMounted = true;
    getUserInfo().then((data) => {
      if (isMounted) setUserInfo(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Build sections dynamically
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
    <footer className={cn("bg-background text-foreground py-16", className)}>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Left side: logo + description + social */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">  TravelBuddy</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <ul className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <li key={idx}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-primary"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: sections */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(sections || defaultSections).map((section, idx) => (
            <div key={idx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t pt-6 flex flex-col lg:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
        <p>{copyright}</p>
        <ul className="flex flex-wrap gap-4">
          {defaultLegalLinks.map((link, idx) => (
            <li key={idx}>
              <Link href={link.href} className="hover:text-primary">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export { Footer };
