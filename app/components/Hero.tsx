import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { PhoneSimulator } from "./PhoneSimulator";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50/30 via-background to-amber-50/20 py-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/10 to-amber-100/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-bold text-sm tracking-wide uppercase">
                EASY PAYMENT
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Pay fast and{" "}
                <span className="relative inline-block">
                  smarter
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10"></span>
                </span>
                <br />
                from anywhere
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg">
                Experience the future of payments: fast, secure, and tailored for the next
                generations convenience and trust.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-foreground hover:bg-foreground/90 text-background h-12 px-6">
                <Download className="mr-2 h-5 w-5" />
                Download on the App Store
              </Button>
              <Button className="bg-foreground hover:bg-foreground/90 text-background h-12 px-6">
                <Download className="mr-2 h-5 w-5" />
                GET IT ON Google Play
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">No Card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Fast acceptance</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <PhoneSimulator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
