"use client"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🍌</div>
              <span className="text-2xl font-bold">Nano Banana</span>
            </div>
            <p className="text-background/70">
              The future of AI image editing. Transform your images with simple text prompts.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-background/70 hover:text-background transition">
              <li>
                <a href="#" className="hover:text-background transition">
                  Image Editor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">© 2025 Nano Banana. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-background/60 hover:text-background transition text-sm">
                Twitter
              </a>
              <a href="#" className="text-background/60 hover:text-background transition text-sm">
                Discord
              </a>
              <a href="#" className="text-background/60 hover:text-background transition text-sm">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
