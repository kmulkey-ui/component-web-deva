export type ComponentCategory =
  | "Text & Typography"
  | "Buttons & Actions"
  | "Cards & Panels"
  | "Hero & Landing"
  | "Backgrounds & Atmosphere"
  | "Sliders & Carousels"
  | "Borders, Glows & Badges"
  | "Navigation & Interactive"
  | "Showcase & Display";

export interface ComponentEntry {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  darkBg?: boolean;
}

export const categories: ComponentCategory[] = [
  "Text & Typography",
  "Buttons & Actions",
  "Cards & Panels",
  "Hero & Landing",
  "Backgrounds & Atmosphere",
  "Sliders & Carousels",
  "Borders, Glows & Badges",
  "Navigation & Interactive",
  "Showcase & Display",
];

export const categoryStyle: Record<ComponentCategory, { bg: string; border: string; heading: string; badge: string; num: string }> = {
  "Text & Typography": {
    bg: "bg-pink-50",
    border: "border-pink-200",
    heading: "text-pink-700 bg-pink-100 border-pink-200",
    badge: "bg-pink-200 text-pink-800",
    num: "text-pink-400",
  },
  "Buttons & Actions": {
    bg: "bg-violet-50",
    border: "border-violet-200",
    heading: "text-violet-700 bg-violet-100 border-violet-200",
    badge: "bg-violet-200 text-violet-800",
    num: "text-violet-400",
  },
  "Cards & Panels": {
    bg: "bg-sky-50",
    border: "border-sky-200",
    heading: "text-sky-700 bg-sky-100 border-sky-200",
    badge: "bg-sky-200 text-sky-800",
    num: "text-sky-400",
  },
  "Hero & Landing": {
    bg: "bg-rose-50",
    border: "border-rose-200",
    heading: "text-rose-700 bg-rose-100 border-rose-200",
    badge: "bg-rose-200 text-rose-800",
    num: "text-rose-400",
  },
  "Backgrounds & Atmosphere": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    heading: "text-purple-700 bg-purple-100 border-purple-200",
    badge: "bg-purple-200 text-purple-800",
    num: "text-purple-400",
  },
  "Sliders & Carousels": {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    heading: "text-cyan-700 bg-cyan-100 border-cyan-200",
    badge: "bg-cyan-200 text-cyan-800",
    num: "text-cyan-500",
  },
  "Borders, Glows & Badges": {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    heading: "text-fuchsia-700 bg-fuchsia-100 border-fuchsia-200",
    badge: "bg-fuchsia-200 text-fuchsia-800",
    num: "text-fuchsia-400",
  },
  "Navigation & Interactive": {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    heading: "text-indigo-700 bg-indigo-100 border-indigo-200",
    badge: "bg-indigo-200 text-indigo-800",
    num: "text-indigo-400",
  },
  "Showcase & Display": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    heading: "text-blue-700 bg-blue-100 border-blue-200",
    badge: "bg-blue-200 text-blue-800",
    num: "text-blue-400",
  },
};

export const components: ComponentEntry[] = [
  // ── Text & Typography ──────────────────────────────────────
  { slug: "gooey-text-morphing",   name: "Gooey Text Morphing",   category: "Text & Typography",        description: "Fluid text that morphs between words with a gooey SVG filter.",     darkBg: true },
  { slug: "text-color",            name: "Text Color",             category: "Text & Typography",        description: "Animated gradient text with vivid flowing color transitions.",       darkBg: true },
  { slug: "animated-text",         name: "Animated Text",          category: "Text & Typography",        description: "Text that animates in character by character with spring physics.",  darkBg: true },
  { slug: "shimmer-text",          name: "Shimmer Text",           category: "Text & Typography",        description: "Text with a shimmering light sweep across the letters.",            darkBg: true },
  { slug: "special-text",          name: "Special Text",           category: "Text & Typography",        description: "Stylized text with decorative special-effect rendering.",            darkBg: true },
  { slug: "text-scramble",         name: "Text Scramble",          category: "Text & Typography",        description: "Text that scrambles through random characters before resolving.",    darkBg: true },
  { slug: "vapour-text-effect",    name: "Vapour Text Effect",     category: "Text & Typography",        description: "Text that vaporizes and reforms with a smoky particle trail.",       darkBg: true },

  // ── Buttons & Actions ─────────────────────────────────────
  { slug: "gradient-button",       name: "Gradient Button",        category: "Buttons & Actions",        description: "Animated, conic, radial, and static gradient button variants.",      darkBg: false },
  { slug: "hover-glow-button",     name: "Hover Glow Button",      category: "Buttons & Actions",        description: "Button with a customizable radial glow that blooms on hover.",       darkBg: true },
  { slug: "button-colorful",       name: "Colorful Button",        category: "Buttons & Actions",        description: "Button with a shifting multi-color animated border effect.",         darkBg: true },

  // ── Cards & Panels ─────────────────────────────────────────
  { slug: "holographic-card",      name: "Holographic Card",       category: "Cards & Panels",           description: "Prismatic holographic sheen that shifts with mouse movement.",       darkBg: true },
  { slug: "gradient-card-showcase",name: "Gradient Card Showcase", category: "Cards & Panels",           description: "Skewed cards with bold gradient fills and typographic layouts.",     darkBg: true },
  { slug: "spotlight-card",        name: "Spotlight Card",         category: "Cards & Panels",           description: "Card with a cursor-following spotlight radial glow.",                darkBg: true },
  { slug: "animate-card-animation",name: "Animated Card Stack",    category: "Cards & Panels",           description: "Stacked cards that fan out with smooth spring animations.",          darkBg: true },
  { slug: "card-stack",            name: "Card Stack",             category: "Cards & Panels",           description: "Layered card stack with hover-expand depth and shadow.",            darkBg: true },
  { slug: "tilt-card",             name: "Tilt Card",              category: "Cards & Panels",           description: "Card that tilts in 3D perspective following your cursor.",           darkBg: true },
  { slug: "scanner-card-stream",   name: "Scanner Card Stream",    category: "Cards & Panels",           description: "Cards with a scanning line animation for a tech/data aesthetic.",   darkBg: true },

  // ── Hero & Landing ─────────────────────────────────────────
  { slug: "illuminated-hero",      name: "Illuminated Hero",       category: "Hero & Landing",           description: "Full-screen hero with dramatic light bloom and film grain texture.", darkBg: true },
  { slug: "waitlist-hero",         name: "Waitlist Hero",          category: "Hero & Landing",           description: "Conversion-ready hero with email capture and confetti celebration.", darkBg: true },
  { slug: "connect-with-us",       name: "Connect With Us",        category: "Hero & Landing",           description: "Animated social media section with orbiting icon connections.",      darkBg: true },
  { slug: "integration-hero",      name: "Integration Hero",       category: "Hero & Landing",           description: "Hero showcasing tech integrations with animated connecting lines.",  darkBg: true },
  { slug: "music-reactive-hero-section", name: "Music Reactive Hero", category: "Hero & Landing",       description: "Hero section with visuals that pulse and react to music playback.",  darkBg: true },
  { slug: "zoom-parallax",         name: "Zoom Parallax",          category: "Hero & Landing",           description: "Images that scale into the screen on scroll for a cinematic feel.", darkBg: true },
  { slug: "animated-sign-in",      name: "Animated Sign In",       category: "Hero & Landing",           description: "Sign-in page with smooth entrance animations and gradient panels.",  darkBg: true },

  // ── Backgrounds & Atmosphere ──────────────────────────────
  { slug: "mouse-responsive-background", name: "Mouse Responsive BG", category: "Backgrounds & Atmosphere", description: "Background layers that parallax-shift in response to mouse position.", darkBg: true },
  { slug: "sparkles",              name: "Sparkles",               category: "Backgrounds & Atmosphere", description: "Canvas-based animated particle field creating a starfield effect.",  darkBg: true },
  { slug: "container-scroll-animation", name: "Container Scroll", category: "Backgrounds & Atmosphere", description: "Perspective tilt animation triggered as the container enters view.",  darkBg: true },
  { slug: "animated-gradient-background", name: "Animated Gradient BG", category: "Backgrounds & Atmosphere", description: "Slowly morphing full-screen gradient background.",             darkBg: true },
  { slug: "background-boxes",      name: "Background Boxes",       category: "Backgrounds & Atmosphere", description: "Grid of boxes that light up with color on hover for a neon grid look.", darkBg: true },
  { slug: "animated-video-on-scroll", name: "Video on Scroll",    category: "Backgrounds & Atmosphere", description: "Video element that expands from a pill to full-screen as you scroll.", darkBg: true },
  { slug: "hero-highlight",        name: "Hero Highlight",         category: "Backgrounds & Atmosphere", description: "Wavy animated highlight underline drawn beneath selected text.",     darkBg: true },
  { slug: "grid-pixelate-wipe",    name: "Grid Pixelate Wipe",    category: "Backgrounds & Atmosphere", description: "Pixel-grid wipe transition for dramatic section reveals.",           darkBg: true },

  // ── Sliders & Carousels ────────────────────────────────────
  { slug: "interactive-image-accordion", name: "Image Accordion",  category: "Sliders & Carousels",      description: "Hover-activated image panels that expand with fluid transitions.",   darkBg: true },
  { slug: "argent-loop-infinite-slider", name: "Infinite Loop Slider", category: "Sliders & Carousels", description: "Touch/wheel infinite slider with smooth momentum scrolling.",         darkBg: true },
  { slug: "feature-carousel",      name: "Feature Carousel",       category: "Sliders & Carousels",      description: "Auto-advancing carousel with animated progress indicators.",         darkBg: true },
  { slug: "image-auto-slider",     name: "Image Auto Slider",      category: "Sliders & Carousels",      description: "Continuously auto-scrolling image strip loop.",                      darkBg: true },
  { slug: "story-scroll",          name: "Story Scroll",           category: "Sliders & Carousels",      description: "Vertical story-style scroll with sticky content sections.",           darkBg: true },

  // ── Borders, Glows & Badges ───────────────────────────────
  { slug: "shine-border",          name: "Shine Border",           category: "Borders, Glows & Badges",  description: "Animated rotating shine effect around any element's border.",         darkBg: true },
  { slug: "animated-gradient-border", name: "Animated Gradient Border", category: "Borders, Glows & Badges", description: "Border with a continuously rotating gradient color sweep.",      darkBg: true },
  { slug: "glowing-shadow",        name: "Glowing Shadow",         category: "Borders, Glows & Badges",  description: "Elements with a vivid colored bloom glow shadow.",                   darkBg: true },
  { slug: "award-badge",           name: "Award Badge",            category: "Borders, Glows & Badges",  description: "Product Hunt-style badges for Golden Kitty, POTD, POTW, POTM.",    darkBg: true },

  // ── Navigation & Interactive ──────────────────────────────
  { slug: "gradient-menu",         name: "Gradient Menu",          category: "Navigation & Interactive", description: "Navigation menu with gradient-filled active state animations.",      darkBg: true },
  { slug: "animated-glowing-search-bar", name: "Glowing Search Bar", category: "Navigation & Interactive", description: "Search input with a pulsing glow and animated placeholder text.", darkBg: true },
  { slug: "stacked-panels",        name: "Stacked Panels",         category: "Navigation & Interactive", description: "Cursor-interactive stacked panels that fan open on mouse movement.", darkBg: true },

  // ── Showcase & Display ─────────────────────────────────────
  { slug: "team-showcase",         name: "Team Showcase",          category: "Showcase & Display",       description: "Team member cards with hover reveals and role labels.",               darkBg: true },
  { slug: "project-showcase",      name: "Project Showcase",       category: "Showcase & Display",       description: "Portfolio project cards with animated preview overlays.",             darkBg: true },
  { slug: "circular-testimonials", name: "Circular Testimonials",  category: "Showcase & Display",       description: "Testimonial quotes rotating around a circular orbit layout.",         darkBg: true },
  { slug: "map",                   name: "Interactive Map",         category: "Showcase & Display",       description: "Embeddable interactive map with custom markers and popups.",          darkBg: true },
  { slug: "gallery",               name: "Photo Gallery",           category: "Showcase & Display",       description: "Animated photo gallery with staggered entrance and drag-to-dismiss.", darkBg: false },

  // ══ Imported from the Matt Chapin & Katelyn Mulkey sites ══════════════════
  // ── Text & Typography ──
  { slug: "morphing-text",         name: "Morphing Text",          category: "Text & Typography",        description: "Text that fluidly morphs between words with a blur filter.",         darkBg: true },
  { slug: "word-rotate",           name: "Word Rotate",            category: "Text & Typography",        description: "Words that rotate in and out with spring motion.",                    darkBg: false },
  { slug: "animated-shiny-text",   name: "Animated Shiny Text",    category: "Text & Typography",        description: "Text with a light shimmer sweeping across it.",                       darkBg: false },
  { slug: "sparkles-text",         name: "Sparkles Text",          category: "Text & Typography",        description: "Text sprinkled with twinkling animated sparkles.",                    darkBg: false },
  { slug: "velocity-marquee",      name: "Velocity Marquee",       category: "Text & Typography",        description: "Scroll-reactive marquee that speeds up as you scroll.",               darkBg: false },
  { slug: "particle-text",         name: "Particle Text",          category: "Text & Typography",        description: "WebGL particle field that forms text and reacts to the cursor.",      darkBg: true },
  { slug: "neon-rgb-text",         name: "Neon RGB Text",          category: "Text & Typography",        description: "Glowing neon text with shifting RGB chromatic edges.",                darkBg: true },

  // ── Buttons & Actions ──
  { slug: "liquid-glass-button",   name: "Liquid Glass Button",    category: "Buttons & Actions",        description: "Frosted liquid-glass button with a refractive sheen.",                darkBg: false },
  { slug: "win-98-button",         name: "Windows 98 Button",      category: "Buttons & Actions",        description: "Retro Windows 98 beveled button.",                                    darkBg: false },
  { slug: "rainbow-button",        name: "Rainbow Button",         category: "Buttons & Actions",        description: "Button wrapped in an animated rainbow gradient glow.",                darkBg: true },
  { slug: "confetti",              name: "Confetti Button",        category: "Buttons & Actions",        description: "Button that bursts canvas confetti on click.",                        darkBg: false },

  // ── Cards & Panels ──
  { slug: "border-sheen-card",     name: "Border Sheen Card",      category: "Cards & Panels",           description: "Card edged with a rotating conic-gradient sheen.",                    darkBg: false },
  { slug: "holographic-pricing-card", name: "Holographic Pricing Card", category: "Cards & Panels",     description: "Pricing card with a tilt-reactive holographic finish.",               darkBg: true },
  { slug: "glow-cards",            name: "Glow Cards",             category: "Cards & Panels",           description: "Angled cards with vivid gradient glow panels.",                       darkBg: true },
  { slug: "gradient-shader-card",  name: "Gradient Shader Card",   category: "Cards & Panels",           description: "Card backed by a live grainy Three.js gradient shader.",              darkBg: true },
  { slug: "image-spotlight",       name: "Image Spotlight",        category: "Cards & Panels",           description: "Image that tilts in 3D with a cursor-tracking spotlight.",            darkBg: false },

  // ── Backgrounds & Atmosphere ──
  { slug: "background-gradient-animation", name: "Background Gradient Animation", category: "Backgrounds & Atmosphere", description: "Full-screen morphing multi-color gradient blobs.",         darkBg: true },
  { slug: "blobs",                 name: "Animated Blobs",         category: "Backgrounds & Atmosphere", description: "Soft organic blobs drifting in the background.",                      darkBg: false },
  { slug: "particles",             name: "Particles",              category: "Backgrounds & Atmosphere", description: "Configurable canvas particle field.",                                 darkBg: true },
  { slug: "mouse-sparkles",        name: "Mouse Sparkles",         category: "Backgrounds & Atmosphere", description: "Sparkles that trail the cursor across the screen.",                   darkBg: true },
  { slug: "interactive-dots",      name: "Interactive Dots",       category: "Backgrounds & Atmosphere", description: "Dot grid that ripples in response to the cursor.",                    darkBg: true },
  { slug: "glitch-background",     name: "Glitch Background",      category: "Backgrounds & Atmosphere", description: "GLSL glitch/scanline animated background.",                           darkBg: true },
  { slug: "organic-gradient-background", name: "Organic Gradient Background", category: "Backgrounds & Atmosphere", description: "Flowing organic gradient driven by Three.js + GSAP.",         darkBg: true },
  { slug: "shader-background",     name: "Shader Background",      category: "Backgrounds & Atmosphere", description: "Animated fragment-shader gradient background (OGL).",                 darkBg: true },
  { slug: "wave-scene",            name: "Wave Scene",             category: "Backgrounds & Atmosphere", description: "Parallax image scene that drifts on scroll.",                         darkBg: true },
  { slug: "aurora-shader",         name: "Aurora Shader",          category: "Backgrounds & Atmosphere", description: "Aurora-like flowing shader gradient.",                                darkBg: true },
  { slug: "dithering-shader",      name: "Dithering Shader",       category: "Backgrounds & Atmosphere", description: "Retro dithered shader pattern.",                                      darkBg: true },
  { slug: "warp-shader",           name: "Warp Shader",            category: "Backgrounds & Atmosphere", description: "Warping liquid shader field.",                                        darkBg: true },
  { slug: "web-gl-shader",         name: "WebGL Shader",           category: "Backgrounds & Atmosphere", description: "Raw WebGL fragment-shader animation.",                                darkBg: true },
  { slug: "revolution-shader",     name: "Revolution Shader",      category: "Backgrounds & Atmosphere", description: "GSAP-driven revolving shader visual.",                                darkBg: true },

  // ── Sliders & Carousels ──
  { slug: "circular-gallery",      name: "Circular Gallery",       category: "Sliders & Carousels",      description: "Images arranged on a rotating 3D circular carousel.",                 darkBg: true },
  { slug: "scroll-morph-hero",     name: "Scroll Morph Hero",      category: "Sliders & Carousels",      description: "Portfolio hero whose gallery morphs as you scroll.",                  darkBg: true },

  // ── Showcase & Display ──
  { slug: "circular-reveal-heading", name: "Circular Reveal Heading", category: "Showcase & Display",    description: "Circular text heading that reveals images on hover.",                 darkBg: false },
  { slug: "gravity",               name: "Gravity",                category: "Showcase & Display",       description: "Draggable chips with real Matter.js physics gravity.",                darkBg: true },
  { slug: "ensemble-accordion",    name: "Ensemble Accordion",     category: "Showcase & Display",       description: "Hover-expanding image accordion panels.",                             darkBg: false },
  { slug: "audio-player",          name: "Audio Player",           category: "Showcase & Display",       description: "Full audio player with playlist, scrub, shuffle and repeat.",         darkBg: true },
];
