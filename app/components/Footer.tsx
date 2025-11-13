"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border)/0.2)] bg-black text-white">
      {/* Subtle band behind the footer */}
      <div className="bg-white/5">
        {/* Single alignment container for EVERYTHING */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Giant brand banner — left-aligned, single line */}
          <section className="relative overflow-visible">
            <span
              className="
      inline-block font-extrabold text-white/24 CamelCase whitespace-nowrap
      text-[clamp(48px,12vw,160px)] leading-none [letter-spacing:-0.01em]
      origin-left scale-x-[1.4] scale-y-[1.3] -ml-[0.5rem]  /* 🔥 stretch width + height */
    "
            >
              {"Safe\u00A0Rupeez"}
            </span>
          </section>
          {/* Tagline + quick links */}
          <div className="mt-6 text-white/70">
            <div className="flex flex-col gap-3">
              <div className="pt-4 sm:pt-6">
                <p className="max-w-3xl text-sm sm:text-base text-white/70">
                  Building financial freedom for every Indian, one rupee at a time.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm sm:text-base">
                    © 2025 SafeRupeez. All rights reserved. | Made with ❤️ in India
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <FooterLink href="/legal/privacy">Privacy policy</FooterLink>
                  <FooterLink href="/security">Security</FooterLink>
                  <FooterLink href="/legal/terms">Terms & conditions</FooterLink>
                  <span className="text-white/60">ISO 27001:2022</span>
                </div>

                {/* Partner / address / contact */}
                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3 leading-none">
                    <span className="text-xs text-white/60">Powered by</span>
                    <Image
                      src="/assets/logo.png"
                      alt="Augmont Gold For All"
                      width={200}
                      height={48}
                      className="h-12 w-auto"
                      priority
                    />
                  </div>

                  <address className="not-italic text-white/70">
                    Address — Third floor, Block A, Safe Rupeez, Bhive HSR Premium Campus, Krishna Reddy
                    Industrial Area, Kudlu Gate, Bommanahalli, Bangalore, Karnataka, India, 560068
                  </address>

                  <p className="text-white/70">
                    Contact us:{" "}
                    <a
                      className="underline decoration-[hsl(var(--gold))]/60 underline-offset-2 hover:text-[hsl(var(--gold))]"
                      href="mailto:help@saferupeez.in"
                    >
                      help@saferupeez.in
                    </a>
                  </p>
                </div>
              </div>

              {/* Long SEO paragraph block — stays aligned with the same left edge */}
              <div className="prose prose-invert max-w-none text-white/70 prose-p:my-3">
                <p>
                  Fixed Deposit : Unity Small Finance Bank FD |Shivalik Small Finance FD |slice Small Finance FD
                  |Suryoday Small Finance Bank FD |Utkarsh Small Finance Bank FD |Bajaj Finance FD |Ujjivan Small
                  Finance Bank FD |Shriram Finance FD |IndusInd Bank FD |South Indian Bank FD |Fixed Deposit
                  Minimum Period |NBFC Fixed Deposit |Fixed Deposit Minimum Amount |Fixed Deposit Monthly Income
                  Scheme |Fixed vs Floating Rates |Fixed Deposit vs Time Deposit |Short Term Fixed Deposit |Tax
                  Saver Fixed Deposit |Certificate of Deposit |Certificate of Deposit vs Fixed Deposit |Senior
                  Citizen Fixed Deposit |Features of Fixed Deposit Account |Benefits of Fixed Deposit Account |3
                  Crore FD Interest per Month |50 Lakh Fixed Deposit Interest per Month |40 Lakh Fixed Deposit
                  Interest per Month |1 Cr Fixed Deposit Interest per Month |Monthly Interest for a 30 Lakh Fixed
                  Deposit |Monthly Interest for 25 Lakh Fixed Deposit |20 Lakh Fixed Deposit Interest per Month
                  |Monthly Interest for 5 Lakh Fixed Deposit |Monthly Interest for 1 Lakh Fixed Deposit |Monthly
                  Interest for 2 Lakh Fixed Deposit |What is a Cumulative Fixed Deposit
                </p>
                <p>
                  Fixed Deposit Rates : All Banks Interest Rates |Ujjivan Small Finance Bank FD Rates |Shriram
                  Finance FD Rates |Indian Overseas Bank FD Rates |Union Bank FD Rates |Kotak Fixed Deposit Rates
                  |SBI Fixed Deposit Interest Rates |LIC FD Interest Rates |HDFC Bank Fixed Deposit Rates |Axis
                  Bank Fixed Deposit Rates |PNB Housing Finance FD Rates |Yes Bank Fixed Deposit Rates |RBL Fixed
                  Deposit Rates |Bajaj Finance Fixed Deposit Rates |Mahindra Finance Fixed Deposit Rates |ICICI
                  Fixed Deposit Rates |Bank of Baroda FD Rates |PNB FD Rates |Utkarsh Small Finance Bank FD Rates
                  |IndusInd Bank Fixed Deposit Rates |Shivalik Small Finance Bank FD Rates |South Indian Bank FD
                  Rates |Suryoday Small Finance Bank FD Rates |slice Finance Bank FD Rates |Unity Small Finance
                  Bank FD Rates |Senior Citizen FD Rates
                </p>
                <p>
                  FD Calculator : FD Breaking Calculator |FD Withdrawal Calculator |PNB Housing Finance FD
                  Calculator |LIC Fixed Deposit Calculator |Mahindra Finance FD Calculator |Bank of Baroda FD
                  Calculator |PNB FD Calculator |Union Bank FD Calculator |JK Bank FD Calculator |Bajaj Finance
                  Fixed Deposit Calculator |IndusInd Bank Fixed Deposit Calculator |South Indian Bank FD
                  Calculator |Ujjivan Small Finance Bank FD Calculator |Shivalik Small Finance Bank FD Calculator
                  |slice Small Finance Bank FD Calculator |Utkarsh Small Finance Bank FD Calculator |Suryoday Small
                  Finance Bank FD Calculator |Unity Small Finance Bank FD Calculator |SBI FD Calculator |ICICI FD
                  Calculator |Axis Bank FD Calculator |Shriram FD Calculator |Federal Bank FD Calculator |AU Bank
                  FD Calculator |Karur Vysya Bank FD Calculator |Bank of Maharashtra FD Calculator
                </p>
                <p>
                  Other Calculators : Home Loan EMI Calculator |Compound Interest Calculator |EMI Calculator |Car
                  Loan EMI Calculator |Debt SIP Calculator |RD Calculator |GST Calculator |HRA Calculator |Sukanya
                  Samriddhi Yojana Calculator |Salary Calculator |Simple Interest Calculator |Stock Average
                  Calculator |Stock Returns Calculator |NSC Calculator |Atal Pension Yojana Calculator |Reverse GST
                  Calculator
                </p>
                <p>
                  Investments : Mahila Samman Savings Certificate |PF Withdrawal Rules |NPS vs PPF Comparison |EPF
                  Interest Rate 2025 |Choosing Between EPF & PPF |SBI Patrons FD Scheme
                </p>
                <p>
                  Credit Card : Secured Credit Card |Free Credit Card |SBI Credit Card on FD |Axis Credit Card on
                  FD |Best Credit Card Against FD |How to Book a Secured Credit Card on Stable Money App
                </p>
                <p>
                  Other : EPF Transfer Form 13 Guide |Make EPF Payment Online Guide |Fixed Deposit Calculator
                  |Change Name EPF Account Guide |FD Schemes |Bonds |Withdraw Funds EPF Form 31 Guide |Recurring
                  Deposits |Investments |EPFO Login Portal Guide |Tax |Customer Care |Understanding EPF Form 11 |PF
                  Form 19 Download Guide |TDS on PF Withdrawal 2025 Guide |EPF Form 10C EPS Withdrawal Guide |Cards
                  |EPF Passbook Download Guide |Track EPF Claim Status Guide |Finance Forum |Finance |PF
                  Calculation Formula |FAQs
                </p>
                <p>
                  Mutual Fund Distributor : Stable Finserv Private Limited (AMFI-registered Mutual Fund
                  Distributor) | ARN: 269315 | Current Validity Period: 18-May-2023 to 17-May-2026 | Scheme
                  Documents| Commission Disclosure
                </p>
                <p>
                  Disclaimer : Mutual fund investments are subject to market risks, read all scheme related
                  documents carefully. Past Performance of the Scheme is neither an indicator nor a guarantee of
                  future performance.
                </p>
                <p>
                  Disclaimer : FDs and Co-branded Credit Cards are not regulated by SEBI and are outside the
                  SCORES/Exchange Arbitration framework. Stable Money acts only as a distributor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Helpers */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-white/70 transition-colors hover:text-[hsl(var(--gold))]"
    >
      {children}
    </Link>
  );
}
