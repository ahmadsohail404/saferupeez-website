// app/components/LoginSignup.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Key, Check, AlertCircle } from "lucide-react";

/* --------------------- INPUT COMPONENT --------------------- */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ElementType;
  error?: string | boolean;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, error, className = "", ...props }, ref) => (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 peer-focus:text-black transition" />
      )}
      <input
        ref={ref}
        className={`peer h-12 w-full rounded-xl border bg-white px-4 py-2 text-base 
          shadow-sm transition-all duration-200 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-black/30 
          ${Icon ? "pl-11" : ""} 
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-black"
          } ${className}`}
        {...props}
      />
      {error && (
        <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
      )}
    </div>
  )
);
Input.displayName = "Input";

/* --------------------- BUTTON --------------------- */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  className = "",
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={`h-12 w-full rounded-lg bg-black text-white text-base font-semibold 
      flex items-center justify-center transition-all duration-200
      hover:bg-gray-800 
      active:ring-4 active:ring-black/30 
      disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        Processing...
      </div>
    ) : (
      children
    )}
  </button>
);

/* ========================================================================== */
/*                          MAIN COMPONENT (RESPONSIVE)                       */
/* ========================================================================== */

const LoginSignup = ({ onClose = () => {} }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  const RESEND_TIMER = 60;

  /* ---------- CLOSE ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // e.target is EventTarget | null, cast to Node for contains()
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  /* ---------- CLOSE ON ESC ---------- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ---------- TIMER ---------- */
  useEffect(() => {
    let t: string | number | NodeJS.Timeout | undefined;
    if (timer > 0) t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  /* ---------- SEND OTP ---------- */
  const sendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(RESEND_TIMER);
    }, 1200);
  };

  /* ---------- VERIFY OTP ---------- */
  const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP sent to your number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setTimeout(() => {
        onClose();
        router.push("/");
      }, 1500);
    }, 1200);
  };

  /* --------------------- UI --------------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="
          bg-white rounded-3xl shadow-xl w-full 
          max-w-xs sm:max-w-sm md:max-w-md 
          p-5 sm:p-8 md:p-10 
          animate-in fade-in zoom-in-95 
          relative
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-900 p-2 transition rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Login or Sign Up
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Enter your mobile number to get started.
            </p>

            {error && (
              <div className="flex gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm mt-5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={sendOTP} className="mt-5 space-y-5">
              <div className="flex rounded-xl border border-gray-200 focus-within:border-black transition-all relative">
                <span className="px-3 sm:px-4 py-3 flex items-center bg-gray-50 text-gray-700 font-medium rounded-l-xl border-r">
                  +91
                </span>
                <input
                  maxLength={10}
                  type="tel"
                  placeholder="Your 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 text-base outline-none bg-white rounded-r-xl placeholder:text-gray-400"
                />
              </div>

              <p className="text-center text-xs text-gray-500">
                By proceeding, you agree to our{" "}
                <span className="font-semibold text-black hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold text-black hover:underline">
                  Privacy Policy
                </span>
                .
              </p>

              <Button
                type="submit"
                disabled={mobile.length !== 10 || loading}
                loading={loading}
              >
                Get OTP
              </Button>
            </form>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              A 6-digit code has been sent to <b>+91 {mobile}</b>.
            </p>

            {error && (
              <div className="flex gap-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm mt-5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={verifyOTP} className="mt-6 space-y-6">
              <Input
                icon={Key}
                maxLength={6}
                type="tel"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
              />

              <div className="flex justify-between text-xs sm:text-sm pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setTimer(0);
                    setOtp("");
                  }}
                  className="text-gray-600 font-medium hover:text-black"
                >
                  Change number
                </button>

                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(RESEND_TIMER)}
                  className={`font-medium ${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:text-gray-700"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </div>

              <Button
                type="submit"
                disabled={otp.length !== 6 || loading}
                loading={loading}
              >
                Verify & Proceed
              </Button>
            </form>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center py-8 sm:py-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 shadow-md">
              <Check className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Login Successful!
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              You will be redirected shortly...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
