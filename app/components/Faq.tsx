"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: "How secure is my gold investment with SafeRupee?",
      answer:
        "Your gold is 100% secure and physically allocated with Augmont, an RBI-approved gold partner. All gold is stored in secure, insured vaults with regular audits. We employ bank-level 256-bit SSL encryption and comply with SEBI and RBI financial regulations to ensure complete safety of your investments.",
    },
    {
      question: "What returns can I expect from Gold FD+?",
      answer:
        "Gold FD+ offers dual returns: appreciation in gold value plus fixed interest. Historical data shows gold has delivered 10-12% annual returns in India over the long term. Your investment benefits from both gold price appreciation and fixed interest earnings, providing a hedge against market volatility.",
    },
    {
      question: "What's the minimum investment amount required?",
      answer:
        "You can start your gold investment journey with as low as ₹100 in our Gold SIP plan. Digital Gold starts from ₹1,000, while Gold FD+ requires a minimum of ₹10,000. We believe in making gold investment accessible to everyone, regardless of their investment capacity.",
    },
    {
      question: "Are there any hidden charges or fees?",
      answer:
        "We maintain complete transparency with zero hidden charges. All fees including making charges (for physical gold), GST, and storage fees are clearly disclosed before every transaction. Most digital transactions have zero commission, and we provide a detailed breakdown of all costs upfront.",
    },
    {
      question: "How quickly can I sell my gold and access funds?",
      answer:
        "Gold sales are processed instantly on our platform. The proceeds are credited to your SafeRupee wallet immediately and can be transferred to your linked bank account within 2-4 hours during business days. We ensure quick liquidity so you can access your funds whenever needed.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get quick answers to common questions about gold investments
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {openItem === index ? (
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

              {openItem === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Contact Support
            </a>
            <a
              href="/help-center"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
