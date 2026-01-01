import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cinema-dark border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold text-gradient-gold">
                OromoFlix
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your premier destination for Oromo cinema. Experience the best of Ethiopian film culture.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Now Showing', 'Coming Soon', 'Showtimes', 'Promotions', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'FAQs', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Bole, Finfinnee, Ethiopia
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +251 911 123 456
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                info@oromoflix.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 OromoFlix. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};
