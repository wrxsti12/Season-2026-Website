import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Static Frame 靜態攝影', href: '/contact?plan=static' },
    { label: 'Motion Frame 動態攝影', href: '/contact?plan=motion' },
    { label: 'Cinematic Reels 短片', href: '/contact?plan=cinematic' },
    { label: '查看報價方案', href: '/pricing' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Pricing 報價方案', href: '/pricing' },
    { label: 'Book Now 立即預約', href: '/contact' },
    { label: 'Portfolio 作品集', href: '/portfolio' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/one2frame', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/one2frame', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/one2frame', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-card/75 backdrop-blur-sm border-t border-border/60">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold tracking-wider text-foreground">
                ONE<span className="text-primary">2</span>FRAME
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Capturing life&apos;s precious moments with artistic vision and professional excellence. 
              Your story, beautifully told through our lens.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="mailto:hello@one2frame.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                hello@one2frame.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                Los Angeles, California
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-foreground">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-foreground">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ONE2FRAME. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
