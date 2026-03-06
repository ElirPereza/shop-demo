import Area from "@components/common/Area.js";
import React from "react";

interface FooterProps {
  copyRight: string;
}

export function Footer({ copyRight }: FooterProps) {
  return (
    <footer className="footer bg-muted">
      <Area id="footerTop" className="footer__top" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg mb-4">Sweet Dreams Bakery</h3>
            <p className="text-muted-foreground mb-4">
              Creating sweet memories with handcrafted cakes made with love and
              the finest ingredients. Every cake tells a story, and we're
              honored to be part of yours.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>123 Baker Street, Sweet City, SC 12345</p>
              <p>Phone: (555) 123-CAKE</p>
              <p>Email: hello@sweetdreamsbakery.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  All Cakes
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Custom Orders
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Catering
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4">Customer Service</h4>
            <div className="space-y-2 text-sm">
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Order Tracking
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Delivery Info
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Returns Policy
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </button>
              </div>
              <div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          data-orientation="horizontal"
          role="none"
          data-slot="separator-root"
          className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Sweet Dreams Bakery. All Rights Reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-primary transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-primary transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
      <Area id="footerBottom" className="footer__bottom" />
    </footer>
  );
}
