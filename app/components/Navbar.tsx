"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {  ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className=" inset-x-0 top-0 z-50 bg-[hsl(var(--card))]/85 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card))]/70">
      {/* Brand bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 py-1">
          {/* Left: brand + partner */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-3">
                <Image
                  src="/assets/saferupeez.svg"
                  alt="Augmont Gold For All"
                  width={100}
                  height={40}
                  className="h-14 w-auto -my-1" // 40px visual height, trims built-in whitespace
                  priority
                /> 
              
            </Link>

            {/* Powered by Augmont (logo only; no vault/safety claims) */}
            {/* <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/logo.png"
                  alt="Augmont Gold For All"
                  width={170}
                  height={40}
                  className="h-30 w-auto -my-1" // 40px visual height, trims built-in whitespace
                  priority
                />
              </div>
            </div> */}
          </div>

          {/* Center: navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/about" active={isActive("/about")} goldOnHover>
              About us
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--muted)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]">
                Services <ChevronDown className="h-4 w-4 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="min-w-[240px] overflow-hidden rounded-lg border bg-[hsl(var(--card))] p-1 shadow-lg"
              >
                <MenuItem
                  href="/gold-fd-plus"
                  title="Gold FD+"
                  desc="Lock-in, earn on gold"
                />
                <MenuItem
                  href="/gold-sip"
                  title="Gold SIP"
                  desc="Save regularly in gold"
                />
                <MenuItem
                  href="/digital-gold"
                  title="Digital Gold"
                  desc="Buy/sell 24K 999 purity"
                />
                <MenuItem
                  href="/gold-emi"
                  title="Gold on EMI"
                  desc="Split purchases into EMIs"
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/varsity" active={isActive("/varsity")}>
              Varsity
            </NavLink>
          </div>

          {/* Right: larger black auth button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:opacity-95"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
  goldOnHover = false,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  goldOnHover?: boolean;
}) {
  const base =
    "rounded-md px-3.5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]";
  const normal =
    "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.6)]";
  const gold =
    "text-[hsl(var(--foreground))] hover:text-black hover:bg-[hsl(var(--gold))]/80";
  const activeCls = "bg-[hsl(var(--gold))]/25 text-[hsl(var(--foreground))]";

  return (
    <Link
      href={href}
      className={[base, active ? activeCls : goldOnHover ? gold : normal].join(
        " "
      )}
    >
      {children}
    </Link>
  );
}

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
    <DropdownMenuItem
      asChild
      className="group rounded-md px-2 py-2.5 transition hover:bg-[hsl(var(--muted)/0.6)]"
    >
      <Link href={href} className="flex w-full items-start gap-3">
        <div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--gold))] transition group-hover:scale-125" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {desc}
          </span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
}
