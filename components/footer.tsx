import Link from 'next/link'
import { Instagram, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Static Frame 靜態攝影', href: '/contact?plan=static' },
    { label: 'Motion Frame 動態攝影', href: '/contact?plan=motion' },
    { label: 'Cinematic Reels 短片', href: '/contact?plan=cinematic' },
    { label: '查看報價方案', href: '/pricing' },
  ],
  support: [
    { label: 'Pricing 報價方案', href: '/pricing' },
    { label: 'Book Now 立即預約', href: '/contact' },
    { label: 'Portfolio 作品集', href: '/portfolio' },
    { label: 'Testimonials', href: '/#testimonials' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/one2frame', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="bg-card/75 backdrop-blur-sm border-t border-border/60">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold tracking-wider text-foreground">
                ONE<span className="text-primary">2</span>FRAME
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              一名重機攝影師，記錄你與愛車最純粹的樣子。
              靜態攝影・動態Rolling・短片製作，三種方案任你選擇。
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="mailto:nf3xedk12@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                nf3xedk12@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                服務桃園以北地區
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
        </div>
      </div>
    </footer>
  )
}
