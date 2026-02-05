"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/Garvanand", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/garv-anand-1bb36b270", label: "LinkedIn" },
  { icon: Mail, href: "mailto:garvanand03@gmail.com", label: "Email" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
              scrolled
                ? "glass-dark shadow-lg shadow-primary/5"
                : "bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                    <span className="text-lg font-bold text-white">G</span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-lg">Garv Anand</div>
                  <div className="text-xs text-muted-foreground -mt-1">AI/ML Engineer</div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg group"
                >
                  <span
                    className={cn(
                      "relative z-10 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-2">
              {socialLinks.map((social) => (
                <motion.div key={social.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <Link href={social.href} target="_blank" aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <EnhancedThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <EnhancedThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] glass-dark border-l border-border/50 p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="p-6 border-b border-border/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                          <span className="text-xl font-bold text-white">G</span>
                        </div>
                        <div>
                          <div className="font-bold text-lg">Garv Anand</div>
                          <div className="text-sm text-muted-foreground">AI/ML Engineer</div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 p-6 space-y-2">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl transition-all group",
                              pathname === item.href
                                ? "bg-primary/10 border border-primary/20 text-primary"
                                : "hover:bg-muted/50 text-foreground"
                            )}
                          >
                            <span className="text-lg font-medium">{item.name}</span>
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mobile Social Links */}
                    <div className="p-6 border-t border-border/50">
                      <div className="text-sm text-muted-foreground mb-4">Connect with me</div>
                      <div className="flex items-center space-x-3">
                        {socialLinks.map((social) => (
                          <Button
                            key={social.label}
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-xl border-border/50 hover:border-primary/50 hover:bg-primary/10"
                            asChild
                          >
                            <Link href={social.href} target="_blank" aria-label={social.label}>
                              <social.icon className="h-5 w-5" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Spacer to prevent content from going under the fixed nav */}
      <div className="h-20" />
    </>
  )
}
