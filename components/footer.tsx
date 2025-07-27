import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Alex Chen</h3>
            <p className="text-sm text-muted-foreground">
              AI/ML & Full Stack Developer passionate about creating intelligent solutions.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/Garvanand" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/garv-anand-1bb36b270" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:garvanand03@gmail.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/resume" className="block text-muted-foreground hover:text-primary transition-colors">
                Resume
              </Link>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h4 className="font-semibold">Core Skills</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Machine Learning</div>
              <div>Deep Learning</div>
              <div>React & Next.js</div>
              <div>Python & Node.js</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>garvanand@gmail.com</div>
              <div>Available for opportunities</div>
              <div>Open to collaborations</div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by Garv Anand</span>
          </p>
          <p className="mt-2">© 2025 Garv Anand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
