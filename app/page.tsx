import dynamic from "next/dynamic"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { EnhancedSkillsSection } from "@/components/enhanced-skills-section"
import { LoadingSpinner } from "@/components/loading-spinner"
import { VisitorCounter } from "@/components/visitor-counter"
import { ProjectContributionsViz } from "@/components/project-contributions-viz"
import { InteractiveMLDemo } from "@/components/interactive-ml-demo"

// Lazy load heavy components
const FeaturedProjects = dynamic(
  () => import("@/components/featured-projects").then((mod) => ({ default: mod.FeaturedProjects })),
  {
    loading: () => (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Loading projects..." />
      </div>
    ),
  },
)

const RealGitHubActivity = dynamic(
  () => import("@/components/real-github-activity").then((mod) => ({ default: mod.RealGitHubActivity })),
  {
    loading: () => (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Loading GitHub data..." />
      </div>
    ),
  },
)

export default function HomePage() {
  return (
    <div className="space-y-0">
      <EnhancedHeroSection />
      <EnhancedSkillsSection />

      {/* AI Mission Control Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">AI Mission Control</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive challenges and live inference tools to explore how I approach AI/ML systems
            </p>
          </div>
          <InteractiveMLDemo />
        </div>
      </section>

      {/* Project Contributions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Project Contributions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed breakdown of my development projects with real metrics and technologies used
            </p>
          </div>
          <ProjectContributionsViz />
        </div>
      </section>

      {/* Real GitHub Activity Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Live GitHub Activity</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time data from my GitHub profile showing contributions, repositories, and coding activity
            </p>
          </div>
          <RealGitHubActivity />
        </div>
      </section>

      {/* Portfolio Analytics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Portfolio Analytics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time statistics and visitor insights for this portfolio website
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VisitorCounter />
          </div>
        </div>
      </section>

      <FeaturedProjects />
    </div>
  )
}
