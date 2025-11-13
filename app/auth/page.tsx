"use client";
import React, { useState, useEffect } from "react";
import { Phone, Key, ArrowRight, Check, AlertCircle } from "lucide-react";
// --- Custom UI Components Replicating Shadcn/Tailwind Style ---
// Custom Label Component
const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 mb-1 block"
  >
    {children}
  </label>
);
// Custom Input Component
// Forward ref is included as a standard pattern for component library inputs
const Input = React.forwardRef(
  ({ className, type, icon: Icon, error, ...props }, ref) => (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      )}
      <input
        type={type}
        className={`flex h-12 w-full rounded-xl border-2 bg-white px-4 py-2 text-base shadow-sm transition-colors 
        file:border-0 file:bg-transparent file:text-sm file:font-medium 
        placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-black/20 focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 
        ${Icon ? "pl-10" : ""} ${
          error ? "border-red-500" : "border-black/20"
        } ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";
// Custom Button Component
const Button = ({ className, children, disabled, loading, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold 
      ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
      h-14 w-full bg-black text-white hover:bg-black/90 shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]
      ${className}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? (
      <div className="flex items-center">
        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        {props.children === "Verify & Login" ? "Verifying..." : "Sending..."}
      </div>
    ) : (
      children
    )}
  </button>
);
// Custom Card Component
const Card = ({ children, className }) => (
  <div
    className={`border border-black/10 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);
// --- Main Component ---
const LoginSignup = () => {
  const [step, setStep] = useState(1); // 1: Mobile Input, 2: OTP Verification
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  // Constants
  const MIN_MOBILE_LENGTH = 10;
  const OTP_LENGTH = 6;
  const RESEND_TIMER_SECONDS = 60;
  const SUCCESS_MESSAGE = "✅ You have been successfully logged in!";
  // Timer useEffect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);
  // Handle Mobile Submission (Simulate OTP Send)
  const handleMobileSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (mobile.length !== MIN_MOBILE_LENGTH || !/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number (starting with 6-9)."
      );
      return;
    }
    setLoading(true);
    // In a real Next.js app, this would be an async fetch call to an API route (e.g., /api/send-otp)
    setTimeout(() => {
      setLoading(false);
      // Simulate success and move to OTP step
      setStep(2);
      setTimer(RESEND_TIMER_SECONDS);
      setError(""); // Clear error from step 1
    }, 1500);
  };
  // Handle OTP Submission (Simulate Login)
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== OTP_LENGTH || !/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP you received.");
      return;
    }
    setLoading(true);
    // In a real Next.js app, this would be an async fetch call to an API route (e.g., /api/verify-otp)
    setTimeout(() => {
      setLoading(false);
      // Simulate successful verification
      setStep(3); // Temporary success state
      setMobile("");
      setOtp("");
      setTimer(0);
      // Reset after success message display
      setTimeout(() => setStep(1), 3000);
    }, 1500);
  };
  // Handle Resend OTP
  const handleResendOTP = () => {
    if (timer === 0) {
      setError("");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTimer(RESEND_TIMER_SECONDS);
        // In a real app, this would trigger a new OTP to be sent via an API call
      }, 1000);
    }
  };
  return (
    <main className="relative min-h-screen flex items-center justify-center py-10 overflow-clip bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Background Blurs */}
      <div className="absolute top-10 right-4 sm:right-8 md:right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-black/10 blur-[110px] rounded-full" />
      <div className="absolute bottom-10 left-4 sm:left-8 md:left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-neutral-400/20 blur-[110px] rounded-full" />
      <section className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <Card>
          {/* Header Bar */}
          <div className="bg-black p-6 border-b border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Key className="h-6 w-6" />
              {step === 1 ? "Login or Sign Up" : "Verify Mobile Number"}
            </h2>
            <p className="text-white/80 mt-1 text-sm">
              {step === 1
                ? "Enter your 10-digit mobile number to proceed."
                : `OTP sent to ${mobile}. Please check your SMS.`}
            </p>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            {/* Error Message Display */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {/* Success Message Display */}
            {step === 3 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
                <Check className="h-4 w-4 flex-shrink-0" />
                <span>{SUCCESS_MESSAGE}</span>
              </div>
            )}
            {step === 1 && (
              <form onSubmit={handleMobileSubmit} className="space-y-6">
                {/* Mobile Input */}
                <div>
                  <Label htmlFor="mobile">Mobile Number (India)</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    icon={Phone}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g., 9876543210"
                    maxLength={MIN_MOBILE_LENGTH}
                    error={error.includes("mobile")}
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">
                    Your number is safe with us. We will send a 6-digit OTP.
                  </p>
                </div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={loading}
                  disabled={mobile.length !== MIN_MOBILE_LENGTH}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Send OTP
                </Button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleOTPSubmit} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input
                    id="otp"
                    type="tel"
                    inputMode="numeric"
                    icon={Key}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={OTP_LENGTH}
                    error={error.includes("OTP")}
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">
                    The code is valid for 5 minutes.
                  </p>
                </div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={loading}
                  disabled={otp.length !== OTP_LENGTH}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Verify & Login
                </Button>
                {/* Resend/Back Options */}
                <div className="flex justify-between items-center text-sm pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    ← Change Mobile Number
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={timer > 0 || loading}
                    className={`font-semibold transition-opacity ${
                      timer > 0
                        ? "text-gray-400"
                        : "text-black hover:text-black/70"
                    }`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </section>
    </main>
  );
};
export default LoginSignup;
