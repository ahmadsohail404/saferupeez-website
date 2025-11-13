"use client";
import React from "react";
import Image from "next/image"; // Add Image import for best practice
import {
  Target,
  Eye,
  Linkedin,
  Twitter,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

export default function AboutUs() {
  const leaders = [
    {
      name: "Rajesh Kumar",
      position: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "15+ years of experience in fintech innovation and regulatory compliance, ensuring SafeRupee remains a leader in the digital wealth space.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Priya Sharma",
      position: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Expert in developing secure, scalable digital payment and asset management platforms, driving our cutting-edge technology infrastructure.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Amit Patel",
      position: "Chief Financial Officer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Former investment banking leader with a deep understanding of market trends and financial strategy, securing our long-term growth and stability.",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50/40 overflow-hidden">
      {/* Background decorative blurs (Responsive placement) */}
      <div className="absolute top-20 right-16 w-64 h-64 md:w-96 md:h-96 bg-amber-300/30 blur-[100px] md:blur-[140px] rounded-full" />
      <div className="absolute bottom-40 left-16 w-64 h-64 md:w-96 md:h-96 bg-yellow-300/25 blur-[100px] md:blur-[140px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-amber-200/20 blur-[180px] rounded-full" />

      {/* Hero Section (Responsive Typography) */}
      <div className="relative pt-16 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/50 shadow-sm">
              ⚡ Building the Future of Wealth
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-gray-900 tracking-tight">
            About Us
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing wealth creation through digital gold, silver, and
            secure fixed deposits.
          </p>
        </div>
      </div>

      {/* Stats Bar (Responsive Stacking) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-4">
              <TrendingUp className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">₹500Cr+</h3>
            <p className="text-gray-600">Assets Under Management</p>
          </div>
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-4">
              <Shield className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Secure Transactions</p>
          </div>
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-4">
              <Zap className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">5L+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Mission Section (Responsive Typography) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-5 rounded-2xl shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-gray-900">
            Our Mission
          </h2>
          <p className="text-base md:text-xl text-gray-700 text-center leading-relaxed px-2">
            To democratize wealth creation by providing seamless access to
            digital precious metals and secure fixed deposits. We empower every
            individual to build a diversified portfolio with transparency,
            security, and cutting-edge technology. Our mission is to make
            investing in gold, silver, and fixed deposits as simple as a tap on
            your screen.
          </p>
        </div>
      </div>

      {/* Vision Section (Responsive Typography) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-5 rounded-2xl shadow-lg">
              <Eye className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-gray-900">
            Our Vision
          </h2>
          <p className="text-base md:text-xl text-gray-700 text-center leading-relaxed px-2">
            To become India's most trusted digital wealth platform, where
            millions confidently invest in precious metals and fixed deposits.
            We envision a future where financial security is accessible to all,
            backed by innovation, regulatory compliance, and unwavering
            commitment to our customers' prosperity.
          </p>
        </div>
      </div>

      {/* Leaders Section (Responsive Card Layout and Sizing) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Meet Our Leaders
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            The visionaries driving innovation in digital wealth
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden 
                shadow-2xl hover:shadow-3xl transition-all duration-500 transform 
                hover:-translate-y-2 lg:hover:-translate-y-5 border border-gray-100 p-6 md:p-8"
              // REMOVED fixed minHeight for responsiveness
            >
              {/* Glow */}
              <div
                className="absolute inset-0 bg-gradient-to-br 
                from-amber-400/0 via-yellow-400/0 to-amber-500/0 
                group-hover:from-amber-400/10 group-hover:via-yellow-400/5 
                group-hover:to-amber-500/10 transition-all duration-500 pointer-events-none"
              ></div>

              {/* Top accent */}
              <div
                className="h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 
                rounded-full transform scale-x-0 group-hover:scale-x-100 
                transition-transform duration-500 origin-left"
              ></div>

              <div className="relative p-2 md:p-6">
                {/* Responsive Profile Image Size */}
                <div className="relative mb-6 md:mb-8 mx-auto w-40 h-40 lg:w-52 lg:h-52">
                  <div
                    className="absolute inset-0 bg-gradient-to-br 
                    from-amber-400 via-yellow-400 to-amber-500 rounded-3xl 
                    transform rotate-6 group-hover:rotate-12 
                    transition-transform duration-500"
                  ></div>
                  <div
                    className="relative w-full h-full rounded-3xl overflow-hidden 
                    shadow-2xl ring-4 ring-white transform group-hover:scale-110 
                    transition-transform duration-500"
                  >
                    {/* Using <img> tag as in original code, though Image is preferred */}
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Responsive Typography */}
                <h3
                  className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900 
                  group-hover:text-amber-700 transition-colors duration-300"
                >
                  {leader.name}
                </h3>

                {/* Responsive Position */}
                <p className="text-amber-600 text-center font-semibold mb-4 md:mb-5 text-base md:text-lg">
                  {leader.position}
                </p>

                {/* Responsive Bio */}
                <p className="text-gray-600 text-center text-sm md:text-base mb-6 md:mb-8 leading-relaxed px-0 md:px-4">
                  {leader.bio}
                </p>

                {/* Social Icons (Responsive Padding/Sizing) */}
                <div className="flex justify-center gap-4 md:gap-5 pt-4 md:pt-6 border-t border-gray-100">
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative p-3 md:p-4 
                    bg-gradient-to-br from-amber-50 to-yellow-50 
                    hover:from-amber-100 hover:to-yellow-100 rounded-xl 
                    transition-all duration-300 transform hover:scale-125"
                    aria-label={`${leader.name} on LinkedIn`}
                  >
                    <Linkedin className="w-6 h-6 md:w-7 md:h-7 text-amber-700" />
                    <div
                      className="absolute inset-0 rounded-xl 
                      bg-gradient-to-br from-amber-400 to-yellow-400 
                      opacity-0 group-hover/social:opacity-20 
                      transition-opacity duration-300"
                    ></div>
                  </a>

                  <a
                    href={leader.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative p-3 md:p-4 
                    bg-gradient-to-br from-amber-50 to-yellow-50 
                    hover:from-amber-100 hover:to-yellow-100 rounded-xl 
                    transition-all duration-300 transform hover:scale-125"
                    aria-label={`${leader.name} on Twitter`}
                  >
                    <Twitter className="w-6 h-6 md:w-7 md:h-7 text-amber-700" />
                    <div
                      className="absolute inset-0 rounded-xl 
                      bg-gradient-to-br from-amber-400 to-yellow-400 
                      opacity-0 group-hover/social:opacity-20 
                      transition-opacity duration-300"
                    ></div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
