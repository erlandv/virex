# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2025-12-27

### Changed

- **Installation Method**: Updated Quick Start and Getting Started documentation to recommend `npm create astro@latest -- --template erlandv/virex` as the primary installation method
  - Alternative git clone method provided for theme development
  - More user-friendly workflow for creating new projects

### Improved

- **Documentation Consistency**: Comprehensive review and updates across all documentation files
  - Fixed incorrect file references (Navbar.astro → Header.astro)
  - Updated all import paths to use path aliases (`@forms/`, `@dashboard-ui/`, etc.)
  - Added missing dashboard-related content throughout docs
  - Improved cross-references between documentation files

- **Project Structure Documentation**: Updated `docs/01-getting-started.md` with complete and accurate project structure
  - Added `dashboard/` and `dashboard-ui/` component folders
  - Added `dashboard-navigation.ts` config file
  - Added `dashboard-data.ts` utility file
  - Added `DashboardLayout.astro` layout
  - Detailed dashboard pages structure

- **Configuration Documentation** (`docs/02-configuration.md`):
  - Added Configuration Files overview table
  - Added Dashboard Navigation section with examples
  - Expanded Environment Variables section with authentication and analytics variables
  - Better organization with subsections for different variable types

- **Customization Documentation** (`docs/03-customization.md`):
  - Added status colors to Design Tokens section
  - Added Dashboard Customization section with colors, layout, and components guidance
  - Fixed terminology (navbar → header)
  - Added status colors usage examples

- **Content Guide Documentation** (`docs/04-content-guide.md`):
  - Added Available Content Collections overview table
  - Updated MDX Support section with realistic examples using path aliases
  - Added logos folder to images structure
  - Added note about dashboard sample data images

- **Pages Documentation** (`docs/06-pages.md`):
  - Added Dashboard Pages section with all 7 dashboard routes
  - Included note about sample data and authentication requirements
  - Cross-reference to dashboard documentation

- **Dashboard Documentation** (`docs/07-dashboard.md`):
  - Removed generic Resources and Support sections for consistency with other docs
  - More focused ending with actionable Next Steps

- **Authentication Documentation** (`docs/08-authentication.md`):
  - Fixed Navigation Integration section (Navbar.astro → Header.astro)
  - Updated all import examples to use `@forms/` path alias
  - Added Dashboard Integration section with authentication middleware guidance
  - Added Environment Variables for Auth section
  - Cross-references to dashboard documentation

- **Deployment Documentation** (`docs/09-deployment.md`):
  - Expanded Environment Variables section with complete list including auth variables
  - Significantly improved Dashboard Deployment Notes with detailed subsections:
    - Authentication Setup with step-by-step guidance
    - Environment Variables examples
    - Replace Sample Data with code examples
    - Session Management configuration
    - CORS Configuration examples
  - Added Dashboard section to Pre-deployment Checklist with 6 actionable items
  - Cross-references to authentication documentation

- **README.md**:
  - Updated title to "SaaS UI Theme for Astro" (added "UI")
  - Added "Why Virex?" section explaining unique value proposition
  - Restructured Features section with better categorization
  - Updated Quick Start with new installation method
  - Changed "Note" to "Important" for dashboard authentication notice

### Fixed

- Corrected cross-references between documentation files
- Fixed inconsistent terminology throughout documentation
- Removed redundant sections for better documentation flow

## [1.4.0] - 2025-12-27

### Added

- **Complete Dashboard Layout System**:
  - Responsive dashboard shell with sidebar and top navigation
  - Mobile-friendly navigation drawer with slide-in animation
  - Collapsible sidebar with icon-only mode and hover expansion
  - Top navigation bar with search, notifications, theme toggle, and user menu
  - Breadcrumb navigation for page hierarchy
  - Persistent sidebar state using localStorage

- **Dashboard Layout Components**:
  - `DashboardLayout.astro` - Main layout wrapper for dashboard pages
  - `DashboardShell.astro` - Shell structure with sidebar and content area
  - `Sidebar.astro` - Desktop sidebar navigation with nested items
  - `MobileNav.astro` - Mobile navigation drawer
  - `TopNav.astro` - Top navigation bar with utilities
  - `UserMenu.astro` - User dropdown menu with profile options
  - `Breadcrumbs.astro` - Breadcrumb navigation component

- **Dashboard UI Components** (15 reusable components):
  - `StatCard.astro` - Metric display cards with trend indicators
  - `DataTable.astro` - Table with sorting, pagination, and actions
  - `Card.astro` - Generic content card for dashboard sections
  - `Modal.astro` - Dialog/modal component with keyboard support
  - `Toast.astro` - Notification toast with auto-dismiss
  - `Chart.astro` - Chart visualization wrapper using Chart.js
  - `EmptyState.astro` - Empty state placeholder component
  - `LoadingSkeleton.astro` - Loading skeleton with shimmer effect

- **Example Dashboard Pages**:
  - `/dashboard` - Overview page with metrics, charts, and recent activity
  - `/dashboard/settings/profile` - User profile settings form
  - `/dashboard/settings/team` - Team member management with DataTable
  - `/dashboard/settings/billing` - Billing information and history
  - `/dashboard/settings/index` - Redirect to profile settings
  - `/dashboard/projects` - Projects list with search and pagination
  - `/dashboard/projects/[id]` - Project detail/edit form

- **Dashboard Configuration**:
  - `src/config/dashboard-navigation.ts` - Centralized navigation configuration
  - Support for nested navigation items (2 levels)
  - Section headers for grouping menu items
  - Lucide icons for all navigation items

- **Sample Data System**:
  - `src/lib/dashboard-data.ts` - Sample data functions for demonstration
  - Realistic but fictional data for projects, team members, and metrics
  - Easy to replace with real API calls

- **Dashboard Styling**:
  - Status colors (success, warning, error, info) with dark mode variants
  - Consistent color tokens with marketing pages
  - Responsive grid layouts for all screen sizes
  - WCAG 2.1 AA compliant color contrast

- **Dashboard Documentation**:
  - Comprehensive dashboard guide at `docs/09-dashboard.md`
  - Getting started instructions
  - Components reference with examples
  - Customization guidance
  - Authentication implementation patterns
  - Sample data structure explanation
  - Best practices for accessibility, performance, and security

### Changed

- **README Refactor**: Replaced "Dashboard Pages" section with comprehensive "Key Features" section
  - Added Marketing Pages, Dashboard System, Content Management, and Developer Experience sections
  - More balanced presentation of all theme capabilities
  - Updated title from "SaaS Landing Page Theme" to "SaaS Theme" to reflect full scope
- Updated README.md with dashboard section and feature highlights
- Added Chart.js to package.json dependencies
- Extended TypeScript types in `src/lib/types.ts` for dashboard data models
- **Path Aliases**: Added `@dashboard/*` and `@dashboard-ui/*` path aliases for cleaner imports
- Updated all dashboard component imports to use new path aliases

### Notes

- Dashboard pages use sample data and require authentication implementation
- All dashboard components support light/dark themes
- Mobile-responsive design with breakpoints at 768px and 1024px
- Keyboard navigation and screen reader support throughout
- Dashboard is designed as a starting point for customization

## [1.3.1] - 2025-12-24

### Fixed

- Content collections now support both `.md` and `.mdx` files (blog, docs, changelog, testimonials)

## [1.3.0] - 2025-12-24

### Added

- **New Marketing Components**:
  - `HowItWorks` - Step-by-step process visualization
  - `IntegrationsGrid` - Partner integrations showcase with 24 provider logos
  - `SecurityBadges` - Security certifications and compliance badges
  - `VideoEmbed` - Embedded video content for sections
  - `BentoGrid` - Modern grid layout for feature highlights
  - `FeatureHighlight` - Detailed feature presentation
  - `CaseStudyCard` - Customer success story cards

- **New Section Components**:
  - `ChangelogList` - Timeline-based changelog display
  - `ContentSection` - Flexible content layouts with alignment options
  - `FAQSection` - Accordion-style FAQ displays
  - `JobListings` - Career opportunities presentation
  - `PageHeader` - Consistent page title sections
  - `RoadmapTimeline` - Product roadmap visualization
  - `StatsSection` - Metrics and statistics display
  - `StatusOverview` - System status information
  - `TeamSection` - Team member profiles
  - `TestimonialsGrid` - Customer testimonials layout
  - `ValuesSection` - Company values presentation

- **New Pages**:
  - `/customers` - Customer success stories and case studies
  - `/demo` - Demo request form page
  - `/enterprise` - Enterprise features and pricing
  - `/integrations` - Partner integrations showcase
  - `/security` - Security features and compliance information

- **New Forms**:
  - `DemoRequestForm` - Demo request with validation and multi-backend support

- **New Documentation Content**:
  - 8 new documentation guides: edge-network, frameworks, infrastructure, previews, RBAC, rollbacks, SSO, and teams

- **Pricing Enhancements**:
  - `ComparisonTable` - Feature comparison across pricing plans
  - `TrustBadges` - Payment methods and security badges
  - Payment method SVG icons (Visa, Mastercard, Amex, PayPal)

- **Component Enhancements**:
  - Flexible `background` prop for sections (`default`, `muted`, `accent`)
  - Optional `footerLink` prop for FeaturesSection and TestimonialsSection
  - Optional `limit` prop for TestimonialsSection
  - Secondary action button support in CTA component

- **Developer Experience**:
  - Path aliases: `@components/*`, `@sections/*`, `@layout/*`, `@forms/*`, `@ui/*`
  - ESLint configuration with TypeScript and Astro plugin support
  - Prettier configuration with Astro plugin support
  - New npm scripts: `lint`, `lint:fix`, `format`, `format:check`, `check`

### Changed

- **Component Organization**: Reorganized `src/components/sections/` into category-based structure:
  - `content/` - PageHeader, ContentSection, FAQSection
  - `marketing/` - Hero, CTA, LogoCloud, FeaturesSection, Newsletter, HowItWorks, IntegrationsGrid, BentoGrid, FeatureHighlight
  - `pricing/` - PricingTable, ComparisonTable, TrustBadges
  - `product/` - ChangelogList, RoadmapTimeline, StatusOverview
  - `social-proof/` - StatsSection, TestimonialsSection, TestimonialsGrid, CaseStudyCard
  - `team/` - TeamSection, JobListings, ValuesSection
  - `ui/` - ThemeToggle, Pagination (flattened)

- **Navigation**: Centralized all navigation to `src/config/navigation.ts`
  - Header navigation with main links and CTA buttons
  - Footer navigation with Product, Solutions, Resources, Company, and Legal sections
  - Feature-flag filtering for dynamic navigation visibility

- **Layout Components**:
  - Renamed `Navbar.astro` to `Header.astro` with proper `<header>` wrapping `<nav>`
  - Footer legal links now visible on mobile (center aligned with copyright)

- **Astro v6 Compatibility**:
  - Migrated to Content Collections v3 API with glob loaders
  - Updated `z` import from `astro/zod` instead of `astro:content`
  - Replaced `entry.render()` with `render(entry)` function
  - Updated `post.slug` to `post.id` across blog and docs pages

- **Documentation**: Updated all docs in `docs/` folder to reflect current project structure and features

### Updated

- `@iconify-json/lucide` upgraded to v1.2.82
- README with path aliases and updated project structure
- All page templates refactored to use new section components

## [1.2.0] - 2025-12-20

### Added

- **TypeScript Type Annotations**: Comprehensive type safety improvements across the codebase
  - Blog and docs pages with full TypeScript annotations
  - Page components with proper type definitions
  - DocsLayout with comprehensive type annotations
  - BlogLayout slot usage refactored for better type safety

- **Testimonial Card Improvements**: Inline component with initials fallback
  - Avatar now shows initials when image is unavailable
  - Better user experience for missing profile images

### Changed

- **Hero Section**: Enhanced typography and updated homepage messaging
  - Improved visual hierarchy and readability
  - Updated marketing copy for better conversion

- **Features & Testimonials Sections**: Refactored with flexible heading support
  - More customizable section headings
  - Better component composition

- **Content Configuration**: Relocated to root level for better organization
  - Simplified project structure
  - Easier configuration management

- **Environment Configuration**: Simplified setup with improved documentation
  - Cleaner environment variable handling
  - Better developer experience

### Updated

- Dark and light mode screenshots reflecting latest UI changes
- README and documentation improvements

## [1.1.0] - 2025-12-19

### Added

- **Authentication Pages**: Complete auth UI with Login, Register, and Forgot Password pages
  - `LoginForm` component with email/password validation, remember me, demo mode support
  - `RegisterForm` component with full name, email, password, terms agreement validation
  - `ForgotPasswordForm` component for password reset requests
  - `SocialAuthButtons` component for Google/GitHub OAuth buttons
  - All forms support demo mode (simulates success) and custom backend endpoints

- **LogoCloud Component**: Client/partner logo showcase section
  - Three display variants: `default` (static row), `marquee` (animated scroll), `grid`
  - Configurable logo size, grayscale effect, animation speed
  - Placeholder logos included in `public/images/logos/`

- **Newsletter Component**: Standalone newsletter subscription section
  - Extracted from Footer for flexible placement
  - Three variants: `default`, `compact`, `card`
  - Configurable background styles and messaging
  - Demo mode and custom endpoint support

- **Documentation Landing Page**: Interactive docs index page
  - Hero section with quick start buttons
  - Quick links to popular documentation
  - Organized sections with icons and descriptions
  - Help section with support links

- **Navbar Updates**: Added authentication links
  - "Login" text link navigating to `/login`
  - "Get Started" button navigating to `/register`
  - Mobile menu includes auth links with divider

- **Landing Page Updates**:
  - LogoCloud section below Hero ("Trusted by innovative teams")
  - Newsletter section above Footer
  - CTA buttons now link to `/register` instead of `/pricing`

- **Validation Utilities**: New validators in `src/lib/validation.ts`
  - `password(minLength)` - Password minimum length validation
  - `checkbox(fieldName)` - Checkbox required validation

### Changed

- Footer no longer includes Newsletter section (moved to standalone component)
- Documentation reorganized with new authentication guide (`docs/07-authentication.md`)
- Components documentation updated with LogoCloud and Newsletter sections

## [1.0.0] - 2025-12-18

### Added

- Initial release of Virex - SaaS Landing Page Theme for Astro 5

- **Content Collections**:
  - Blog with pagination, tag filtering, and reading time calculation
  - Documentation with auto-generated sidebar navigation
  - Changelog for version history
  - Testimonials collection

- **Core Pages**:
  - Landing page with Hero, Features, Testimonials, CTA sections
  - Features, Pricing, About, Contact, FAQ pages
  - Careers, Status, Roadmap pages
  - Legal pages (Privacy Policy, Terms of Service)
  - Error pages (403, 404, 500)

- **Components**:
  - Hero, FeatureGrid, PricingTable, CTA sections
  - Navbar with mobile menu and theme toggle
  - Footer with newsletter and social links
  - ContactForm with validation and multiple backend support (Netlify, Formspree, custom)
  - TestimonialCard, Pagination, AnnouncementBar
  - SEO component with meta tags, Open Graph, Twitter Cards, JSON-LD
  - OptimizedImage for smart image optimization

- **Layouts**:
  - MarketingLayout, BlogLayout, DocsLayout, ErrorLayout, BaseLayout

- **Features**:
  - Design tokens system with OKLCH colors for easy brand customization
  - Dark mode with localStorage persistence and system preference detection
  - SEO optimized with sitemap and RSS feed generation
  - Feature flags to enable/disable sections (blog, docs, changelog, testimonials, roadmap)
  - Accessibility features (focus states, reduced motion, semantic HTML)
  - 200,000+ icons via astro-icon (Lucide + Simple Icons)
  - Announcement bar with dismissible state

- **Documentation**:
  - Getting started guide
  - Configuration reference
  - Customization guide
  - Content management guide
  - Components documentation
  - Pages and routing guide
  - Deployment guide (Vercel, Netlify, Cloudflare)
