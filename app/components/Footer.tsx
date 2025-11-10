import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Monks Pay</span>
            </div>
            <p className="text-muted-foreground">
              Monks Pay offers secure, seamless, and fee-free payments for effortless global
              transactions.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Short links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#security" className="text-muted-foreground hover:text-primary transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#testimonial" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonial
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Other pages</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  404
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>Built in Framer</span>
              <span>Get This Template</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 © Design Monks. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
