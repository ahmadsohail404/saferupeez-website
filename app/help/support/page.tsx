// app/help/support/page.tsx
"use client";

import React, { useState } from "react";
import {
  Paperclip,
  Send,
  Check,
  AlertCircle,
  Phone,
  Mail,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

type FileUploadProps = {
  file: File | null;
  onChange: (file: File) => void;
  onRemove: () => void;
};

function FileUpload({ file, onChange, onRemove }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onChange(f);
  };

  return (
    <div className="space-y-2">
      <input
        id="file-upload"
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-black/40 transition-colors cursor-pointer bg-gray-50/50 hover:bg-gray-100/60"
        >
          <div className="text-center">
            <Upload className="h-6 w-6 text-gray-500 mx-auto mb-2" />
            <span className="text-sm text-gray-700">Click to upload</span>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
          </div>
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
          <Paperclip className="h-5 w-5 text-gray-700" />
          <span className="text-sm text-gray-800 flex-1 truncate">{file.name}</span>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 rounded-lg hover:bg-white transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}

function SupportPage() {
  const [submitting, setSubmitting] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const e: Record<string, boolean> = {};
    if (!/^[6-9]\d{9}$/.test(mobile)) e.mobile = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = true;
    if (!issueType) e.issueType = true;
    if (!description.trim()) e.description = true;
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validateForm();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert("✅ Request submitted successfully! Our team will get back to you shortly.");
      setMobile("");
      setEmail("");
      setIssueType("");
      setDescription("");
      setFile(null);
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-clip">
      {/* Background */}
      <div className="absolute top-10 right-4 sm:right-8 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/10 blur-[110px] rounded-full" />
      <div className="absolute bottom-10 left-4 sm:left-8 md:left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-neutral-400/20 blur-[110px] rounded-full" />

      <section className="relative z-10 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-16">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium mb-4">
              <AlertCircle className="h-4 w-4" />
              We're here to help
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Customer Support
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Need help with your SafeRupeez app? Reach out to us for support with transactions,
              gold savings, account issues, or any other questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Card */}
            <div className="lg:col-span-2">
              <Card className="border border-black/10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
                {/* Black header bar */}
                <div className="bg-black p-6 border-b border-white/10">
                  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Submit Your Request
                  </h2>
                  <p className="text-white/80 mt-1 text-sm">
                    Fill out the form below and we'll respond within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  {/* Mobile */}
                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className={`pl-10 ${errors.mobile ? "border-red-500" : ""}`}
                        aria-invalid={!!errors.mobile}
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Use your SafeRupeez registered mobile number (starting with 6–9)
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        aria-invalid={!!errors.email}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Issue Type */}
                  <div>
                    <Label htmlFor="issueType">Type of Issue</Label>
                    {/* keep required semantics for server parsing if needed */}
                    <input type="hidden" name="issueType" value={issueType} required />
                    <Select value={issueType} onValueChange={setIssueType}>
                      <SelectTrigger
                        id="issueType"
                        className={`h-12 rounded-xl border ${
                          errors.issueType ? "border-red-500" : "border-black/20"
                        } bg-white text-slate-900 focus:ring-2 focus:ring-black/20 focus:border-black`}
                      >
                        <div className="flex items-center gap-2">
                          <SelectValue placeholder="Select an issue type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="border border-black/20 rounded-xl bg-white">
                        <SelectItem value="txn">Transaction Issue</SelectItem>
                        <SelectItem value="gold">Gold Savings</SelectItem>
                        <SelectItem value="account">Account / KYC</SelectItem>
                        <SelectItem value="app">App / Technical</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.issueType && (
                      <p className="text-xs text-red-500 mt-2 ml-1">Please select an issue type</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please describe your issue in detail. Include any relevant transaction IDs, dates, or error messages..."
                      className={`${errors.description ? "border-red-500" : ""}`}
                      aria-invalid={!!errors.description}
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label htmlFor="attachment">Attachment (Optional)</Label>
                    <FileUpload file={file} onChange={setFile} onRemove={() => setFile(null)} />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 rounded-xl font-semibold text-white transition-all duration-200 bg-black hover:bg-black/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {submitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Side info */}
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl p-6 shadow-lg">
                <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours during business days.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl p-6 shadow-lg">
                <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-sm text-gray-600">
                  Your information is encrypted and handled with care.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border border-black/10 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-black" />
                    <span>1800-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail className="h-4 w-4 text-black" />
                    <span>support@saferupeez.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SupportPage;
