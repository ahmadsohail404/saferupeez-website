// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // NEW: control Services hover menu explicitly
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll ONLY when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const services = [
    { href: "/gold&silver", title: "Gold & Silver" },
    { href: "/fd", title: "FD" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[hsl(var(--card))]/95 backdrop-blur-lg shadow-sm"
            : "bg-[hsl(var(--card))]/85 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/70"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center transition-transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/assets/saferupeez.svg"
                  alt="SafeRupee - Augmont Gold For All"
                  width={120}
                  height={44}
                  className="h-9 w-auto sm:h-11"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:px-8">
              <div className="flex items-center gap-1">
                <NavLink href="/about" active={isActive("/about")}>
                  About us
                </NavLink>

                {/* HOVER-CONTROLLED SERVICES MENU (no scroll lock) */}
                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen} modal={false}>
                    <DropdownMenuTrigger
                      className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] data-[state=open]:bg-[hsl(var(--muted))]"
                      onClick={(e) => e.preventDefault()} // prevent click-toggling
                    >
                      Services
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="center"
                      sideOffset={8}
                      className="min-w-[280px] rounded-xl border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2 shadow-xl backdrop-blur-lg"
                    >
                      {services.map((service) => (
                        <MenuItem
                          key={service.href}
                          href={service.href}
                          title={service.title}
                          desc={service.desc}
                        />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <NavLink href="/varsity" active={isActive("/varsity")}>
                  Varsity
                </NavLink>
                <NavLink href="/calculators" active={isActive("/calculators")}>
                  Calculators
                </NavLink>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link
                href="/login"
                className="rounded-lg bg-gradient-to-r from-black to-gray-800 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Login / Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-lg p-2 text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        {/* White Backdrop */}
        <div className="absolute inset-0 bg-white transition-opacity" onClick={toggleMobileMenu} />

        {/* Menu Content */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-full bg-[hsl(var(--card))] shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Navigation Links */}
            <div className="flex-1 p-6">
              <nav className="space-y-4">
                <MobileNavLink href="/about" active={isActive("/about")} onClick={toggleMobileMenu}>
                  About us
                </MobileNavLink>

                {/* Services Section */}
                <div className="space-y-3">
                  <div className="px-3 py-2 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                    Services
                  </div>
                  <div className="space-y-2">
                    {services.map((service) => (
                      <MobileServiceLink
                        key={service.href}
                        href={service.href}
                        active={isActive(service.href)}
                        onClick={toggleMobileMenu}
                        title={service.title}
                        desc={service.desc}
                      />
                    ))}
                  </div>
                </div>

                <MobileNavLink
                  href="/varsity"
                  active={isActive("/varsity")}
                  onClick={toggleMobileMenu}
                >
                  Varsity
                </MobileNavLink>
              </nav>
            </div>

            {/* Auth Section */}
            <div className="border-t border-[hsl(var(--border))] p-6">
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={toggleMobileMenu}
                  className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-black to-gray-800 px-4 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
                >
                  Login to Account
                </Link>
                <div className="text-center">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">New to SafeRupee? </span>
                  <Link
                    href="/register"
                    onClick={toggleMobileMenu}
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* No spacer needed for sticky header */}
    </>
  );
}

// Desktop NavLink Component
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "text-black bg-[hsl(var(--gold))]/20 font-semibold"
          : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
      }`}
    >
      {children}
      {active && (
        <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-[hsl(var(--gold))] rounded-full" />
      )}
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${
        active
          ? "bg-[hsl(var(--gold))]/20 text-black font-semibold border border-[hsl(var(--gold))]/30"
          : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Service Link with Description
function MobileServiceLink({
  href,
  active,
  onClick,
  title,
  desc,
}: {
  href: string;
  active?: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-xl px-4 py-3 transition-all ${
        active
          ? "bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/30"
          : "hover:bg-[hsl(var(--muted))]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
            active ? "bg-[hsl(var(--gold))]" : "bg-[hsl(var(--muted-foreground))]"
          }`}
        />
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${active ? "text-black" : "text-[hsl(var(--foreground))]"}`}>
            {title}
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{desc}</span>
        </div>
      </div>
    </Link>
  );
}

// Desktop Dropdown Menu Item
function MenuItem({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className="flex w-full items-start gap-3 rounded-lg p-3 transition-all hover:bg-[hsl(var(--muted))] focus:bg-[hsl(var(--muted))] outline-none cursor-pointer"
      >
        <div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--gold))] flex-shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{title}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{desc}</span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
}
