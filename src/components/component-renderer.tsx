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
const AnimatedSignIn = dynamic(() => import("@/components/animated-sign-in").then((m) => m.LoginPage), { ssr: false });

// ── Backgrounds & Atmosphere ──────────────────────────────
const ParallaxBackground = dynamic(() => import("@/components/mouse-responsive-background"), { ssr: false });
const SparklesCore = dynamic(() => import("@/components/ui/sparkles").then((m) => m.SparklesCore), { ssr: false });
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then((m) => m.ContainerScroll), { ssr: false });
const AnimatedGradientBg = dynamic(() => import("@/components/ui/animated-gradient-background").then((m) => m.AnimatedGradientBackground), { ssr: false });
const BoxesCore = dynamic(() => import("@/components/ui/background-boxes").then((m) => m.BoxesCore), { ssr: false });
const HeroHighlight = dynamic(() => import("@/components/ui/hero-highlight").then((m) => m.HeroHighlight), { ssr: false });
const GridPixelateWipe = dynamic(() => import("@/components/ui/grid-pixelate-wipe").then((m) => m.GridPixelateWipe), { ssr: false });

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
const GradientMenu = dynamic(() => import("@/components/gradient-menu").then((m) => m.GradientMenu), { ssr: false });
const SearchComponent = dynamic(() => import("@/components/animated-glowing-search-bar"), { ssr: false });
const StackedPanels = dynamic(() => import("@/components/stacked-panels-cursor-intereactive-component"), { ssr: false });

// ── Showcase & Display ─────────────────────────────────────
const TeamShowcase = dynamic(() => import("@/components/team-showcase").then((m) => m.TeamShowcase), { ssr: false });
const ProjectShowcase = dynamic(() => import("@/components/project-showcase").then((m) => m.ProjectShowcase), { ssr: false });
const CircularTestimonials = dynamic(() => import("@/components/circular-testimonials").then((m) => m.CircularTestimonials), { ssr: false });
const MapComponent = dynamic(() => import("@/components/map").then((m) => m.Map), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/ui/gallery").then((m) => m.PhotoGallery), { ssr: false });

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
      return <div className={light}><GridPixelateWipe /></div>;

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
      return <div className={lightGray}><CircularTestimonials /></div>;

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

    default:
      return (
        <div className={light}>
          <p className="text-gray-400">Preview coming soon</p>
        </div>
      );
  }
}
