// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Auth from "../components/auth";
import React from "react";

const CLOSE_DELAY = 200;

export default function Navbar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => pathname === href;

  /* ------------------------ Scroll Handler ------------------------ */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------ Close Mobile Menu on Route Change ------------------------ */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ------------------------ Disable Body Scroll ------------------------ */
  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || authOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, authOpen]);

  /* ------------------------ ESC Key for Auth ------------------------ */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAuthOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ------------------------ Services Hover Logic ------------------------ */
  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), CLOSE_DELAY);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const services = [
    { href: "/gold&silver", title: "Gold & Silver" },
    {
      href: "/fd",
      title: "Fixed Deposit",
      disabled: true,
      chip: "Coming soon",
    },
  ];

  return (
    <>
      {/* ------------------------------ NAVBAR ------------------------------ */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[hsl(var(--card))]/95 backdrop-blur-lg shadow-sm"
            : "bg-[hsl(var(--card))]/85 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/70"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* ------------------------------ LOGO ------------------------------ */}
            <div className="flex items-center sm:-ml-10 lg:-ml-30">
              <Link
                href="/"
                className="flex items-center transition-transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/assets/saferupeez.svg"
                  alt="SafeRupee"
                  width={140}
                  height={50}
                  className="h-12 w-auto sm:h-14"
                  priority
                />
              </Link>
            </div>

            {/* ------------------------------ DESKTOP NAVIGATION ------------------------------ */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
              <div className="flex items-center gap-4">
                <NavLink href="/about" active={isActive("/about")}>
                  About us
                </NavLink>

                {/* ------------------------------ SERVICES DROPDOWN ------------------------------ */}
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <DropdownMenu
                    open={servicesOpen}
                    onOpenChange={setServicesOpen}
                    modal={false}
                  >
                    <DropdownMenuTrigger
                      className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-base font-medium text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))] hover:text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Services
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="center"
                      sideOffset={10}
                      className="min-w-[320px] rounded-2xl border border-black/10 bg-white p-3 shadow-2xl backdrop-blur-xl"
                    >
                      {services.map((service, index) => (
                        <React.Fragment key={service.href}>
                          <MenuItem
                            href={service.href}
                            title={service.title}
                            disabled={service.disabled}
                            chip={service.chip}
                          />
                          {index === 0 && (
                            <hr className="my-2 border-t border-gray-200" />
                          )}
                        </React.Fragment>
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

                <NavLink href="/help" active={isActive("/help")}>
                  Help
                </NavLink>
              </div>
            </div>

            {/* ------------------------------ DESKTOP LOGIN BUTTON ------------------------------ */}
            <div className="hidden lg:flex lg:items-center lg:gap-3 ml-auto mr-[-55]">
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-xl bg-gradient-to-r from-black to-gray-900 px-7 py-3 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Login / Register
              </button>
            </div>

            {/* ------------------------------ MOBILE MENU BUTTON ------------------------------ */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ------------------------------ MOBILE MENU ------------------------------ */}
      <div
        className={`fixed inset-0 top-20 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-white" onClick={toggleMobileMenu} />

        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 p-6">
              <nav className="space-y-5 text-lg font-medium">
                <MobileNavLink
                  href="/about"
                  active={isActive("/about")}
                  onClick={toggleMobileMenu}
                >
                  About us
                </MobileNavLink>

                {/* SERVICES - MOBILE */}
                <div className="space-y-2">
                  <p className="px-3 py-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Services
                  </p>

                  {services.map((service) =>
                    service.disabled ? (
                      <MobileServiceDisabled
                        key={service.href}
                        title={service.title}
                        chip={service.chip}
                      />
                    ) : (
                      <MobileServiceLink
                        key={service.href}
                        href={service.href}
                        title={service.title}
                        active={isActive(service.href)}
                        onClick={toggleMobileMenu}
                      />
                    )
                  )}
                </div>

                <MobileNavLink
                  href="/varsity"
                  active={isActive("/varsity")}
                  onClick={toggleMobileMenu}
                >
                  Varsity
                </MobileNavLink>

                <MobileNavLink
                  href="/calculators"
                  active={isActive("/calculators")}
                  onClick={toggleMobileMenu}
                >
                  Calculators
                </MobileNavLink>

                <MobileNavLink
                  href="/help"
                  active={isActive("/help")}
                  onClick={toggleMobileMenu}
                >
                  Help
                </MobileNavLink>
              </nav>
            </div>

            {/* MOBILE AUTH BUTTON */}
            <div className="border-t p-6">
              <button
                onClick={() => {
                  toggleMobileMenu();
                  setAuthOpen(true);
                }}
                className="block w-full text-center rounded-xl bg-black px-5 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl"
              >
                Login to Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ AUTH MODAL ------------------------------ */}
      {authOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="rounded-2xl w-full max-w-md shadow-2xl animate-scaleIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Auth onClose={() => setAuthOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================================================
 *  HELPER COMPONENTS
 * ====================================================================================== */

function NavLink({ href, active, children }: any) {
  return (
    <Link
      href={href}
      className={`relative rounded-xl px-5 py-2.5 text-base font-medium transition-all ${
        active
          ? "text-black bg-[hsl(var(--gold))]/20 font-semibold"
          : "text-black-800 hover:bg-black-100 hover:text-black"
      }`}
    >
      {children}
      {active && (
        <div className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[hsl(var(--gold))] rounded-full" />
      )}
    </Link>
  );
}

function MobileNavLink({ href, active, children, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-xl px-4 py-3 text-lg transition-all ${
        active
          ? "bg-yellow-100 text-black font-semibold"
          : "text-black-800 hover:bg-black-100"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileServiceLink({ href, active, onClick, title }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-xl px-4 py-3 text-lg transition-all ${
        active ? "bg-yellow-100" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
      </div>
    </Link>
  );
}

function MobileServiceDisabled({ title, chip }: any) {
  return (
    <div className="block rounded-xl px-4 py-3 bg-gray-100 opacity-70 pointer-events-none">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{title}</span>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
          {chip}
        </span>
      </div>
      <span className="text-sm text-gray-400">Unavailable</span>
    </div>
  );
}

function MenuItem({ href, title, disabled, chip }: any) {
  if (disabled) {
    return (
      <DropdownMenuItem
        disabled
        className="flex w-full items-start gap-3 rounded-xl p-3 cursor-not-allowed opacity-70"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">{title}</span>
            {chip && (
              <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                {chip}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">Unavailable</span>
        </div>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className="flex w-full items-start gap-3 rounded-xl p-3 hover:bg-gray-100 transition-all cursor-pointer"
      >
        <div className="flex flex-col">
          <span className="text-base font-semibold">{title}</span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
}
