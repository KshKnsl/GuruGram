import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Logo from '../assets/Logo.gif'

const footerLinks = {
  platform: [
    { label: 'Find a Mentor',   href: '/all/mentors'   },
    { label: 'Articles',        href: '/articles'      },
    { label: 'Write Article',   href: '/articles/new'  },
    { label: 'Chat',            href: '/chat'          },
  ],
  account: [
    { label: 'Sign Up',         href: '/signup'        },
    { label: 'Log In',          href: '/login'         },
    { label: 'My Profile',      href: '/profile'       },
    { label: 'Complete Profile',href: '/complete-profile' },
  ],
}

const socials = [
  { icon: Facebook,  href: 'https://www.facebook.com/gurugramofficial', label: 'Facebook'  },
  { icon: Twitter,   href: 'https://twitter.com/gurugram',              label: 'Twitter'   },
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/gurugram/',label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://www.instagram.com/gurugramofficial/',label: 'Instagram' },
]

const Footer = () => {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-gray-950 dark:bg-gray-950 text-stone-300 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          <div className="lg:col-span-4 space-y-6">
            <div>
              <img src={Logo} alt="GuruGram" className="h-14 w-auto mb-2" />
              <div className="w-8 h-0.5 bg-amber-500 mb-4" />
              <p className="text-sm leading-relaxed text-gray-400">
                Connecting ambitious learners with seasoned industry experts for personalized 1-on-1 mentorship that accelerates real growth.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-amber-500/20 text-gray-500
                             hover:border-amber-500 hover:text-amber-500 transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-medium tracking-widest uppercase text-amber-500">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-400 hover:text-stone-100 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-amber-500 transition-all duration-200 overflow-hidden" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-medium tracking-widest uppercase text-amber-500">
              Account
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-400 hover:text-stone-100 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-amber-500 transition-all duration-200 overflow-hidden" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-medium tracking-widest uppercase text-amber-500">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get exclusive resources, expert insights, and the latest mentorship opportunities delivered to your inbox.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm bg-gray-900 border border-amber-500/20 border-r-0
                           text-stone-200 placeholder:text-gray-600
                           focus:outline-none focus:border-amber-500
                           transition-colors duration-200"
              />
              <button
                type="submit"
                className="clip-skew px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-900
                           transition-colors duration-200 flex items-center gap-1.5
                           text-xs font-medium tracking-widest uppercase shrink-0"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="mt-16 py-6 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 tracking-wide">
            © {new Date().getFullYear()} GuruGram. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer