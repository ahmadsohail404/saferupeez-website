"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

type FAQItem = {
  section: string;
  question: string;
  answer: string;
};

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  // 1️⃣ START CLOSED (no section open by default)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  const toggleSection = (sectionTitle: string) => {
    setOpenSection((prev) => (prev === sectionTitle ? null : sectionTitle));
  };

  const faqs: FAQItem[] = [
    /* ------------------ Section 1: Getting Started ------------------ */
    {
      section: "Getting Started",
      question: "What is Saferupeez?",
      answer:
        "Saferupeez (by Jyesta Fintech Pvt. Ltd.) is a savings and investment platform. We are not a bank; we are a technology company that helps you build a habit of saving in 24K Digital Gold & Silver via SIPs or one-time purchases, and build a foundation by investing those savings into high-yield, secure Fixed Deposits (FD) from RBI-regulated banks. Our mission is to be your single, trusted partner to help you start simple and build smart.",
    },
    {
      section: "Getting Started",
      question: "Is my money safe with Saferupeez?",
      answer:
        "Yes. Your security is our #1 priority, and your money is always held with regulated partners. For Fixed Deposits, your money is sent directly to the RBI-regulated bank you choose, and FD with banks are insured by the DICGC for up to ₹5,00,000 per user, per bank. For Digital Gold/Silver, your investment is backed by 24K physical gold or silver, held in secure vaults by our partner Augmont and monitored by an independent trustee.",
    },
    {
      section: "Getting Started",
      question: "Do I need to complete KYC?",
      answer:
        "Yes. As per RBI and PMLA (Anti-Money Laundering) rules, all financial platforms must verify their users. KYC verification is required to start investing and is mandatory for booking FD, withdrawing money, or selling your gold/silver. This is a one-time process that helps secure your account.",
    },

    /* ---------------- Section 2: Digital Gold & Silver ---------------- */
    {
      section: "Digital Gold & Silver",
      question: 'What is "Digital Gold/Silver"? Is it real?',
      answer:
        "Yes, it is 100% real. When you buy Digital Gold, you are buying 24K 99.9% pure physical gold that is stored in your name in a secure vault. Digital Gold/Silver is simply a more convenient way to buy, sell, and store gold or silver without the hassle of a physical locker.",
    },
    {
      section: "Digital Gold & Silver",
      question: "Who is Augmont?",
      answer:
        "Augmont Goldtech Private Limited is our official partner for all Digital Gold and Silver services. They are one of India’s largest bullion refineries and companies. They manage the vaulting, storage, and physical delivery of the gold and silver you buy on our platform.",
    },
    {
      section: "Digital Gold & Silver",
      question: "Where is my gold and silver stored?",
      answer:
        "All the gold and silver you buy is stored in high-security, insured vaults managed by Augmont and their independent partners (like Sequel Logistics). These vaults are monitored 24/7, fully insured, and audited regularly.",
    },
    {
      section: "Digital Gold & Silver",
      question: "Is Digital Gold a regulated product?",
      answer:
        "The Digital Gold product itself—buying a fraction of gold stored in a vault—is not regulated by SEBI or RBI. To ensure your safety, we only partner with trusted, industry-leading providers like Augmont, and follow strict operational and security standards.",
    },
    {
      section: "Digital Gold & Silver",
      question: "Why do I have to pay 3% GST on Gold/Silver?",
      answer:
        "As per government rules, gold and silver are treated as “goods,” not financial securities. Just like when you buy a gold coin or jewellery, you must pay 3% GST on the purchase price. This is a mandatory tax and applies to all digital gold platforms in India.",
    },
    {
      section: "Digital Gold & Silver",
      question: "How do I sell my Gold/Silver?",
      answer:
        "You can sell your gold or silver back to us 24/7 directly from the app. The money will be credited to your verified bank account. For security reasons, there is a 48-hour lock-in period after you buy, before you can sell.",
    },
    {
      section: "Digital Gold & Silver",
      question: "Can I get physical delivery of my Gold/Silver?",
      answer:
        "Yes. Once you have accumulated a certain amount (for example, 1 gram of gold), you can request doorstep delivery in the form of a coin or bar. Please note that making charges and delivery fees will apply to all physical redemption requests.",
    },

    /* -------------------- Section 3: Fixed Deposits ------------------- */
    {
      section: "Fixed Deposits (FD)",
      question: "Are you a bank? How can you offer FD from so many banks?",
      answer:
        "No, Saferupeez is not a bank. We are a technology partner for RBI-regulated banks (like Suryoday Small Finance Bank, Federal Bank, etc.). Our BaaS (Banking-as-a-Service) partners, like Upswing, give us the technology to provide you a single, secure dashboard to access and book FD from multiple banks.",
    },
    {
      section: "Fixed Deposits (FD)",
      question:
        "Do I need to open a new savings account with each bank to book an FD?",
      answer:
        "No. You can use your existing bank account (for example, HDFC or SBI) to pay for an FD in any of our partner banks. The partner bank will create a unique customer ID (CIF) for you in their system to hold the FD, but you do not need to open a new savings account with them.",
    },
    {
      section: "Fixed Deposits (FD)",
      question: "Is my Fixed Deposit insured?",
      answer:
        "Yes. All Fixed Deposits booked with our partner banks (including Small Finance Banks) are insured by the DICGC (an RBI subsidiary) up to ₹5,00,000 per user, per bank. FD with NBFCs (which we will clearly label) are not covered by DICGC.",
    },
    {
      section: "Fixed Deposits (FD)",
      question: "How do I get my money back when the FD matures?",
      answer:
        "On the maturity date, the partner bank will automatically transfer the full maturity amount (your principal plus interest) directly to the bank account you used to book the FD.",
    },
    {
      section: "Fixed Deposits (FD)",
      question:
        "What if I need my money before the FD matures? (Premature Withdrawal)",
      answer:
        "You can request a premature withdrawal directly from the Saferupeez app. The partner bank will process this request and typically apply a penalty on the interest rate (for example, 1%). The funds will then be credited back to your bank account.",
    },

    /* ----------------- Section 4: Payments & Fees --------------------- */
    {
      section: "Payments & Fees",
      question: "What are the fees on Saferupeez?",
      answer:
        "We believe in 100% transparency. UPI payments: all investments made via UPI are free for you—we absorb the processing costs. Net Banking: if you choose to pay via Net Banking, a small payment gateway surcharge will be added to your total; this fee is charged directly by the payment gateway (like Cashfree) and passed on to you, and we always show the exact amount before you pay. Digital Gold: we do not charge any platform fee; the buy–sell price difference (the spread) is set by the market and our bullion partner, Augmont.",
    },
    {
      section: "Payments & Fees",
      question: "What is a SIP?",
      answer:
        "A SIP (Systematic Investment Plan) is an instruction you give us to automatically invest a fixed amount of your choice (for example, ₹10 or ₹100) on a regular basis—daily, weekly, or monthly—into Digital Gold or Silver. It’s the easiest way to build a disciplined savings habit without having to think about it every time.",
    },
  ];

  // Group FAQs by section while preserving original index
  const groupedBySection = faqs.reduce<
    Record<string, (FAQItem & { index: number })[]>
  >((acc, faq, index) => {
    if (!acc[faq.section]) acc[faq.section] = [];
    acc[faq.section].push({ ...faq, index });
    return acc;
  }, {});

  const sections = Object.keys(groupedBySection);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600 bg-gray-50">
            <HelpCircle className="mr-2 h-4 w-4 text-[hsl(var(--gold))]" />
            Saferupeez Help Centre
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Quick answers about Saferupeez, Digital Gold & Silver, and Fixed
            Deposits.
          </p>
        </div>

        {/* FAQ Items grouped by section */}
        <div className="space-y-8">
          {sections.map((sectionTitle) => {
            const items = groupedBySection[sectionTitle];
            const isOpen = openSection === sectionTitle;

            return (
              <div key={sectionTitle}>
                {/* 2️⃣ BIGGER SECTION TITLE FONT SIZE */}
                <button
                  type="button"
                  onClick={() => toggleSection(sectionTitle)}
                  className="flex w-full items-center justify-between mb-3 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-500 uppercase tracking-wide">
                    {sectionTitle}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="space-y-4">
                    {/* 🔥 your existing question cards + styles remain exactly the same here */}
                    {items.map((item) => (
                      <div
                        key={item.index}
                        className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleItem(item.index)}
                          className="flex items-center justify-between w-full p-6 text-left"
                        >
                          <span className="text-lg font-semibold text-gray-900 pr-8">
                            {item.question}
                          </span>
                          <div className="flex-shrink-0 ml-4">
                            {openItem === item.index ? (
                              <div className="p-1 bg-[hsl(var(--gold))]/10 rounded-full">
                                <ChevronUp className="h-5 w-5 text-[hsl(var(--gold))]" />
                              </div>
                            ) : (
                              <div className="p-1 bg-gray-100 rounded-full group-hover:bg-[hsl(var(--gold))]/10 transition-colors">
                                <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-[hsl(var(--gold))]" />
                              </div>
                            )}
                          </div>
                        </button>

                        {openItem === item.index && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
