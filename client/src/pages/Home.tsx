import { useCategories, useProducts, usePrices, useJourney, useLocations } from "@/hooks/use-groceries";
import { Navigation } from "@/components/Navigation";
import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus, MapPin, Phone, Clock, ArrowUpRight, Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import registrationImg from "@assets/WhatsApp_Image_2025-12-25_at_1.22.48_PM_1770699054265.jpeg";
import intimationImg from "@assets/WhatsApp_Image_2025-12-25_at_1.23.13_PM_1770699054264.jpeg";

gsap.registerPlugin(ScrollTrigger);

const storeHours = [
  { day: "Monday", hours: "8:30 AM - 8:30 PM" },
  { day: "Tuesday", hours: "8:30 AM - 8:30 PM" },
  { day: "Wednesday", hours: "8:30 AM - 8:30 PM" },
  { day: "Thursday", hours: "8:30 AM - 8:30 PM" },
  { day: "Friday", hours: "8:30 AM - 8:30 PM" },
  { day: "Saturday", hours: "8:30 AM - 8:30 PM" },
  { day: "Sunday", hours: "8:30 AM - 1:00 PM" },
];

function getCurrentDayIndex() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

export default function Home() {
  const { data: categories } = useCategories();
  const { data: products } = useProducts();
  const { data: prices } = usePrices();
  const { data: journey } = useJourney();
  const { data: locations } = useLocations();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroTagRef = useRef<HTMLSpanElement>(null);
  const pricesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTagRef.current) {
        gsap.fromTo(heroTagRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
        );
      }
      if (heroTitleRef.current) {
        const lines = heroTitleRef.current.querySelectorAll(".hero-line");
        if (lines.length > 0) {
          gsap.fromTo(lines,
            { opacity: 0, y: 80, rotateX: 20 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, delay: 0.7, ease: "power4.out" }
          );
        }
      }
      if (heroSubRef.current) {
        gsap.fromTo(heroSubRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.3, ease: "power3.out" }
        );
      }
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
          y: -100, opacity: 0.3,
        });
      }
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".stat-item");
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none none" } }
          );
        }
      }
      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 90%", toggleActions: "play none none none" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!prices?.length && !products?.length && !journey?.length && !locations?.length) return;

    const ctx = gsap.context(() => {
      const animateSection = (ref: React.RefObject<HTMLDivElement | null>, childSelector: string, fromVars: gsap.TweenVars, toVars: gsap.TweenVars) => {
        if (!ref.current) return;
        const heading = ref.current.querySelector(".section-heading");
        if (heading) {
          gsap.fromTo(heading, { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" } });
        }
        const els = ref.current.querySelectorAll(childSelector);
        if (els.length > 0) {
          gsap.fromTo(els, fromVars,
            { ...toVars,
              scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" } });
        }
      };

      if (prices?.length) {
        animateSection(pricesRef, ".price-card",
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      }

      if (products?.length) {
        animateSection(productsRef, ".product-item",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
      }

      if (journey?.length && journeyRef.current) {
        const heading = journeyRef.current.querySelector(".section-heading");
        if (heading) {
          gsap.fromTo(heading, { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: journeyRef.current, start: "top 85%", toggleActions: "play none none none" } });
        }
        const line = journeyRef.current.querySelector(".timeline-line");
        if (line) {
          gsap.fromTo(line, { scaleY: 0 },
            { scaleY: 1, duration: 2, ease: "power2.inOut",
              scrollTrigger: { trigger: journeyRef.current, start: "top 70%", end: "bottom 40%", scrub: 1 } });
        }
        const cards = journeyRef.current.querySelectorAll(".journey-card");
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } });
        });
        const dots = journeyRef.current.querySelectorAll(".timeline-dot");
        dots.forEach((dot) => {
          gsap.fromTo(dot, { scale: 0 },
            { scale: 1, duration: 0.5, ease: "back.out(2)",
              scrollTrigger: { trigger: dot, start: "top 85%", toggleActions: "play none none none" } });
        });
      }

      if (locations?.length) {
        animateSection(locationsRef, ".location-card",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
      }
    });

    return () => ctx.revert();
  }, [prices, products, journey, locations]);

  const featuredProducts = products?.slice(0, 6) || [];
  const todayIdx = getCurrentDayIndex();

  return (
    <div className="min-h-screen bg-background font-body text-foreground grain-overlay">
      <Navigation />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-24 pb-20">
          <div className="max-w-5xl">
            <span
              ref={heroTagRef}
              className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-8 opacity-0"
              data-testid="text-hero-tag"
            >
              Himatnagar, Gujarat &mdash; Est. 2017
            </span>

            <h1
              ref={heroTitleRef}
              className="text-[clamp(3rem,8vw,8rem)] font-display leading-[0.9] tracking-tight mb-10"
              data-testid="text-hero-title"
              style={{ perspective: "1000px" }}
            >
              <span className="hero-line block">Jay Kirana</span>
              <span className="hero-line block"><em className="text-primary">Store</em></span>
              <span className="hero-line block text-muted-foreground/60 text-[clamp(1.5rem,4vw,4rem)]">Your trusted grocery destination.</span>
            </h1>

            <p
              ref={heroSubRef}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed opacity-0"
              data-testid="text-hero-subtitle"
            >
              Serving the families of Himatnagar with authentic groceries, fresh spices, 
              oils, dal, and daily essentials. Proprietor: Yogeshkumar Navinchandra Patel.
            </p>

            <div className="mt-8 flex items-center gap-4 opacity-0" ref={heroSubRef as any}>
              <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-md" data-testid="badge-google-rating">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-display text-lg font-semibold">5.0</span>
                <span className="text-xs text-muted-foreground ml-1">Google Rating</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground" data-testid="text-hero-location">
                <MapPin className="w-4 h-4" />
                Station Road, Himatnagar
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </div>
      </section>

      {/* ===== LIVE PRICE TICKER ===== */}
      <section className="py-4 border-y border-border/60 bg-card/50 overflow-hidden">
        <div className="ticker-track gap-8">
          {[...(prices || []), ...(prices || []), ...(prices || []), ...(prices || [])].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 px-6 shrink-0" data-testid={`ticker-item-${idx}`}>
              <span className="font-medium text-sm whitespace-nowrap">{item.itemName}</span>
              <span className="font-display text-lg font-semibold whitespace-nowrap">₹{item.price}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">/{item.unit}</span>
              <span className={cn(
                "flex items-center gap-0.5",
                item.trend === "up" ? "text-red-500" : item.trend === "down" ? "text-green-600" : "text-muted-foreground"
              )}>
                {item.trend === "up" && <TrendingUp className="w-3 h-3" />}
                {item.trend === "down" && <TrendingDown className="w-3 h-3" />}
                {item.trend === "stable" && <Minus className="w-3 h-3" />}
              </span>
              <span className="text-border/80 select-none">&bull;</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MARKET PRICES DETAIL ===== */}
      <section id="prices" ref={pricesRef} className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="section-heading mb-16 md:mb-20">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 block">Live Rates</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.05]" data-testid="text-prices-title">
              Today&apos;s Market<br />
              <span className="text-muted-foreground/50">Prices</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prices?.map((item) => (
              <div
                key={item.id}
                className="price-card group relative bg-card border border-border/60 rounded-md p-6 md:p-8 transition-all duration-500 hover:border-primary/30"
                data-testid={`card-price-${item.id}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-body font-semibold text-base mb-1">{item.itemName}</h3>
                    <p className="text-xs text-muted-foreground tracking-wide">{item.unit}</p>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center",
                    item.trend === "up" ? "bg-red-50 text-red-500" :
                    item.trend === "down" ? "bg-green-50 text-green-600" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {item.trend === "up" && <TrendingUp className="w-4 h-4" />}
                    {item.trend === "down" && <TrendingDown className="w-4 h-4" />}
                    {item.trend === "stable" && <Minus className="w-4 h-4" />}
                  </div>
                </div>
                <div className="font-display text-4xl md:text-5xl" data-testid={`text-price-value-${item.id}`}>
                  ₹{item.price}
                </div>
                <div className={cn(
                  "mt-3 text-xs font-medium uppercase tracking-wider",
                  item.trend === "up" ? "text-red-500" :
                  item.trend === "down" ? "text-green-600" :
                  "text-muted-foreground"
                )}>
                  {item.trend === "up" ? "Price Rising" : item.trend === "down" ? "Price Falling" : "Stable"}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Prices updated daily. Rates are indicative and subject to change.
          </p>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section ref={statsRef} className="py-20 border-y border-border/60 bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "8+", label: "Years of Service" },
              { num: "2000+", label: "Products Available" },
              { num: "5.0", label: "Google Rating" },
              { num: "10K+", label: "Happy Families" },
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center md:text-left">
                <div className="font-display text-4xl md:text-5xl lg:text-6xl mb-2 counter-num" data-testid={`text-stat-${i}`}>
                  {stat.num}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide" data-testid={`text-stat-label-${i}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SHOWCASE ===== */}
      <section id="products" ref={productsRef} className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="section-heading mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 block">Our Collection</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.05]" data-testid="text-products-title">
                Premium<br />
                <span className="text-muted-foreground/50">Selection</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:pb-2">
              Hand-picked essentials from trusted farms and suppliers across India. Quality guaranteed with every purchase at Jay Kirana Store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="product-item group relative bg-card border border-border/60 rounded-md overflow-hidden transition-all duration-500 hover:border-primary/30"
                data-testid={`card-product-${product.id}`}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-2/5 aspect-square sm:aspect-auto bg-secondary/30 relative overflow-hidden p-8 flex items-center justify-center">
                    <img
                      src={product.imageUrl.startsWith("/") ? product.imageUrl : `/images/products/${product.imageUrl}`}
                      alt={product.name}
                      className="w-full h-full object-contain smooth-img"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=60";
                      }}
                    />
                  </div>
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-display text-2xl md:text-3xl leading-tight" data-testid={`text-product-name-${product.id}`}>
                          {product.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-end justify-between gap-4 flex-wrap">
                      <div className="font-display text-3xl" data-testid={`text-product-price-${product.id}`}>
                        ₹{product.price}
                      </div>
                      {product.isPopular && (
                        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary bg-primary/8 px-3 py-1.5 rounded-md">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {categories && categories.length > 0 && (
            <div className="mt-16 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="px-5 py-2.5 border border-border/60 rounded-md text-sm text-muted-foreground font-medium"
                  data-testid={`text-category-${cat.id}`}
                >
                  {cat.name}
                </div>
              ))}
              <div className="px-5 py-2.5 text-sm text-muted-foreground/50">
                & more categories
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section id="journey" ref={journeyRef} className="py-28 md:py-36 bg-card/30 border-y border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="section-heading mb-20 md:mb-28 text-center">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.05]" data-testid="text-journey-title">
              Building Trust<br />
              <span className="text-muted-foreground/50">Since 2017</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/80 -translate-x-1/2 origin-top" style={{ transformOrigin: "top" }} />

            <div className="space-y-16 md:space-y-24">
              {journey?.map((milestone, idx) => (
                <div key={milestone.id} className="relative">
                  <div className="timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background z-10" />

                  <div className={cn(
                    "journey-card ml-16 md:ml-0",
                    idx % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
                  )}>
                    <div className={cn(
                      "bg-card border border-border/60 rounded-md p-6 md:p-8",
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    )}>
                      <span className="font-display text-3xl md:text-4xl text-primary block mb-3" data-testid={`text-milestone-year-${milestone.id}`}>
                        {milestone.year}
                      </span>
                      <h3 className="font-body font-semibold text-lg mb-3" data-testid={`text-milestone-title-${milestone.id}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
            <div className="section-heading mb-12 text-center">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 block">Verified Business</span>
              <h3 className="text-2xl md:text-3xl font-display" data-testid="text-certifications-title">
                Official Registrations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border/60 rounded-md p-6 text-center" data-testid="card-gst-cert">
                <img src={registrationImg} alt="GST Registration Certificate" className="w-full rounded-md mb-4 opacity-90" />
                <h4 className="font-body font-semibold text-sm">GST Registration Certificate</h4>
                <p className="text-xs text-muted-foreground mt-1">Government of India - Issued July 2018</p>
              </div>
              <div className="bg-card border border-border/60 rounded-md p-6 text-center" data-testid="card-nagarpalika-cert">
                <img src={intimationImg} alt="Himatnagar Nagarpalika Intimation Receipt" className="w-full rounded-md mb-4 opacity-90" />
                <h4 className="font-body font-semibold text-sm">Nagarpalika Intimation Receipt</h4>
                <p className="text-xs text-muted-foreground mt-1">Himatnagar Nagarpalika - September 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISIT US / STORE INFO ===== */}
      <section id="visit" ref={locationsRef} className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="section-heading mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4 block">Visit Us</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.05]" data-testid="text-locations-title">
                Our{" "}<br className="md:hidden" />
                <span className="text-muted-foreground/50">Store</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:pb-2">
              Located in the heart of Himatnagar near Sarvoday Market. Drop by for the freshest produce and a warm, personalized shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Store Details Card */}
            <div className="location-card bg-card border border-border/60 rounded-md p-8 md:p-10" data-testid="card-location-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-2xl" data-testid="text-location-name-1">Jay Kirana Store</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-xs font-medium">5.0 on Google</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-store-address">
                    01, Station Rd, opp. Char Bhujah Nasta House, Ganotri Society, Himatnagar, Gujarat 383001
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-store-landmark">
                    Located in: Shri Charbhuja Nasta House Building, Near Sarvoday Market
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-foreground" data-testid="text-proprietor">Proprietor:</span>
                <span className="text-muted-foreground">Yogeshkumar Navinchandra Patel</span>
              </div>
            </div>

            {/* Store Hours Card */}
            <div className="location-card bg-card border border-border/60 rounded-md p-8 md:p-10" data-testid="card-store-hours">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-md bg-primary/8 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl" data-testid="text-hours-title">Store Hours</h3>
              </div>

              <div className="space-y-0">
                {storeHours.map((item, idx) => (
                  <div
                    key={item.day}
                    className={cn(
                      "flex items-center justify-between py-3 border-b border-border/40 last:border-0",
                      idx === todayIdx && "text-primary font-medium"
                    )}
                    data-testid={`text-hours-${item.day.toLowerCase()}`}
                  >
                    <span className="text-sm">{item.day}</span>
                    <span className="text-sm">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Today&apos;s day is highlighted</span>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-8 location-card bg-card border border-border/60 rounded-md overflow-hidden" data-testid="card-google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5!2d72.963!3d23.597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM1JzQ5LjIiTiA3MsKwNTcnNDcuMiJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jay Kirana Store Location"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer ref={footerRef} className="border-t border-border/60 bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
            <div className="md:col-span-5">
              <span className="font-display text-3xl block mb-4">
                Jay Kirana<span className="text-primary">.</span>
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Your trusted grocery destination in Himatnagar since 2017. Premium quality groceries, spices, oils, and daily essentials from trusted sources.
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-medium">5.0 rated on Google</span>
              </div>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-body font-semibold text-sm tracking-wide uppercase mb-4">Navigate</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#prices" className="hover:text-foreground transition-colors" data-testid="link-footer-prices">Market Prices</a></li>
                <li><a href="#products" className="hover:text-foreground transition-colors" data-testid="link-footer-products">Products</a></li>
                <li><a href="#journey" className="hover:text-foreground transition-colors" data-testid="link-footer-journey">Our Journey</a></li>
                <li><a href="#visit" className="hover:text-foreground transition-colors" data-testid="link-footer-visit">Visit Us</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-body font-semibold text-sm tracking-wide uppercase mb-4">Store Details</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li data-testid="text-footer-address">Station Rd, opp. Char Bhujah Nasta House, Himatnagar 383001</li>
                <li data-testid="text-footer-hours">Open Mon-Sat: 8:30 AM - 8:30 PM</li>
                <li data-testid="text-footer-sunday">Sunday: 8:30 AM - 1:00 PM</li>
                <li data-testid="text-footer-proprietor">Prop: Yogeshkumar N. Patel</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} Jay Kirana Store. All rights reserved.
            </span>
            <span className="text-xs text-muted-foreground/40">
              Himatnagar, Gujarat &mdash; An informational showcase
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
