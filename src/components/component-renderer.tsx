"use client";

import dynamic from "next/dynamic";

// ── Text & Typography ──────────────────────────────────────
const GooeyText = dynamic(() => import("@/components/ui/gooey-text-morphing").then((m) => m.GooeyText), { ssr: false });
const TextColor = dynamic(() => import("@/components/ui/text-color").then((m) => m.TextColor), { ssr: false });
const AnimatedText = dynamic(() => import("@/components/ui/animated-text").then((m) => m.AnimatedText), { ssr: false });
const ShimmerText = dynamic(() => import("@/components/ui/shimmer-text").then((m) => m.ShimmerText), { ssr: false });
const SpecialText = dynamic(() => import("@/components/ui/special-text").then((m) => m.SpecialText), { ssr: false });
const TextScramble = dynamic(() => import("@/components/text-scramble").then((m) => m.TextScramble), { ssr: false });
const VapourText = dynamic(() => import("@/components/vapour-text-effect"), { ssr: false });

// ── Buttons & Actions ─────────────────────────────────────
const AdvancedButton = dynamic(() => import("@/components/gradient-button").then((m) => m.AdvancedButton), { ssr: false });
const HoverButton = dynamic(() => import("@/components/hover-glow-button").then((m) => m.HoverButton), { ssr: false });
const ButtonColorful = dynamic(() => import("@/components/ui/button-colorful").then((m) => m.ButtonColorful), { ssr: false });

// ── Cards & Panels ─────────────────────────────────────────
const HolographicCard = dynamic(() => import("@/components/holographic-card"), { ssr: false });
const SkewCards = dynamic(() => import("@/components/gradient-card-showcase"), { ssr: false });
const GlowCard = dynamic(() => import("@/components/spotlight-card").then((m) => m.GlowCard), { ssr: false });
const AnimatedCardStack = dynamic(() => import("@/components/animate-card-animation"), { ssr: false });
const CardStack = dynamic(() => import("@/components/card-stack").then((m) => m.CardStack), { ssr: false });
const TiltCard = dynamic(() => import("@/components/ui/tilt-card").then((m) => m.TiltCard), { ssr: false });
const ScannerCardStream = dynamic(() => import("@/components/scanner-card-stream").then((m) => m.ScannerCardStream), { ssr: false });

// ── Hero & Landing ─────────────────────────────────────────
const IlluminatedHero = dynamic(() => import("@/components/illuminated-hero").then((m) => m.IlluminatedHero), { ssr: false });
const WaitlistHero = dynamic(() => import("@/components/waitlist-hero").then((m) => m.WaitlistHero), { ssr: false });
const SocialConnect = dynamic(() => import("@/components/connect-with-us").then((m) => m.SocialConnect), { ssr: false });
const IntegrationHero = dynamic(() => import("@/components/integration-hero").then((m) => m.default), { ssr: false });
const MusicHero = dynamic(() => import("@/components/music-reactive-hero-section").then((m) => m.Component), { ssr: false });
const ZoomParallax = dynamic(() => import("@/components/zoom-parallax").then((m) => m.ZoomParallax), { ssr: false });
const AnimatedSignIn = dynamic(() => import("@/components/animated-sign-in"), { ssr: false });

// ── Backgrounds & Atmosphere ──────────────────────────────
const ParallaxBackground = dynamic(() => import("@/components/mouse-responsive-background"), { ssr: false });
const SparklesCore = dynamic(() => import("@/components/ui/sparkles").then((m) => m.SparklesCore), { ssr: false });
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then((m) => m.ContainerScroll), { ssr: false });
const AnimatedGradientBg = dynamic(() => import("@/components/ui/animated-gradient-background"), { ssr: false });
const BoxesCore = dynamic(() => import("@/components/ui/background-boxes").then((m) => m.BoxesCore), { ssr: false });
const HeroHighlight = dynamic(() => import("@/components/ui/hero-highlight").then((m) => m.HeroHighlight), { ssr: false });
const GridPixelateWipe = dynamic(() => import("@/components/ui/grid-pixelate-wipe").then((m) => m.GridPixelateWipe), { ssr: false });
// Remotion composition components (useCurrentFrame/useVideoConfig) must run inside a Player.
const RemotionPlayer = dynamic(() => import("@remotion/player").then((m) => m.Player), { ssr: false });

// ── Sliders & Carousels ────────────────────────────────────
const LandingAccordionItem = dynamic(() => import("@/components/interactive-image-accordion").then((m) => m.LandingAccordionItem), { ssr: false });
const InfiniteSlider = dynamic(() => import("@/components/argent-loop-infinite-slider").then((m) => m.Component), { ssr: false });
const FeatureCarousel = dynamic(() => import("@/components/feature-carousel").then((m) => m.FeatureCarousel), { ssr: false });
const ImageAutoSlider = dynamic(() => import("@/components/image-auto-slider").then((m) => m.Component), { ssr: false });
const StoryScroll = dynamic(() => import("@/components/story-scroll").then((m) => m.FlowSection), { ssr: false });

// ── Borders, Glows & Badges ───────────────────────────────
const ShineBorder = dynamic(() => import("@/components/ui/shine-border").then((m) => m.ShineBorder), { ssr: false });
const BorderRotate = dynamic(() => import("@/components/animated-gradient-border").then((m) => m.BorderRotate), { ssr: false });
const GlowingShadow = dynamic(() => import("@/components/glowing-shadow").then((m) => m.GlowingShadow), { ssr: false });
const AwardBadge = dynamic(() => import("@/components/ui/award-badge").then((m) => m.AwardBadge), { ssr: false });

// ── Navigation & Interactive ──────────────────────────────
const GradientMenu = dynamic(() => import("@/components/gradient-menu"), { ssr: false });
const SearchComponent = dynamic(() => import("@/components/animated-glowing-search-bar"), { ssr: false });
const StackedPanels = dynamic(() => import("@/components/stacked-panels-cursor-intereactive-component"), { ssr: false });

// ── Showcase & Display ─────────────────────────────────────
const TeamShowcase = dynamic(() => import("@/components/team-showcase"), { ssr: false });
const ProjectShowcase = dynamic(() => import("@/components/project-showcase").then((m) => m.ProjectShowcase), { ssr: false });
const CircularTestimonials = dynamic(() => import("@/components/circular-testimonials").then((m) => m.CircularTestimonials), { ssr: false });
const MapComponent = dynamic(() => import("@/components/map").then((m) => m.Map), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/ui/gallery").then((m) => m.PhotoGallery), { ssr: false });

// ── Imported from Matt Chapin & Katelyn Mulkey sites ──────
// Text & Typography
const MorphingText = dynamic(() => import("@/components/ui/morphing-text").then((m) => m.MorphingText), { ssr: false });
const WordRotate = dynamic(() => import("@/components/ui/word-rotate").then((m) => m.WordRotate), { ssr: false });
const AnimatedShinyText = dynamic(() => import("@/components/ui/animated-shiny-text").then((m) => m.AnimatedShinyText), { ssr: false });
const SparklesText = dynamic(() => import("@/components/ui/sparkles-text").then((m) => m.SparklesText), { ssr: false });
const VelocityMarquee = dynamic(() => import("@/components/ui/velocity-marquee"), { ssr: false });
const ParticleText = dynamic(() => import("@/components/particle-text"), { ssr: false });
const NeonRGBText = dynamic(() => import("@/components/neon-rgb-text"), { ssr: false });
// Buttons & Actions
const LiquidButton = dynamic(() => import("@/components/ui/liquid-glass-button").then((m) => m.LiquidButton), { ssr: false });
const Win98Button = dynamic(() => import("@/components/ui/win-98-button").then((m) => m.Win98Button), { ssr: false });
const RainbowButton = dynamic(() => import("@/components/rainbow-button"), { ssr: false });
const ConfettiButton = dynamic(() => import("@/components/ui/confetti").then((m) => m.ConfettiButton), { ssr: false });
// Cards & Panels
const BorderSheenCard = dynamic(() => import("@/components/ui/border-sheen-card").then((m) => m.BorderSheenCard), { ssr: false });
const HoloPricingCard = dynamic(() => import("@/components/ui/holographic-pricing-card").then((m) => m.HoloPricingCard), { ssr: false });
const GlowCards = dynamic(() => import("@/components/ui/glow-cards").then((m) => m.GlowCards), { ssr: false });
const GradientShaderCard = dynamic(() => import("@/components/ui/gradient-shader-card").then((m) => m.GradientShaderCard), { ssr: false });
const ImageSpotlight = dynamic(() => import("@/components/ui/image-spotlight"), { ssr: false });
// Backgrounds & Atmosphere
const BackgroundGradientAnimation = dynamic(() => import("@/components/ui/background-gradient-animation").then((m) => m.BackgroundGradientAnimation), { ssr: false });
const AnimatedBlobs = dynamic(() => import("@/components/ui/blobs").then((m) => m.AnimatedBlobs), { ssr: false });
const Particles = dynamic(() => import("@/components/ui/particles").then((m) => m.Particles), { ssr: false });
const MouseSparkles = dynamic(() => import("@/components/ui/mouse-sparkles").then((m) => m.MouseSparkles), { ssr: false });
const InteractiveDots = dynamic(() => import("@/components/ui/interactive-dots").then((m) => m.InteractiveDots), { ssr: false });
const GlitchBackground = dynamic(() => import("@/components/glitch-background"), { ssr: false });
const OrganicGradientBackground = dynamic(() => import("@/components/organic-gradient-background"), { ssr: false });
const ShaderBackground = dynamic(() => import("@/components/shader-background"), { ssr: false });
const WaveScene = dynamic(() => import("@/components/wave-scene"), { ssr: false });
const AuroraShader = dynamic(() => import("@/components/ui/aurora-shader"), { ssr: false });
const DitheringShader = dynamic(() => import("@/components/ui/dithering-shader").then((m) => m.DitheringShader), { ssr: false });
const WarpShader = dynamic(() => import("@/components/ui/warp-shader").then((m) => m.WarpShader), { ssr: false });
const WebGLShader = dynamic(() => import("@/components/ui/web-gl-shader").then((m) => m.WebGLShader), { ssr: false });
const RevolutionShader = dynamic(() => import("@/components/ui/revolution-shader").then((m) => m.RevolutionShader), { ssr: false });
// Sliders & Carousels
const CircularGallery = dynamic(() => import("@/components/ui/circular-gallery").then((m) => m.CircularGallery), { ssr: false });
const ScrollMorphHero = dynamic(() => import("@/components/ui/scroll-morph-hero"), { ssr: false });
// Showcase & Display
const CircularRevealHeading = dynamic(() => import("@/components/ui/circular-reveal-heading").then((m) => m.CircularRevealHeading), { ssr: false });
const Gravity = dynamic(() => import("@/components/ui/gravity").then((m) => m.Gravity), { ssr: false });
const MatterBody = dynamic(() => import("@/components/ui/gravity").then((m) => m.MatterBody), { ssr: false });
const EnsembleAccordion = dynamic(() => import("@/components/ensemble-accordion"), { ssr: false });
const AudioPlayerDemo = dynamic(() => import("@/components/audio-player-demo"), { ssr: false });

// Shared light wrapper styles
const light = "flex items-center justify-center min-h-[80vh] bg-white";
const lightGray = "flex items-center justify-center min-h-[80vh] bg-gray-50";
const lightWrap = "flex flex-wrap items-center justify-center gap-8 min-h-[80vh] bg-white p-12";
const lightGrayWrap = "flex flex-wrap items-center justify-center gap-8 min-h-[80vh] bg-gray-50 p-12";

export function ComponentRenderer({ slug }: { slug: string }) {
  switch (slug) {

    // ── Text & Typography ──────────────────────────────────────
    case "gooey-text-morphing":
      return (
        <div className={light}>
          <GooeyText
            texts={["Creative", "Beautiful", "Minimal", "Elegant", "Modern"]}
            morphTime={1.5}
            cooldownTime={2}
            className="text-6xl font-bold"
            textClassName="text-pink-600"
          />
        </div>
      );

    case "text-color":
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white gap-4 p-8">
          <style>{`
            @keyframes gc1 { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
            @keyframes gc2 { 0%,100%{background-position:100% 50%} 50%{background-position:0% 50%} }
            @keyframes gc3 { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
            .tc1{background-image:linear-gradient(to right,#6366f1,#a855f7,#6366f1);background-size:300% 300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gc1 4s ease infinite;}
            .tc2{background-image:linear-gradient(to right,#ec4899,#f97316,#ec4899);background-size:300% 300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gc2 4s ease infinite;}
            .tc3{background-image:linear-gradient(to right,#06b6d4,#3b82f6,#06b6d4);background-size:300% 300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gc3 4s ease infinite;}
          `}</style>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">Animated Gradient Text</p>
          <span className="tc1 text-7xl font-extrabold tracking-tight">Develop.</span>
          <span className="tc2 text-7xl font-extrabold tracking-tight">Preview.</span>
          <span className="tc3 text-7xl font-extrabold tracking-tight">Ship.</span>
        </div>
      );

    case "animated-text":
      return (
        <div className="flex flex-col items-center justify-center gap-8 min-h-[80vh] bg-white">
          <AnimatedText text="Hello, World!" className="text-5xl font-bold text-gray-900" />
          <AnimatedText text="Beautiful animations." className="text-3xl text-gray-600" />
        </div>
      );

    case "shimmer-text":
      return (
        <div className="flex flex-col items-center justify-center gap-8 min-h-[80vh] bg-white">
          <ShimmerText variant="pink" duration={1.5} delay={0.3} className="text-6xl font-bold">Shimmer Effect</ShimmerText>
          <ShimmerText variant="fuchsia" duration={1.5} delay={0.8} className="text-3xl">Light sweep text</ShimmerText>
          <ShimmerText variant="violet" duration={1.5} delay={1.3} className="text-3xl">Violet variant</ShimmerText>
        </div>
      );

    case "special-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
          <SpecialText className="text-5xl font-bold text-gray-900">Special Text Effect</SpecialText>
        </div>
      );

    case "text-scramble":
      return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh] bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Hover to scramble</p>
          <TextScramble text="HOVER OVER ME" className="text-5xl font-bold text-gray-900 cursor-pointer" />
          <TextScramble text="SCRAMBLE EFFECT" className="text-3xl font-semibold text-pink-600 cursor-pointer" />
        </div>
      );

    case "vapour-text-effect":
      // Has hardcoded bg-black h-screen w-screen — show it in a constrained dark card
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-8">
          <div className="w-full rounded-2xl overflow-hidden shadow-xl" style={{ height: "60vh" }}>
            <VapourText />
          </div>
        </div>
      );

    // ── Buttons & Actions ─────────────────────────────────────
    case "gradient-button":
      return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh] bg-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">Gradient Button Variants</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="advanced-button btn-large gradient-animated">Animated</button>
            <button className="advanced-button btn-large gradient-conic"><span className="button-text">Conic</span></button>
            <button className="advanced-button btn-large gradient-radial"><span className="button-text">Radial</span></button>
            <button className="advanced-button btn-large btn-primary"><span className="button-text">Primary</span></button>
            <button className="advanced-button btn-large btn-ghost" style={{ color: "#6366f1" }}><span style={{ position: "relative", zIndex: 10 }}>Ghost</span></button>
          </div>
        </div>
      );

    case "hover-glow-button":
      return (
        <div className={lightWrap}>
          <HoverButton glowColor="#6366f1" backgroundColor="#1e1b4b" textColor="#a5b4fc">Indigo Glow</HoverButton>
          <HoverButton glowColor="#ec4899" backgroundColor="#1f172a" textColor="#f9a8d4">Pink Glow</HoverButton>
          <HoverButton glowColor="#10b981" backgroundColor="#022c22" textColor="#6ee7b7">Emerald Glow</HoverButton>
          <HoverButton glowColor="#f59e0b" backgroundColor="#1c1003" textColor="#fcd34d">Amber Glow</HoverButton>
        </div>
      );

    case "button-colorful":
      return (
        <div className={light}>
          <ButtonColorful label="Click Me" />
        </div>
      );

    // ── Cards & Panels ─────────────────────────────────────────
    case "holographic-card":
      return <div className={lightGray}><HolographicCard /></div>;

    case "gradient-card-showcase":
      return <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 overflow-hidden"><SkewCards /></div>;

    case "spotlight-card":
      return (
        <div className={lightGrayWrap}>
          <GlowCard glowColor="blue" size="md"><div className="p-6 text-center"><div className="text-3xl mb-2">💙</div><h3 className="text-white font-semibold mb-1">Blue</h3><p className="text-zinc-400 text-sm">Hover to glow</p></div></GlowCard>
          <GlowCard glowColor="purple" size="md"><div className="p-6 text-center"><div className="text-3xl mb-2">💜</div><h3 className="text-white font-semibold mb-1">Purple</h3><p className="text-zinc-400 text-sm">Hover to glow</p></div></GlowCard>
          <GlowCard glowColor="green" size="md"><div className="p-6 text-center"><div className="text-3xl mb-2">💚</div><h3 className="text-white font-semibold mb-1">Green</h3><p className="text-zinc-400 text-sm">Hover to glow</p></div></GlowCard>
          <GlowCard glowColor="orange" size="md"><div className="p-6 text-center"><div className="text-3xl mb-2">🧡</div><h3 className="text-white font-semibold mb-1">Orange</h3><p className="text-zinc-400 text-sm">Hover to glow</p></div></GlowCard>
        </div>
      );

    case "animate-card-animation":
      return <div className={lightGray}><AnimatedCardStack /></div>;

    case "card-stack":
      return (
        <div className={lightGray}>
          <CardStack items={[
            { id: 1, title: "Design Systems", description: "Build consistent UI with tokens and components.", tag: "Design" },
            { id: 2, title: "Motion & Animation", description: "Bring interfaces to life with purposeful motion.", tag: "Motion" },
            { id: 3, title: "Component Library", description: "Reusable, accessible components at scale.", tag: "Dev" },
            { id: 4, title: "Brand Identity", description: "Visual language that tells your story.", tag: "Brand" },
            { id: 5, title: "Prototyping", description: "Validate ideas quickly with high-fidelity prototypes.", tag: "UX" },
          ]} />
        </div>
      );

    case "tilt-card":
      return (
        <div className={lightGrayWrap}>
          <TiltCard>
            <div className="w-64 h-40 bg-gradient-to-br from-violet-600 to-pink-600 rounded-xl flex items-center justify-center">
              <p className="text-white font-bold text-lg">Tilt Me</p>
            </div>
          </TiltCard>
          <TiltCard>
            <div className="w-64 h-40 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <p className="text-white font-bold text-lg">3D Effect</p>
            </div>
          </TiltCard>
        </div>
      );

    case "scanner-card-stream":
      return <div className={lightGray}><ScannerCardStream /></div>;

    // ── Hero & Landing ─────────────────────────────────────────
    case "illuminated-hero":
      return <IlluminatedHero />;

    case "waitlist-hero":
      return <WaitlistHero />;

    case "connect-with-us":
      return <div className={lightGray}><SocialConnect /></div>;

    case "integration-hero":
      return <IntegrationHero />;

    case "music-reactive-hero-section":
      return <MusicHero />;

    case "zoom-parallax":
      return (
        <ZoomParallax images={[
          { src: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg", alt: "Mountain landscape" },
          { src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg", alt: "Forest path" },
          { src: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg", alt: "Ocean waves" },
          { src: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg", alt: "City lights" },
          { src: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg", alt: "Misty hills" },
          { src: "https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg", alt: "Desert dunes" },
          { src: "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg", alt: "Snowy peaks" },
        ]} />
      );

    case "animated-sign-in":
      return <AnimatedSignIn />;

    // ── Backgrounds & Atmosphere ──────────────────────────────
    case "mouse-responsive-background":
      return (
        <div className="relative min-h-[80vh] overflow-hidden">
          <ParallaxBackground />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/60 text-sm bg-black/20 px-4 py-2 rounded-full">Move your mouse</p>
          </div>
        </div>
      );

    case "sparkles":
      // White particles need dark — contained dark card on light page
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-zinc-950" style={{ height: "65vh" }}>
            <SparklesCore id="showcase-sparkles" background="transparent" minSize={0.6} maxSize={1.4} particleColor="#FFFFFF" particleDensity={80} speed={1} className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-5xl font-bold text-white mb-4">Sparkles</h2>
              <p className="text-zinc-400">Canvas particle animation</p>
            </div>
          </div>
        </div>
      );

    case "container-scroll-animation":
      return (
        <div className="bg-white overflow-hidden">
          <ContainerScroll
            titleComponent={
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  Scroll to see{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">the magic</span>
                </h2>
                <p className="text-gray-500 text-lg">Perspective scroll animation</p>
              </div>
            }
          >
            <div className="w-full h-full bg-gradient-to-br from-violet-900 to-pink-900 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white"><div className="text-6xl mb-4">✨</div><h3 className="text-2xl font-bold">Your content here</h3></div>
            </div>
          </ContainerScroll>
        </div>
      );

    case "animated-gradient-background":
      return (
        <div className="relative min-h-[80vh] overflow-hidden">
          <AnimatedGradientBg className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">Animated Background</h2>
          </div>
        </div>
      );

    case "background-boxes":
      // Dark-dependent — contained card
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-slate-900 flex flex-col items-center justify-center" style={{ height: "65vh" }}>
            <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <BoxesCore />
            <h1 className="md:text-4xl text-xl text-white relative z-20 font-bold">Move your mouse</h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">Hover to light up the boxes</p>
          </div>
        </div>
      );

    case "animated-video-on-scroll":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
          <p className="text-gray-500 text-center px-8">Scroll-triggered video expand. Scroll within this preview to activate the effect.</p>
        </div>
      );

    case "hero-highlight":
      return (
        <div className="min-h-[80vh] bg-white flex items-center justify-center">
          <HeroHighlight containerClassName="min-h-[60vh]">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center max-w-2xl mx-auto leading-snug">
              Build something{" "}
              <span className="text-violet-600">extraordinary</span>{" "}
              with beautiful animations
            </h1>
          </HeroHighlight>
        </div>
      );

    case "grid-pixelate-wipe":
      return (
        <div className={light}>
          <div className="w-[85%] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-xl">
            <RemotionPlayer
              component={GridPixelateWipe as never}
              durationInFrames={90}
              compositionWidth={1280}
              compositionHeight={720}
              fps={30}
              autoPlay
              loop
              controls
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      );

    // ── Sliders & Carousels ────────────────────────────────────
    case "interactive-image-accordion":
      return <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-8"><LandingAccordionItem /></div>;

    case "argent-loop-infinite-slider":
      return <div className={light}><InfiniteSlider /></div>;

    case "feature-carousel":
      return <div className={light}><FeatureCarousel /></div>;

    case "image-auto-slider":
      return <div className={light}><ImageAutoSlider /></div>;

    case "story-scroll":
      return <StoryScroll />;

    // ── Borders, Glows & Badges ───────────────────────────────
    case "shine-border":
      return (
        <div className={lightWrap}>
          <ShineBorder color={["#ec4899", "#8b5cf6", "#06b6d4"]} borderWidth={2}>
            <div className="w-64 h-40 rounded-xl flex items-center justify-center bg-white shadow-sm">
              <p className="text-gray-800 font-semibold">Pink · Purple · Cyan</p>
            </div>
          </ShineBorder>
          <ShineBorder color={["#f59e0b", "#ef4444"]} borderWidth={2}>
            <div className="w-64 h-40 rounded-xl flex items-center justify-center bg-white shadow-sm">
              <p className="text-gray-800 font-semibold">Amber · Red</p>
            </div>
          </ShineBorder>
        </div>
      );

    case "animated-gradient-border":
      return (
        <div className={lightWrap}>
          <BorderRotate>
            <div className="w-64 h-40 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <p className="text-gray-800 font-semibold">Rotating Gradient Border</p>
            </div>
          </BorderRotate>
        </div>
      );

    case "glowing-shadow":
      return <div className={lightGray}><GlowingShadow /></div>;

    case "award-badge":
      return (
        <div className={lightWrap}>
          <AwardBadge type="golden-kitty" place={1} />
          <AwardBadge type="product-of-the-day" place={1} />
          <AwardBadge type="product-of-the-week" place={2} />
          <AwardBadge type="product-of-the-month" place={3} />
        </div>
      );

    // ── Navigation & Interactive ──────────────────────────────
    case "gradient-menu":
      return <div className={light}><GradientMenu /></div>;

    case "animated-glowing-search-bar":
      return <div className={lightGray}><SearchComponent /></div>;

    case "stacked-panels":
      return <StackedPanels />;

    // ── Showcase & Display ─────────────────────────────────────
    case "team-showcase":
      return <TeamShowcase />;

    case "project-showcase":
      return <ProjectShowcase />;

    case "circular-testimonials":
      return (
        <div className={lightGray}>
          <CircularTestimonials
            testimonials={[
              {
                quote: "This component library saved us weeks of work. Everything just fits together beautifully.",
                name: "Sarah Chen",
                designation: "Product Designer, Lumina",
                src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              },
              {
                quote: "The animations are buttery smooth and the API is a joy to work with. Highly recommended.",
                name: "Marcus Rivera",
                designation: "Frontend Lead, Vertex",
                src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
              },
              {
                quote: "We shipped our landing page in a single afternoon. The quality is genuinely impressive.",
                name: "Amelia Novak",
                designation: "Founder, Driftwork",
                src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
              },
            ]}
          />
        </div>
      );

    case "map":
      return (
        <div className="min-h-[80vh] bg-gray-50 p-8">
          <MapComponent className="w-full h-[70vh] rounded-xl overflow-hidden shadow-md" />
        </div>
      );

    case "gallery":
      return (
        <div className="min-h-[80vh] bg-white flex items-center justify-center p-8">
          <PhotoGallery animationDelay={0.3} />
        </div>
      );

    // ══ Imported: Text & Typography ══════════════════════════
    case "morphing-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950">
          <MorphingText texts={["Design", "Develop", "Deploy", "Delight"]} className="text-6xl md:text-7xl font-bold text-white" />
        </div>
      );

    case "word-rotate":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
          <div className="text-5xl md:text-6xl font-bold text-gray-900 flex gap-3">
            <span>Build something</span>
            <WordRotate words={["beautiful", "animated", "seamless", "delightful"]} className="text-violet-600" />
          </div>
        </div>
      );

    case "animated-shiny-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
          <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2">
            <AnimatedShinyText className="text-lg">✨ Introducing the component library</AnimatedShinyText>
          </div>
        </div>
      );

    case "sparkles-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
          <SparklesText text="Sparkles" className="text-6xl md:text-7xl font-bold text-gray-900" />
        </div>
      );

    case "velocity-marquee":
      return (
        <div className="flex flex-col items-center justify-center gap-8 min-h-[80vh] bg-white overflow-hidden">
          <VelocityMarquee baseVelocity={-4} className="text-5xl font-extrabold text-violet-600">Matt Chapin · Live Jazz · Original Music · </VelocityMarquee>
          <VelocityMarquee baseVelocity={4} className="text-5xl font-extrabold text-pink-500">Component Showcase · 21st.dev · </VelocityMarquee>
        </div>
      );

    case "particle-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <ParticleText text="SHOWCASE" />
          </div>
        </div>
      );

    case "neon-rgb-text":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black flex items-center justify-center" style={{ height: "65vh" }}>
            <NeonRGBText text="Showcase" />
          </div>
        </div>
      );

    // ══ Imported: Buttons & Actions ══════════════════════════
    case "liquid-glass-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-8 min-h-[80vh] p-12" style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899,#06b6d4)" }}>
          <LiquidButton>Liquid Glass</LiquidButton>
          <LiquidButton>Get Started</LiquidButton>
        </div>
      );

    case "win-98-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-8 min-h-[80vh] bg-[#008080] p-12">
          <Win98Button>My Computer</Win98Button>
          <Win98Button>Start</Win98Button>
          <Win98Button>Shut Down...</Win98Button>
        </div>
      );

    case "rainbow-button":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950">
          <RainbowButton href="#">Rainbow Button</RainbowButton>
        </div>
      );

    case "confetti":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
          <ConfettiButton className="rounded-full bg-violet-600 px-8 py-3 text-white font-semibold shadow-lg hover:bg-violet-700 transition-colors">🎉 Celebrate</ConfettiButton>
        </div>
      );

    // ══ Imported: Cards & Panels ═════════════════════════════
    case "border-sheen-card":
      return (
        <div className="flex flex-wrap items-center justify-center gap-8 min-h-[80vh] bg-gray-50 p-12">
          <BorderSheenCard variant="mixed">
            <div className="w-72 p-8 text-center"><h3 className="text-xl font-bold text-gray-900 mb-2">Sheen Border</h3><p className="text-gray-500 text-sm">A rotating conic-gradient sheen wraps the card edge.</p></div>
          </BorderSheenCard>
          <BorderSheenCard variant="pink">
            <div className="w-72 p-8 text-center"><h3 className="text-xl font-bold text-gray-900 mb-2">Pink Variant</h3><p className="text-gray-500 text-sm">Soft pink sheen sweep.</p></div>
          </BorderSheenCard>
        </div>
      );

    case "holographic-pricing-card":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950 p-12">
          <HoloPricingCard
            name="Pro"
            price="$29/mo"
            desc="Everything you need to launch fast."
            features={["Unlimited projects", "Priority support", "Custom domains", "Analytics dashboard"]}
            cta="Get started"
            highlight
          />
        </div>
      );

    case "glow-cards":
      return <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950 p-8 overflow-hidden"><GlowCards /></div>;

    case "gradient-shader-card":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950 p-12">
          <GradientShaderCard className="w-80 h-96">
            <div className="flex h-full flex-col items-center justify-center text-center p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Grainy Gradient</h3>
              <p className="text-white/70 text-sm">Live Three.js shader backdrop</p>
            </div>
          </GradientShaderCard>
        </div>
      );

    case "image-spotlight":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-12">
          <ImageSpotlight src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" alt="Portrait" orientation="portrait" />
        </div>
      );

    // ══ Imported: Backgrounds & Atmosphere ═══════════════════
    case "background-gradient-animation":
      return (
        <div className="relative min-h-[80vh] overflow-hidden">
          <BackgroundGradientAnimation />
        </div>
      );

    case "blobs":
      return (
        <div className="relative min-h-[80vh] overflow-hidden bg-white flex items-center justify-center">
          <AnimatedBlobs />
          <h2 className="relative z-10 text-4xl font-bold text-gray-900">Animated Blobs</h2>
        </div>
      );

    case "particles":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-zinc-950 flex items-center justify-center" style={{ height: "65vh" }}>
            <Particles className="absolute inset-0" quantity={120} color="#ffffff" />
            <h2 className="relative z-10 text-4xl font-bold text-white">Particles</h2>
          </div>
        </div>
      );

    case "mouse-sparkles":
      return (
        <MouseSparkles>
          <div className="flex items-center justify-center min-h-[80vh] bg-zinc-950">
            <p className="text-white/70 text-lg">Move your mouse to leave a trail of sparkles</p>
          </div>
        </MouseSparkles>
      );

    case "interactive-dots":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-zinc-950" style={{ height: "65vh" }}>
            <InteractiveDots className="w-full h-full" />
          </div>
        </div>
      );

    case "glitch-background":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <GlitchBackground />
          </div>
        </div>
      );

    case "organic-gradient-background":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <OrganicGradientBackground />
          </div>
        </div>
      );

    case "shader-background":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <ShaderBackground />
          </div>
        </div>
      );

    case "wave-scene":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-10">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl">
            <WaveScene />
          </div>
        </div>
      );

    case "aurora-shader":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <AuroraShader className="w-full h-full" />
          </div>
        </div>
      );

    case "dithering-shader":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <DitheringShader className="w-full h-full" />
          </div>
        </div>
      );

    case "warp-shader":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <WarpShader className="w-full h-full" />
          </div>
        </div>
      );

    case "web-gl-shader":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <WebGLShader className="w-full h-full" />
          </div>
        </div>
      );

    case "revolution-shader":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ height: "65vh" }}>
            <RevolutionShader className="w-full h-full" />
          </div>
        </div>
      );

    // ══ Imported: Sliders & Carousels ════════════════════════
    case "circular-gallery":
      return (
        <div className="relative flex items-center justify-center min-h-[80vh] bg-zinc-950 overflow-hidden">
          <CircularGallery
            radius={240}
            items={[
              { common: "Snowy Peaks", binomial: "Montis nivalis", photo: { url: "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&w=600", text: "Snowy peaks", by: "Pexels" } },
              { common: "Ocean Waves", binomial: "Mare undae", photo: { url: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&w=600", text: "Ocean", by: "Pexels" } },
              { common: "Forest Path", binomial: "Silva iter", photo: { url: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&w=600", text: "Forest", by: "Pexels" } },
              { common: "Desert Dunes", binomial: "Deserta arena", photo: { url: "https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg?auto=compress&w=600", text: "Desert", by: "Pexels" } },
              { common: "City Lights", binomial: "Urbs lumina", photo: { url: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&w=600", text: "City", by: "Pexels" } },
              { common: "Misty Hills", binomial: "Colles nebula", photo: { url: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&w=600", text: "Hills", by: "Pexels" } },
            ]}
          />
        </div>
      );

    case "scroll-morph-hero":
      return <ScrollMorphHero />;

    // ══ Imported: Showcase & Display ═════════════════════════
    case "circular-reveal-heading":
      return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
          <CircularRevealHeading
            centerText={<span className="text-lg font-bold text-gray-900">Explore</span>}
            items={[
              { text: "DESIGN", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80" },
              { text: "DEVELOP", image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&q=80" },
              { text: "DEPLOY", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" },
              { text: "DELIGHT", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" },
            ]}
          />
        </div>
      );

    case "gravity":
      return (
        <div className="relative w-full min-h-[80vh] bg-zinc-950 overflow-hidden">
          <div className="absolute top-10 left-0 right-0 text-center text-white/60 text-sm z-10 pointer-events-none">Drag the chips around</div>
          <Gravity gravity={{ x: 0, y: 1 }} className="absolute inset-0">
            <MatterBody x="30%" y="10%" angle={10}><div className="rounded-full bg-violet-500 px-6 py-3 text-white font-semibold">design</div></MatterBody>
            <MatterBody x="45%" y="5%"><div className="rounded-full bg-pink-500 px-6 py-3 text-white font-semibold">motion</div></MatterBody>
            <MatterBody x="60%" y="12%" angle={-8}><div className="rounded-full bg-sky-500 px-6 py-3 text-white font-semibold">shaders</div></MatterBody>
            <MatterBody x="40%" y="18%"><div className="rounded-full bg-amber-500 px-6 py-3 text-white font-semibold">gsap</div></MatterBody>
            <MatterBody x="55%" y="22%" angle={5}><div className="rounded-full bg-emerald-500 px-6 py-3 text-white font-semibold">three.js</div></MatterBody>
          </Gravity>
        </div>
      );

    case "ensemble-accordion":
      return <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-8"><EnsembleAccordion /></div>;

    case "audio-player":
      return (
        <div className="flex items-center justify-center min-h-[80vh] p-12" style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95,#831843)" }}>
          <AudioPlayerDemo />
        </div>
      );

    default:
      return (
        <div className={light}>
          <p className="text-gray-400">Preview coming soon</p>
        </div>
      );
  }
}
