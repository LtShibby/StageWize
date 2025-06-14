import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 px-6 py-8 text-sm text-zinc-400">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/FullLogo.png"
            alt="WozWize Logo"
            width={200}
            height={200}
            className="h-20 w-20"
          />
          <span>
            © 2025{' '}
            <a 
              href="https://wozwize.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              WozWize
            </a>
            . All rights reserved.
          </span>
        </div>
        
        <div className="flex gap-6">
          <Link 
            href="/privacy-policy" 
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms-of-service" 
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            href="/about-us" 
            className="hover:text-white transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  )
} 