import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Compass,
  FolderHeart,
  TrendingUp,
  Sparkles,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  Send,
  Loader2,
  Lock,
  Zap,
  Briefcase,
  X,
  Mail,
  User,
  Building,
  PhoneCall,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Menu,
  CheckCircle
} from "lucide-react";

import {
  SERVICES,
  COMPARISONS,
  DESIGN_PRODUCTS,
  PORTFOLIOS,
  PROCESS_STEPS,
  Service,
  DesignProduct,
  PortfolioItem
} from "./data";

// Asset import
import heroArchitectureImg from "./assets/images/hero_architecture_1780627369581.png";
import productHeroBlueImg from "./assets/images/product_hero_blue_1780628083675.png";
import cosmeticPackagingImg from "./assets/images/cosmetic_packaging_1780628252109.png";
import bluePerfumeImg from "./assets/images/blue_perfume_bottle_1780628271301.png";
import bookDesignEditorialImg from "./assets/images/book_design_editorial_1780628450072.png";

// Icon components mapping
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Compass,
  FolderHeart,
  TrendingUp,
  Sparkles,
  CalendarDays,
};

function SafeImage({ 
  src, 
  alt, 
  className = "", 
  fallbackIcon: FallbackIcon = Layers,
  ...props 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  fallbackIcon?: React.ComponentType<{ className?: string }>;
  [key: string]: any;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div className={`bg-gradient-to-br from-violet-100 to-indigo-50 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
        <FallbackIcon className="w-10 h-10 text-indigo-400 mb-2 stroke-[1.5]" />
        <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider line-clamp-1 px-3">
          {alt || "빅스케일 디자인"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let animationFrameId: number;

    const startCounter = () => {
      const duration = 1500; // 1.5 seconds animation
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(easeProgress * value);
        setCount(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    if (elementRef.current && typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCounter();
          if (observer) {
            observer.unobserve(elementRef.current!);
          }
        }
      }, { threshold: 0.1 });

      observer.observe(elementRef.current);
    } else {
      // Fallback
      startCounter();
    }

    return () => {
      if (observer && elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("hero");

  // Mobile menu states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Portfolio states
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  // Design Product Slider active index / scrolling states
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phoneNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // Interactive ROI Calculator State
  const [requiredDesignCount, setRequiredDesignCount] = useState(4); // requests per month
  const [activePlanType, setActivePlanType] = useState<"standard" | "pro">("standard");

  // Dynamic Content & Administrative states
  const [heroTitle, setHeroTitle] = useState(() => {
    const val = localStorage.getItem("bigscale_hero_title");
    if (
      !val ||
      val === "브랜드를 더 크게 만드는\n디자인 구독 서비스" ||
      val === "디자인을 넘어 성장까지\n디자인 구독서비스" ||
      val === "브랜드 성장과 확장을 위한\nAI 디자인 구독 서비스" ||
      val === "브랜드를 지금보다 한 단계 더 성장시키고 확장시킵니다.\nAI 디자인과 디자인 구독서비스로 브랜드의 다음 성장을 함께 만듭니다" ||
      val.includes("BIG SCALE")
    ) {
      return "브랜드 성장과 확장을 위한\nAI 디자인 구독 서비스";
    }
    return val;
  });
  const [heroDescription, setHeroDescription] = useState(() => {
    const val = localStorage.getItem("bigscale_hero_desc");
    if (
      !val ||
      val.includes("시각디자인부터 브랜딩") ||
      val.includes("브랜딩부터 마케팅") ||
      val.includes("AI 디자인과 디자인 구독서비스")
    ) {
      return "브랜딩부터 마케팅, AI 디자인, 디자인 구독서비스까지 브랜드 성장에 필요한 모든 크리에이티브를 제공합니다.";
    }
    return val;
  });

  const [heroProducts, setHeroProducts] = useState(() => {
    const stored = localStorage.getItem("bigscale_hero_slider");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return [
      {
        id: "product-cosmetic-blue",
        title: "La Roche-Posay Hyalu B5 3D Render",
        category: "제품 디자인 (PRODUCT DESIGN)",
        image: productHeroBlueImg,
        technique: "Reflective Glass & Fluid Turntable Render",
        desc: "수분 보습 크림과 활성 히알루론산 세럼 용기 및 리퀴드 버블 시뮬레이션",
        duration: "0:05",
        accentColor: "from-blue-600/30 to-purple-500/20",
      },
      {
        id: "product-packaging-ivory",
        title: "Eco-Friendly Premium Package Suite",
        category: "패키지 디자인 (PACKAGE DESIGN)",
        image: cosmeticPackagingImg,
        technique: "Paper Texture & Hard-Edge Box Vectoring",
        desc: "친환경 펄프 재질의 튜브 용기 및 현대 미술 감각의 구조적 브랜드 박스 레이아웃",
        duration: "0:04",
        accentColor: "from-amber-600/20 to-stone-800/20",
      },
      {
        id: "product-book-editorial",
        title: "Modern Minimalist Monograph Brand Layout",
        category: "북 디자인 (BOOK & EDITORIAL DESIGN)",
        image: bookDesignEditorialImg,
        technique: "Book Hardcover Grid Layout & Hot Stamping Print",
        desc: "우아한 그리드 타이포그래피와 하이엔드 단행본 레이아웃, 섬세한 텍스처 가공 프레젠테이션",
        duration: "0:06",
        accentColor: "from-neutral-800/35 to-amber-900/10",
      }
    ];
  });

  const [servicesList, setServicesList] = useState(() => {
    const stored = localStorage.getItem("bigscale_services");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return SERVICES;
  });

  const [portfoliosList, setPortfoliosList] = useState(() => {
    const stored = localStorage.getItem("bigscale_portfolios");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return PORTFOLIOS;
  });

  const [inquiriesList, setInquiriesList] = useState<any[]>(() => {
    const stored = localStorage.getItem("bigscale_inquiries");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Admin Modal Auth / View states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [adminTab, setAdminTab] = useState<"hero" | "heroSlider" | "services" | "portfolio" | "inquiries">("hero");

  const [currentHeroProductIdx, setCurrentHeroProductIdx] = useState(0);
  const [heroSliderProgress, setHeroSliderProgress] = useState(0);

  // Auto-slide effect & progress simulation
  useEffect(() => {
    const slideDuration = 4500; // 4.5 seconds per slide
    const updateInterval = 50; // update progress bar every 50ms
    const totalSteps = slideDuration / updateInterval;
    let currentStep = 0;

    // init progress at 0
    setHeroSliderProgress(0);

    const interval = setInterval(() => {
      currentStep++;
      const progressPercent = (currentStep / totalSteps) * 100;
      setHeroSliderProgress(progressPercent);

      if (currentStep >= totalSteps) {
        setCurrentHeroProductIdx((prev) => (prev + 1) % heroProducts.length);
        currentStep = 0;
        setHeroSliderProgress(0);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [currentHeroProductIdx, heroProducts.length]);

  // Automatic slide animation for Design products carousel
  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => {
        const next = prevIndex + 1;
        return next >= DESIGN_PRODUCTS.length - 3 ? 0 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isSliderHovered]);

  // Handle slide index transition
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = 320; // card width + margin roughly
      sliderRef.current.scrollTo({
        left: sliderIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [sliderIndex]);

  // Form Validation and Submission
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) errors.companyName = "회사명을 입력해 주세요.";
    if (!formData.contactName.trim()) errors.contactName = "담당자명을 입력해 주세요.";
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "연락처를 입력해 주세요.";
    } else if (!/^[0-9-+\s]{9,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = "올바른 연락처 형식이 아닙니다.";
    }
    if (!formData.message.trim()) errors.message = "문의 사항이나 요청 배경을 기술해 주세요.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate high-fidelity API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmittedData({ ...formData });

      // Save submission to localStorage so admin can see it
      const newInquiry = {
        id: Date.now().toString(),
        date: new Date().toLocaleString("ko-KR"),
        companyName: formData.companyName,
        contactName: formData.contactName,
        phoneNumber: formData.phoneNumber,
        message: formData.message
      };
      
      const updatedInquiries = [newInquiry, ...inquiriesList];
      setInquiriesList(updatedInquiries);
      localStorage.setItem("bigscale_inquiries", JSON.stringify(updatedInquiries));

      // Reset form
      setFormData({
        companyName: "",
        contactName: "",
        phoneNumber: "",
        message: "",
      });
    }, 1800);
  };

  // Portfolio items filter matching
  const filteredPortfolios = portfolioFilter === "All"
    ? portfoliosList
    : portfoliosList.filter(item => item.tag === portfolioFilter);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // ROI Calculator Calculations
  // Average recruit cost for designer = KRW 4,500,000 + benefits = 5,000,050
  // Average agency project cost per item = KRW 700,000
  const estimatedAgencyCost = requiredDesignCount * 700000;
  const estimatedBigScaleCost = activePlanType === "standard" ? 2800005 : 4900005;
  const netSavings = Math.max(0, estimatedAgencyCost - estimatedBigScaleCost);
  const estimateSpeedDays = activePlanType === "standard" ? "1-3일" : "24시간 이내";

  return (
    <div className="bg-white text-gray-900 font-sans tracking-tight min-h-screen selection:bg-violet-100 selection:text-violet-900 antialiased">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <span className="font-sans font-black text-2xl tracking-tighter text-gray-950 flex items-center">
              BIG SCALE
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full border border-violet-100 p-0.5">
              Subscription
            </span>
          </div>

          </div>
        </div>
      </header>
 
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-950 overflow-hidden py-20 lg:py-28">
        {/* Modern Architecture Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={heroArchitectureImg}
            alt="Modern premium skyscraper architecture"
            className="w-full h-full object-cover opacity-25 object-center scale-102 transition-transform duration-[12000ms] ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-transparent to-gray-950/90" />
        </div>
 
        {/* Floating Abstract Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-15 z-0" />
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline and CTA */}
            <div className="lg:col-span-7 text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Premium Pill Badge */}
                <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-violet-400 text-xs font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>3D PRODUCT & BRAND COMPILATION</span>
                </div>
 
                <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.12] mb-6 whitespace-pre-line">
                  {heroTitle}
                </h1>
 
                <p className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-10 whitespace-pre-line">
                  {heroDescription}
                </p>
 
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                  <button
                    onClick={() => scrollTo("service")}
                    className="w-full sm:w-auto btn-3d-secondary text-white font-bold px-8 py-4.5 rounded-xl transition-all duration-200 text-sm shadow-md text-center cursor-pointer"
                  >
                    서비스 보기
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full sm:w-auto btn-3d-glass text-white font-black px-8 py-4.5 rounded-xl transition-all duration-200 text-sm shadow-lg flex items-center justify-center space-x-2.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>무료 상담 신청하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
 
            {/* Right Column: Premium Intelligent Automatic Design Showcase Slider (Replaces simulated video player) */}
            <div className="lg:col-span-5 relative w-full flex flex-col items-center">
              {/* Product Select Tabs (Above the screen) */}
              <div className="flex bg-gray-900/60 border border-white/5 p-1 rounded-full mb-4 w-full max-w-[420px] backdrop-blur-lg z-20">
                {heroProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentHeroProductIdx(idx);
                    }}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-black rounded-full transition-all duration-300 cursor-pointer ${
                      currentHeroProductIdx === idx
                        ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg border border-white/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {p.category.split(" (")[0]}
                  </button>
                ))}
              </div>
 
              <div
                className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-white/10 transition-colors duration-500"
              >
                {/* Active Slider Image filling the card fully */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHeroProductIdx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <SafeImage
                        src={heroProducts[currentHeroProductIdx].image}
                        alt={heroProducts[currentHeroProductIdx].title}
                        className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                      />
                      {/* Dark overlay to guarantee typography legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                </div>
 
                {/* Elegant active automatic progress bar at the very top of slider frame */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-[75ms]" 
                    style={{ width: `${heroSliderProgress}%` }}
                  />
                </div>
 
                {/* Main slide content layers on top of full-bleed image */}
                <div className="relative w-full h-full flex flex-col justify-between p-5 z-10 select-none">
                  
                  {/* Top Category Tag & Slide Indicators */}
                  <div className="w-full flex items-center justify-between">
                    <span className="bg-gray-950/80 border border-white/10 px-3 py-1 rounded-full text-[9px] font-bold text-violet-400 uppercase tracking-widest backdrop-blur-md">
                      {heroProducts[currentHeroProductIdx].category}
                    </span>
                    
                    {/* Tiny slide dot indicators */}
                    <div className="flex gap-1.5 items-center bg-gray-950/50 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                      {heroProducts.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentHeroProductIdx(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            currentHeroProductIdx === idx ? "bg-violet-400 w-3.5" : "bg-white/40 hover:bg-white/60"
                          }`}
                          title={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
 
                  {/* Spacer to fill space */}
                  <div className="flex-1" />
 
                  {/* Absolute Floating Side Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentHeroProductIdx((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-gray-950/80 hover:bg-white text-gray-400 hover:text-gray-950 border border-white/10 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
                    title="이전 슬라이드"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>    {/* Absolute Floating Side Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentHeroProductIdx((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-gray-950/80 hover:bg-white text-gray-400 hover:text-gray-950 border border-white/10 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
                    title="이전 슬라이드"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentHeroProductIdx((prev) => (prev + 1) % heroProducts.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-gray-950/80 hover:bg-white text-gray-400 hover:text-gray-950 border border-white/10 transition-all duration-200 active:scale-90 cursor-pointer shadow-lg backdrop-blur-md"
                    title="다음 슬라이드"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                </div>
              </div>
            </div>

          </div>

          {/* Floating statistics Grid (moved slightly below the 2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 pt-12 border-t border-gray-900/60">
            {[
              { id: "stat-1", val: 500, suffix: "+", subtitle: "프로젝트 진행", detail: "대기업부터 선도 스타트업까지 검증된 프로젝트 포트폴리오" },
              { id: "stat-2", val: 95, suffix: "%", subtitle: "고객 만족도", detail: "압도적인 신속 피드백과 독창적인 고품격 디자인 완성도" },
              { id: "stat-3", val: 24, suffix: "h", subtitle: "빠른 피드백", detail: "비즈니스 지연 없는 Slack 채널 즉시 대응 및 최단 시간 피드백 반영" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                className="bg-gray-900/45 border border-gray-800/60 backdrop-blur-sm p-8 rounded-2xl text-left hover:border-gray-700/85 transition-all duration-300 hover:bg-gray-900/60"
              >
                <div className="font-sans font-black text-4xl lg:text-5xl text-white mb-2 tracking-tighter flex items-center text-blue-500">
                  <AnimatedCounter value={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold text-base mb-1.5">
                  {stat.subtitle}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-normal leading-normal">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE MENU SECTION ("우리가 하는 일") */}
      <section id="service" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-violet-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4">
              OUR SCOPE OF WORK
            </h2>
            <p className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
              우리가 하는 일
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-700 to-indigo-850 mx-auto mt-6 rounded-full" />
            <p className="text-gray-500 text-base sm:text-lg mt-6 font-normal">
              빅스케일은 일반 에이전시나 정규직 직원을 채용하지 않고도 브랜드 성장에 필수적인
              모든 영역의 럭셔리 마케팅 비주얼을 매끈하게 가공합니다.
            </p>
          </div>

          {/* Service grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((serv, idx) => {
              const CustomIcon = IconMap[serv.iconName] || Layers;
              return (
                <motion.div
                  key={serv.id}
                  id={`service-card-${serv.id}`}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.12)" }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-8 sm:p-10 transition-all duration-300 group flex flex-col items-start hover:border-violet-200"
                >
                  {/* High-Fidelity Glossy Premium Glass Pictogram Tile */}
                  <div className="relative mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-950/20 border border-white/15 overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-violet-950/40 group-hover:-rotate-3">
                    {/* Glossy top glass reflection highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[42%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                    <CustomIcon className="w-7 h-7 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
                  </div>

                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-gray-900 mb-4 tracking-tight">
                    {serv.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {serv.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-200/40 w-full flex items-center justify-between text-xs text-gray-400 group-hover:text-violet-600 font-bold tracking-wider transition-colors duration-200">
                    <span>LIMITED SPOTS FOR CONTRACT</span>
                    <ArrowUpRight className="w-4 h-4 translate-x-1 group-hover:-translate-y-0.5 group-hover:translate-x-1.5 transition-transform duration-205" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESIGN SUBSCRIPTION SECTION (디자이너를 채용하지 마세요.) */}
      <section id="subscription" className="py-24 sm:py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              No More Hiring Fatigue
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
              디자이너를 채용하지 마세요.
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl mt-4 font-normal">
              월 구독 하나로 필요한 디자인을 필요할 때 언제든 제한 없이 요청하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
            {/* Left: Traditional Agency */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 sm:p-12 flex flex-col justify-between opacity-80 backdrop-blur-sm shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full opacity-35 transition-transform group-hover:scale-105" />
              <div>
                <div className="flex items-center space-x-2 text-gray-400 mb-6">
                  <span className="text-xs uppercase tracking-widest font-black">Traditional Model</span>
                </div>
                <h3 className="font-sans font-black text-2xl text-gray-400 tracking-tight mb-8">
                  기존 디자인 외주 / 에이전시
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start text-gray-500 text-sm">
                    <XCircle className="w-5 h-5 text-gray-400 mr-3.5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-700 block mb-0.5">건별 비용 & 청구 피로감</strong>
                      프로젝트마다 견적 검토, 승인 진행을 거치느라 비즈니스 의사결정이 크게 지연됩니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-500 text-sm">
                    <XCircle className="w-5 h-5 text-gray-400 mr-3.5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-700 block mb-0.5">반복 계약 및 수수료</strong>
                      매 프로젝트마다 계약을 신규 체결해야 하며 예산 소진이 주 단위로 파편화됩니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-500 text-sm">
                    <XCircle className="w-5 h-5 text-gray-400 mr-3.5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-700 block mb-0.5">까다롭고 유료인 수정</strong>
                      정해진 2~3회 수정 횟수를 초과할 때마다 무자비한 추가 금액을 청구해 부담을 늘립니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-500 text-sm">
                    <XCircle className="w-5 h-5 text-gray-400 mr-3.5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-700 block mb-0.5">고용 리스크 및 내부 인력 부재</strong>
                      연봉 4,000만 원 이상의 채용은 엄청난 고정비 부담이 되고 실력 검증이 힘듭니다.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-12 text-center pt-6 border-t border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                INEFFICIENT FOR FAST-GROWING BRANDS
              </div>
            </div>

            {/* Right: BIG SCALE (Highlighted) */}
            <div className="bg-white border-2 border-violet-600 rounded-2xl p-8 sm:p-12 flex flex-col justify-between shadow-xl shadow-violet-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-violet-600 text-white font-black text-[9px] tracking-widest uppercase w-28 py-1.5 rotate-45 translate-x-8 translate-y-3.5 shadow-sm z-10 text-center whitespace-nowrap">
                ACTIVE
              </div>
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-violet-600 mb-6">
                  <Zap className="w-4 h-4 fill-violet-600 text-violet-600 animate-bounce" />
                  <span className="text-xs uppercase tracking-widest font-black">Premium Subscription Plan</span>
                </div>
                <h3 className="font-sans font-black text-3xl text-gray-900 tracking-tight mb-8">
                  빅스케일 디자인 구독
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 mr-3.5 shrink-0 mt-0.5 fill-violet-50" />
                    <div>
                      <strong className="text-gray-950 block mb-0.5 font-bold">월 저렴하고 정직한 정액 요금</strong>
                      추가 수수료나 복잡한 계약 없이 단일 월 구독으로 예산 설계가 직관적이고 예측 가능합니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 mr-3.5 shrink-0 mt-0.5 fill-violet-50" />
                    <div>
                      <strong className="text-gray-950 block mb-0.5 font-bold">대기열 등록 무제한 요청</strong>
                      슬랙이나 캘린더 대시보드에 요청 사항을 제한 없이 무제한으로 등재할 수 있습니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 mr-3.5 shrink-0 mt-0.5 fill-violet-50" />
                    <div>
                      <strong className="text-gray-950 block mb-0.5 font-bold">무제한 빠른 수정 및 소통</strong>
                      디자인 결과물에 불만족하신다면 만족하실 때까지 비용 추가 없이 실시간 수정 피드백을 수용합니다.
                    </div>
                  </li>
                  <li className="flex items-start text-gray-700 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 mr-3.5 shrink-0 mt-0.5 fill-violet-50" />
                    <div>
                      <strong className="text-gray-950 block mb-0.5 font-bold">상시 관리 & 전담 수석 디자이너</strong>
                      브랜드 마케터 역할까지 연계하여 일하는 디자인 구독 시스템을 경험해보세요.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-baseline space-x-1.5 self-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Est. cost</span>
                  <span className="text-2xl font-black text-gray-900 tracking-tight">from ₩2,800,000</span>
                  <span className="text-xs text-gray-400">/월</span>
                </div>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full sm:w-auto btn-3d-glass text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-lg hover:shadow-violet-500/20 active:scale-95 transition-all text-center flex items-center justify-center space-x-1.5 whitespace-nowrap"
                >
                  <span>구독 상담 신청</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* INTERACTIVE ROI SAVINGS CALCULATOR */}
          <div className="mt-20 max-w-5xl mx-auto bg-white border border-gray-100 p-8 sm:p-12 rounded-3xl shadow-sm">
            <h4 className="font-sans font-black text-2xl text-gray-900 tracking-tight text-center mb-2">
              체감 디자인 비용 절감액 계산기
            </h4>
            <p className="text-gray-400 text-sm text-center mb-10">
              필수 마커 디자인 요청 회수를 가늠하시어 빅스케일 구독과의 정밀 예산 대비를 비교하세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="md:col-span-7 space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm text-gray-700">월간 필요한 예상 중요 디자인 건수</span>
                    <span className="font-bold text-lg text-indigo-600">{requiredDesignCount}건</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={requiredDesignCount}
                    onChange={(e) => setRequiredDesignCount(Number(e.target.value))}
                    className="w-full h-2 bg-violet-105 rounded-xl appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-semibold">
                    <span>1건 (전환 랜딩 등)</span>
                    <span>8건 (마케팅 집중)</span>
                    <span>15건+ (대규모 연간 플랜)</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-sm text-gray-700 block mb-3">가정 구독 서비스 등급 선택</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setActivePlanType("standard")}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        activePlanType === "standard"
                          ? "border-violet-500 bg-violet-50 text-violet-950 shadow-sm font-bold animate-none"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-semibold text-[10px] uppercase mb-1 tracking-wider text-violet-600">Standard 플랜</div>
                      <div className="font-black text-base">₩ 2,800,000 /월</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePlanType("pro")}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        activePlanType === "pro"
                          ? "border-violet-500 bg-violet-50 text-violet-950 shadow-sm font-bold animate-none"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-semibold text-[10px] uppercase mb-1 tracking-wider text-violet-600">Premium PRO 플랜</div>
                      <div className="font-black text-base">₩ 4,900,000 /월</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="md:col-span-5 bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-105 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400 block mb-4">
                    COST ADVANTAGE ESTIMATE
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500 font-semibold">
                      <span>단품 외주 에이전시 (건당 ￦70만 기준)</span>
                      <span className="line-through text-gray-450">₩{estimatedAgencyCost.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-xs text-indigo-600 font-black">
                      <span>빅스케일 구독 요금</span>
                      <span>₩{estimatedBigScaleCost.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-250">
                  <span className="text-xs font-bold text-gray-500 block mb-1">종합 월간 예산 세이브 효과</span>
                  <div className="text-3xl font-black text-gray-900 tracking-tight">
                    ₩{netSavings.toLocaleString()}원 <span className="text-indigo-600 block sm:inline-block">절감</span>
                  </div>
                  <span className="text-[11px] text-gray-400 leading-tight block mt-2 font-normal">
                    전담 수석디자이너 배정 및 피드백 {estimateSpeedDays} 지원까지 감안된 예산 최적화 지표입니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PRODUCTS SLIDER */}
      <section id="slider-anchor" className="py-24 sm:py-32 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-left max-w-2xl">
              <span className="text-violet-600 font-bold uppercase tracking-wider text-xs block mb-3">
                ENDLESS VISUAL OUTLETS
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight leading-none">
                구독으로 가능한 디자인
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-4 font-normal">
                카드뉴스, SNS 마케팅 배너부터 대형 출판 인쇄물 및 트렌디한 AI 활용 비주얼까지 필요한 모든 사양을 막힘 없이 즉시 요청하고 소유할 수 있습니다.
              </p>
            </div>

            {/* Slider Interactive Controllers */}
            <div className="flex items-center space-x-3 self-end md:self-center">
              <button
                onClick={() => {
                  setSliderIndex((prev) => Math.max(0, prev - 1));
                  setIsSliderHovered(true);
                }}
                className="p-3 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-full hover:from-violet-50 hover:to-violet-100/40 hover:text-violet-900 shadow-sm transition-all text-gray-700 active:scale-95 text-sm cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setSliderIndex((prev) => (prev < DESIGN_PRODUCTS.length - 3 ? prev + 1 : 0));
                  setIsSliderHovered(true);
                }}
                className="p-3 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-full hover:from-violet-50 hover:to-violet-100/40 hover:text-violet-900 shadow-sm transition-all text-gray-700 active:scale-95 text-sm cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Containers */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto whitespace-nowrap scrollbar-none px-4 sm:px-[calc((100vw-min(1280px,100vw))/2+32px)] space-x-6 pb-8 transition-all duration-300 select-none cursor-grab"
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
            style={{ scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {DESIGN_PRODUCTS.map((prod, idx) => (
              <div
                key={prod.id}
                className="inline-block w-80 shrink-0 bg-gray-50 border border-gray-100/75 rounded-2xl overflow-hidden shadow-sm group hover:border-violet-500/40 hover:shadow-md transition-all duration-300"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <SafeImage
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-black px-3 py-1 rounded-full text-violet-600 shadow-sm">
                    {prod.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-sans font-bold text-lg text-gray-900 group-hover:text-violet-600 transition-colors whitespace-normal mb-1.5">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    빅스케일 크리에이티브 랩
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 sm:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-violet-600 text-xs font-black uppercase tracking-widest block mb-3">
              CREATIVE SHOWCASE
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight">
              최근 프로젝트
            </h2>
            <p className="text-gray-500 text-base mt-4 font-normal">
              빅스케일을 통해 고도화된 최신 마케팅 및 브랜드 아이덴티티 성과물을 확인하세요.
            </p>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {["All", "Branding", "Package", "Print", "AI Strategy"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setPortfolioFilter(tag)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    portfolioFilter === tag
                      ? "bg-gradient-to-r from-violet-600 to-indigo-700 text-white shadow-md shadow-violet-950/45 border border-violet-500/20"
                      : "bg-gradient-to-b from-white to-gray-50/80 text-gray-600 border border-gray-200 hover:from-violet-50 hover:to-violet-100/40 hover:text-violet-950 shadow-sm"
                  }`}
                >
                  {tag === "All" && "전체 보기"}
                  {tag === "Branding" && "브랜드 / 아이덴티티"}
                  {tag === "Package" && "패키지 신상품"}
                  {tag === "Print" && "편집 / 인쇄 홍보"}
                  {tag === "AI Strategy" && "AI 생성 비주얼"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid layout */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolios.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  onClick={() => setSelectedPortfolioItem(item)}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden aspect-[4/3]">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                          {item.tag}
                        </span>
                        <h4 className="font-bold text-sm tracking-tight sm:text-base">
                          Zoom Showcase View
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-blue-600 font-extrabold uppercase tracking-wider block mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">Click to examine details</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* WHY BIG SCALE ("디자인만 만드는 회사가 아닙니다.") */}
      <section className="py-24 sm:py-32 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-extrabold tracking-widest text-violet-600 uppercase block mb-3">
              NOT AN ORDINARY AGENCY
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight">
              디자인만 만드는 회사가 아닙니다.
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mt-4 font-normal">
              우리는 비즈니스의 성장 가치를 최우선으로, 철저한 브랜드 방향성 수립과 세마포어 마케팅 데이터 기반 제작 과정을 일구어 냅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                id: "w-brand",
                title: "브랜딩",
                subtitle: '"브랜드 전략 수립"',
                desc: "심미적 만족에 그치는 단순 외관의 로고가 아닌, 핵심 세일즈 목표 and 시장 경쟁 가이드라인에 완전히 부응하는 차원 높은 브랜드 전략 및 무드보드를 선구적으로 수립합니다.",
                metric: "CORE-01"
              },
              {
                id: "w-market",
                title: "마케팅",
                subtitle: '"성과 중심 콘텐츠 제작"',
                desc: "기존 미사용 마케팅 디자인의 문제점인 저조한 광고 클릭률(CTR), 불투명한 상세페이지 완독률을 개선할 비주얼을 데이터 기획자 관점에서 명징히 도안하고 창출해 냅니다.",
                metric: "ROI-98"
              },
              {
                id: "w-ai",
                title: "AI",
                subtitle: '"AI를 활용한 빠른 제작"',
                desc: "타 대행업체가 수 영업일을 소모하는 기초 이미지 스터디, 그래픽 텍스처 작업을 생성형 AI 엔진으로 수 분 이내로 도출해 독보적인 제작 타임라인 압축에 성공했습니다.",
                metric: "SYS-95"
              }
            ].map((col) => (
              <div
                key={col.id}
                className="bg-gray-50 hover:bg-gray-100/50 border border-gray-100 rounded-3xl p-8 sm:p-10 transition-colors duration-250 flex flex-col justify-between group"
              >
                <div>
                  <div className="text-right text-[10px] font-mono tracking-widest text-violet-500 font-extrabold mb-4 border-b border-gray-200/55 pb-3">
                    {col.metric}
                  </div>
                  <h3 className="font-sans font-black text-2xl text-gray-900 tracking-tight text-left mb-1.5">
                    {col.title}
                  </h3>
                  <div className="text-violet-600 font-bold text-sm tracking-tight mb-6">
                    {col.subtitle}
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-normal">
                    {col.desc}
                  </p>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200/40 text-xs font-bold text-gray-400 group-hover:text-violet-600 tracking-wide transition-colors">
                  REAL TIME CONVERSION ENGINE
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION ("간단한 프로세스") */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-violet-600 text-xs font-black tracking-widest block mb-3 uppercase">
              SMOOTH ONBOARDING
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight">
              간단한 프로세스
            </h2>
            <p className="text-gray-500 text-base mt-4 font-normal">
              단 4단계를 거쳐 빅스케일의 독창적인 크리에이티브 파이프라인을 완전히 활성화하세요.
            </p>
          </div>

          {/* Interactive Horizontal timeline */}
          <div className="relative max-w-6xl mx-auto mt-12">
            {/* Timeline connection line line to span across on desktop only */}
            <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 bg-gray-200/80 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 relative group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 font-sans font-black text-xl mb-6 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300 shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-gray-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 sm:py-32 bg-gray-950 relative overflow-hidden">
        {/* Futuristic Grid Layer Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-violet-900 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Info side */}
            <div className="lg:col-span-5 text-left text-white">
              <span className="text-violet-400 font-mono text-xs font-black tracking-widest uppercase block mb-3">
                LET'S BOOST YOUR BRAND
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tighter mb-6">
                브랜드를 더 크게 만들 준비가 되셨나요?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
                디자인은 단순한 시각적 장식을 넘어, 브랜드의 가치를 높이고 매출 성장을 이끌어내는 핵심 경쟁력입니다.
                구인 및 채용 부담 없이, 검증된 탑클래스 전담 디자인 팀을 합리적인 비용으로 빠르게 도입해 보세요.
              </p>

              <div className="space-y-6 pt-6 border-t border-gray-905">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-violet-400 border border-white/10 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">메일 문의</span>
                    <a href="mailto:hello.big7026@gmail.com" className="text-sm font-bold text-white hover:text-violet-400 transition-colors">
                      hello.big7026@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-violet-400 border border-white/10 shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-400">
                    <strong className="text-neutral-300 block mb-0.5">안전한 데이터 보증 약관</strong>
                    제출하는 모든 정보는 철저한 대외비 기밀(NDA) 조항으로 안전하게 수탁됩니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form Cards */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/20 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="border-b border-gray-100 pb-5">
                      <h3 className="font-sans font-black text-2xl text-gray-900 tracking-tight mb-1">
                        무료 맞춤형 상담 예약
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        귀사에 정확한 무제한 디자인 패널 구축에 소모될 타임라인을 안내합니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                          회사명 <span className="text-violet-600">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="예: 예시 소프트웨어"
                            className={`w-full bg-gray-50 border ${
                              formErrors.companyName ? "border-red-500 focus:ring-red-105 focus:border-red-500" : "border-gray-200 focus:ring-violet-500 focus:border-violet-600"
                            } rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2`}
                          />
                        </div>
                        {formErrors.companyName && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">{formErrors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contactName" className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                          담당자명 <span className="text-violet-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            placeholder="예: 대표 홍길동"
                            className={`w-full bg-gray-50 border ${
                              formErrors.contactName ? "border-red-500 focus:ring-red-105 focus:border-red-500" : "border-gray-200 focus:ring-violet-500 focus:border-violet-600"
                            } rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2`}
                          />
                        </div>
                        {formErrors.contactName && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">{formErrors.contactName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                        연락처 <span className="text-violet-600">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="예: 010-1234-5678"
                          className={`w-full bg-gray-50 border ${
                            formErrors.phoneNumber ? "border-red-500 focus:ring-red-105 focus:border-red-500" : "border-gray-200 focus:ring-violet-500 focus:border-violet-600"
                          } rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2`}
                        />
                      </div>
                      {formErrors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{formErrors.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                        문의 내용 <span className="text-violet-600">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="현재 필요한 비주얼 볼륨, 마케팅 플랜 등에 대해 편하게 기술 부탁드립니다."
                          className={`w-full bg-gray-50 border ${
                            formErrors.message ? "border-red-500 focus:ring-red-105 focus:border-red-500" : "border-gray-200 focus:ring-violet-500 focus:border-violet-600"
                          } rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2`}
                        />
                      </div>
                      {formErrors.message && (
                        <p className="text-red-500 text-xs mt-1.5 font-semibold">{formErrors.message}</p>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400 leading-normal">
                      빅스케일은 귀사의 문의 접수 후 영업 담당 전임 수석디자이너가 6시간 내로 카카오톡 또는 이메일을 통해 다이렉트 통신을 제정합니다.
                    </p>                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-3d-glass text-white font-bold py-4 rounded-xl text-center shadow-lg active:scale-99 transition-all duration-150 flex items-center justify-center space-x-2.5 disabled:opacity-75 disabled:cursor-wait text-base cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                          <span>신청 접수 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>무료 상담 신청</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mx-auto mb-8 border border-violet-200">
                      <Check className="w-10 h-10 stroke-[3]" />
                    </div>
                    <h3 className="font-sans font-black text-3xl text-gray-950 mb-3 tracking-tight">
                      상담 예약 신청 완료!
                    </h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                      감사합니다. 귀사에서 의뢰하신 빅스케일 럭셔리 디자인 전공 상담 수신 사양 정보가 성공적으로 수탁 완료되었습니다.
                    </p>

                    {/* Display submitted summary card */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-left max-w-md mx-auto mb-10 space-y-3 font-medium text-xs sm:text-sm text-gray-650">
                      <div className="border-b border-gray-150 pb-2.5 font-bold text-violet-600 text-xs uppercase text-center tracking-wider">
                        접수 내역 일치 확인 디스플레이
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">회사명:</span>
                        <span className="text-gray-900 font-bold">{submittedData?.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">담당자명:</span>
                        <span className="text-gray-900 font-bold">{submittedData?.contactName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">연락처:</span>
                        <span className="text-gray-900 font-bold">{submittedData?.phoneNumber}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-150 flex flex-col gap-1 text-xs">
                        <span className="text-gray-400 font-bold block">문의 사유 원고 약략:</span>
                        <span className="text-gray-800 line-clamp-3 block whitespace-pre-wrap">{submittedData?.message}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-gray-150 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full text-xs transition-colors border border-gray-200 cursor-pointer"
                    >
                      새로운 문의로 추가 접수하기
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 pt-20 pb-12 border-t border-gray-905">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-900">
            {/* Logo space */}
            <div className="md:col-span-4 space-y-6 text-left">
              <span className="font-sans font-black text-3xl tracking-tighter text-white flex items-center">
                BIG SCALE
              </span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-normal">
                브랜드를 더 크게 만드는 디자인 구독 파트너.
                기획, 전략, 마케팅을 아우르는 올인원 비주얼 크레딧입니다.
              </p>
              <div className="text-xs text-gray-500 font-mono">
                © 2026 빅스케일. ALL RIGHTS RESERVED
              </div>
            </div>

            {/* Quick map Services */}
            <div className="md:col-span-4 text-left">
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6">
                Services
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li>
                  <button onClick={() => scrollTo("service")} className="hover:text-violet-500 transition-colors cursor-pointer">
                    시각디자인 편집 및 인쇄
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("service")} className="hover:text-violet-500 transition-colors cursor-pointer">
                    CI · BI 브랜드 아이덴티티
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("service")} className="hover:text-violet-500 transition-colors cursor-pointer">
                    디자인 마케팅 & SNS 카드뉴스
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("service")} className="hover:text-violet-500 transition-colors cursor-pointer">
                    AI 디자인 컨설팅 자산 모델
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("subscription")} className="hover:text-violet-500 transition-colors cursor-pointer">
                    디자인 무제한 월 정액 구독 서비스
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="md:col-span-4 text-left">
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6">
                Contact & Legal
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <span className="text-gray-600 block text-xs uppercase font-extrabold tracking-wider mb-1">Email inquiry</span>
                  <a href="mailto:hello.big7026@gmail.com" className="hover:text-violet-500 text-gray-300 transition-colors">
                    hello.big7026@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-gray-600 block text-xs uppercase font-extrabold tracking-wider mb-1">Enterprise Registration</span>
                  <span className="text-gray-400 block text-xs">
                    서울특별시 강남구 테헤란로 플래티넘 빌딩 21층 (주)빅스케일코퍼레이션
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-medium">
            <div className="flex flex-wrap items-center gap-6">
              <a href="#hero" className="hover:text-violet-500 transition-colors">개인정보처리방침</a>
              <a href="#hero" className="hover:text-violet-500 transition-colors">이용약관</a>
              <a href="#hero" className="hover:text-violet-500 transition-colors">NDA 약관 동의 가이드라인</a>
            </div>
            <div>
              빅스케일의 독자적인 크리에이티브 감각으로 설계되었습니다.
            </div>
          </div>
        </div>
      </footer>

      {/* PORTFOLIO ZOOMING ACCORDION MODAL SCREEN */}
      <AnimatePresence>
        {selectedPortfolioItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-100"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-5 right-5 z-10 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all text-sm shadow-md cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={selectedPortfolioItem.imageUrl}
                  alt={selectedPortfolioItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 sm:p-12 text-left space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="bg-violet-50 text-violet-600 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-widest border border-violet-100">
                    {selectedPortfolioItem.tag}
                  </span>
                  <span className="text-gray-400 font-semibold text-xs sm:text-sm">
                    {selectedPortfolioItem.category}
                  </span>
                </div>

                <h3 className="font-sans font-black text-2xl sm:text-3xl text-gray-950 tracking-tight leading-tight">
                  {selectedPortfolioItem.title}
                </h3>

                <p className="text-gray-655 text-sm sm:text-base leading-relaxed font-normal">
                  본 포트폴리오 에셋은 빅스케일의 구독 서비스를 체결하여 매월 전용 디자이너와의 유기적인 소통을 통해 산출된 실제 프로젝트 성과입니다. 
                  대시보드와 슬랙에 단순히 개요와 텍스트를 기재해 두시면, 기획자의 타이트한 마케팅 조언이 반영되어 귀사의 비즈니스 지연 없이 단 3영업일 만에 시정 완성본을 공유합니다.
                </p>

                <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider block">DELIVERED METRICS</span>
                    <div className="flex items-center space-x-2.5 text-gray-900 font-bold text-sm">
                      <Zap className="w-4 h-4 text-violet-600" />
                      <span>의뢰 접수 후 단 48시간 내 최초 검증 시안 완료</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPortfolioItem(null);
                      scrollTo("contact");
                    }}
                    className="btn-3d-glass hover:shadow-lg text-white font-bold text-sm px-6 py-3.5 rounded-full active:scale-98 transition-all cursor-pointer"
                  >
                    이 포트폴리오 스타일로 맞춤 상담하기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Mode Floating Access Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setIsAdminOpen(true);
            setPasscode("");
            setPasscodeError("");
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-950 hover:bg-violet-600 text-white font-bold text-xs shadow-lg shadow-black/35 hover:shadow-violet-500/20 border border-white/10 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span>⚙️ 관리자 모드</span>
        </button>
      </div>

      {/* ADMIN CONTROL PANEL OVERLAY MODAL */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            {!isAuthorized ? (
              /* Passcode Screen */
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-gray-100 shadow-2xl relative"
              >
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 border border-blue-100">
                  <Lock className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-sans font-black text-gray-950 mb-1.5 tracking-tight">
                  관리자 인증 완료 필요
                </h3>
                <p className="text-xs text-gray-400 mb-6 font-semibold">
                  앱의 이미지, 텍스트, 포트폴리오를 수정하고<br/>고객상담 문의를 확인하려면 비밀번호를 기입하십시오.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (passcode === "1234" || passcode.trim() === "admin") {
                      setIsAuthorized(true);
                      setPasscodeError("");
                    } else {
                      setPasscodeError("비밀번호가 틀렸습니다. (힌트: 1234)");
                    }
                  }}
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      비밀번호 (Passcode)
                    </label>
                    <input
                      type="password"
                      placeholder="비밀번호는 '1234' 입니다"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      autoFocus
                    />
                    {passcodeError && (
                      <p className="text-red-500 text-xs mt-1.5 font-bold">{passcodeError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all focus:outline-none select-none active:scale-98"
                  >
                    대시보드 접속하기
                  </button>
                </form>
              </motion.div>
            ) : (
              /* authorized admin console */
              <motion.div
                initial={{ scale: 0.97, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.97, y: 15 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-gray-100"
              >
                {/* Admin Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-150 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-[10px] font-black uppercase tracking-wider">
                      ADMIN CTR
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-950 tracking-tight">
                        빅스케일 실시간 마스터 설정 센터
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold tracking-wide">
                        수정한 사항은 브라우저 로컬 저장소(localStorage)에 안전하게 실시간 보존됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsAuthorized(false);
                        setIsAdminOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-150 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all font-bold text-xs"
                    >
                      로그아웃
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Tabs & Contents Area */}
                <div className="flex-1 flex overflow-hidden min-h-[420px]">
                  {/* Left Sidebar Menu */}
                  <div className="w-48 bg-gray-50 border-r border-gray-150 p-3.5 flex flex-col gap-1 shrink-0 text-left">
                    {[
                      { id: "hero", label: "메인 문구 관리", icon: FileText },
                      { id: "heroSlider", label: "히어로 슬라이더", icon: Sparkles },
                      { id: "services", label: "우리가 하는 일", icon: Layers },
                      { id: "portfolio", label: "포트폴리오 관리", icon: Briefcase },
                      { id: "inquiries", label: `구독 상담 문의 (${inquiriesList.length})`, icon: Mail },
                    ].map((tab) => {
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setAdminTab(tab.id as any)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            adminTab === tab.id
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <TabIcon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{tab.label}</span>
                        </button>
                      );
                    })}

                    <div className="mt-auto pt-4 border-t border-gray-200 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm("관리 공간을 초기 공장 상태로 리셋하시겠습니까?\n모든 수정 및 등록 내역이 완벽히 사라집니다.")) {
                            localStorage.removeItem("bigscale_hero_title");
                            localStorage.removeItem("bigscale_hero_desc");
                            localStorage.removeItem("bigscale_hero_slider");
                            localStorage.removeItem("bigscale_services");
                            localStorage.removeItem("bigscale_portfolios");
                            localStorage.removeItem("bigscale_inquiries");
                            window.location.reload();
                          }
                        }}
                        className="text-[9px] text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md font-bold uppercase tracking-wider transition-colors w-full"
                      >
                        공장 초기화 (Reset App)
                      </button>
                    </div>
                  </div>

                  {/* Right Tab Contents */}
                  <div className="flex-1 overflow-y-auto p-6 text-left bg-white">
                    {/* Tab: main text content */}
                    {adminTab === "hero" && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                          <h5 className="font-extrabold text-sm text-gray-900">메인 최상단 타이틀 및 캡션 문구 관리</h5>
                          <p className="text-[11px] text-gray-400 mt-0.5">웹사이트 맨 처음 진입 시 도출되는 메인 광고 슬로건과 설득 구절을 직접 변경합니다.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5">메인 타이틀 (줄바꿈 가능)</label>
                            <textarea
                              rows={3}
                              value={heroTitle}
                              onChange={(e) => setHeroTitle(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans font-black text-gray-950 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
                              placeholder="브랜드를 더 크게 만드는\n디자인 구독 서비스"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5">메인 캡션 상세 설명</label>
                            <textarea
                              rows={4}
                              value={heroDescription}
                              onChange={(e) => setHeroDescription(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-650 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white"
                              placeholder="시각디자인부터 브랜딩, 온·오프라인 마케팅 에셋..."
                            />
                          </div>

                          <button
                            onClick={() => {
                              localStorage.setItem("bigscale_hero_title", heroTitle);
                              localStorage.setItem("bigscale_hero_desc", heroDescription);
                              alert("성공적으로 저장되었습니다!");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-md active:scale-95 flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>문구 즉시 변경 저장</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab: Hero sliding design showcase */}
                    {adminTab === "heroSlider" && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                          <h5 className="font-extrabold text-sm text-gray-900">최상단 3D 이미지 슬라이더 (3종) 관리</h5>
                          <p className="text-[11px] text-gray-400 mt-0.5">히어로 우측에서 회전하는 3종의 제품/패키지/북 디자인 카드의 이미지와 타이틀 속성값을 변경합니다.</p>
                        </div>

                        <div className="space-y-8 divide-y divide-gray-100">
                          {heroProducts.map((slide, sIdx) => (
                            <div key={slide.id || sIdx} className={`pt-6 ${sIdx === 0 ? 'pt-0' : ''} space-y-4`}>
                              <div className="flex items-center space-x-2">
                                <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded font-black">
                                  SLIDE #{sIdx + 1} ({slide.category ? slide.category.split(" ")[0] : "카테고리"})
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-gray-400 mb-1">슬라이드 타이틀</label>
                                  <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => {
                                      const updated = [...heroProducts];
                                      updated[sIdx] = { ...slide, title: e.target.value };
                                      setHeroProducts(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-gray-400 mb-1">카테고리 표기</label>
                                  <input
                                    type="text"
                                    value={slide.category}
                                    onChange={(e) => {
                                      const updated = [...heroProducts];
                                      updated[sIdx] = { ...slide, category: e.target.value };
                                      setHeroProducts(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-gray-400 mb-1">고화질 이미지 경로 (외부 Unsplash 또는 웹 이미지 경로 주소 가능)</label>
                                  <input
                                    type="text"
                                    value={slide.image}
                                    onChange={(e) => {
                                      const updated = [...heroProducts];
                                      updated[sIdx] = { ...slide, image: e.target.value };
                                      setHeroProducts(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[10px]"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-gray-400 mb-1">기술 상세 태그 (Technique)</label>
                                  <input
                                    type="text"
                                    value={slide.technique}
                                    onChange={(e) => {
                                      const updated = [...heroProducts];
                                      updated[sIdx] = { ...slide, technique: e.target.value };
                                      setHeroProducts(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-gray-400 mb-1">설명 요약 문안</label>
                                  <input
                                    type="text"
                                    value={slide.desc}
                                    onChange={(e) => {
                                      const updated = [...heroProducts];
                                      updated[sIdx] = { ...slide, desc: e.target.value };
                                      setHeroProducts(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="pt-6">
                            <button
                              onClick={() => {
                                localStorage.setItem("bigscale_hero_slider", JSON.stringify(heroProducts));
                                alert("슬라이드 데이터 세트가 완전히 수탁 보존되었습니다!");
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md active:scale-95 flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              <span>슬라이드 일괄 설정 보존</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab: core services */}
                    {adminTab === "services" && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                          <h5 className="font-extrabold text-sm text-gray-900">우리가 하는 일 (6대 핵심 디자인 스코프) 관리</h5>
                          <p className="text-[11px] text-gray-400 mt-0.5">서비스 그리드 안의 카드 아이템들의 타이틀과 상세 안내문을 변경합니다.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {servicesList.map((serv, sIdx) => (
                            <div key={serv.id || sIdx} className="p-4 border border-gray-150 rounded-2xl bg-gray-50 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-blue-500 font-extrabold bg-blue-50 px-2 py-0.5 rounded">
                                  CORE #{sIdx + 1}
                                </span>
                                
                                <select
                                  value={serv.iconName}
                                  onChange={(e) => {
                                    const updated = [...servicesList];
                                    updated[sIdx] = { ...serv, iconName: e.target.value };
                                    setServicesList(updated);
                                  }}
                                  className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-bold focus:outline-none"
                                >
                                  {["Layers", "Compass", "FolderHeart", "TrendingUp", "Sparkles", "CalendarDays"].map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-0.5">에셋 서비스명</label>
                                <input
                                  type="text"
                                  value={serv.title}
                                  onChange={(e) => {
                                    const updated = [...servicesList];
                                    updated[sIdx] = { ...serv, title: e.target.value };
                                    setServicesList(updated);
                                  }}
                                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-0.5">상세 세부 안내</label>
                                <textarea
                                  rows={2}
                                  value={serv.description}
                                  onChange={(e) => {
                                    const updated = [...servicesList];
                                    updated[sIdx] = { ...serv, description: e.target.value };
                                    setServicesList(updated);
                                  }}
                                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs focus:outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4">
                          <button
                            onClick={() => {
                              localStorage.setItem("bigscale_services", JSON.stringify(servicesList));
                              alert("실시간 에셋 6대 서비스 세트 저장이 완료되었습니다!");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md active:scale-95 flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>디자인 서비스 설정 전장 저장</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab: Portfolios */}
                    {adminTab === "portfolio" && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                          <div>
                            <h5 className="font-extrabold text-sm text-gray-900">최근 핵심 포트폴리오 프로젝트 목록 편집</h5>
                            <p className="text-[11px] text-gray-400 mt-0.5">포트폴리오의 타이틀, 고화질 썸네일 경로, 태깅 레이아웃 구조를 편집합니다.</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const newId = `fol-${Date.now()}`;
                              const newItem = {
                                id: newId,
                                title: "새로운 한정판 프리미엄 브랜드 시각 에셋",
                                category: "디자이너 제작 에셋",
                                tag: "Branding",
                                imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
                              };
                              const updated = [...portfoliosList, newItem];
                              setPortfoliosList(updated);
                              localStorage.setItem("bigscale_portfolios", JSON.stringify(updated));
                            }}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors border border-blue-100"
                          >
                            + 새 프로젝트 에셋 추가
                          </button>
                        </div>

                        <div className="space-y-6">
                          {portfoliosList.map((item, pIdx) => (
                            <div key={item.id || pIdx} className="p-4 border border-gray-150 rounded-2xl bg-gray-50 flex flex-col md:flex-row items-start md:items-center gap-4">
                              <SafeImage
                                src={item.imageUrl}
                                alt="Cover preview"
                                className="w-24 h-16 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                              />

                              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
                                <div className="md:col-span-4">
                                  <label className="block text-[9px] font-bold text-gray-400 mb-0.5">프로젝트 타이틀</label>
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => {
                                      const updated = [...portfoliosList];
                                      updated[pIdx] = { ...item, title: e.target.value };
                                      setPortfoliosList(updated);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
                                  />
                                </div>

                                <div className="md:col-span-3">
                                  <label className="block text-[9px] font-bold text-gray-400 mb-0.5">이미지 주소 URL</label>
                                  <input
                                    type="text"
                                    value={item.imageUrl}
                                    onChange={(e) => {
                                      const updated = [...portfoliosList];
                                      updated[pIdx] = { ...item, imageUrl: e.target.value };
                                      setPortfoliosList(updated);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none font-mono"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-[9px] font-bold text-gray-400 mb-0.5">세부 사양</label>
                                  <input
                                    type="text"
                                    value={item.category}
                                    onChange={(e) => {
                                      const updated = [...portfoliosList];
                                      updated[pIdx] = { ...item, category: e.target.value };
                                      setPortfoliosList(updated);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-[9px] font-bold text-gray-400 mb-0.5">태그 분류</label>
                                  <select
                                    value={item.tag}
                                    onChange={(e) => {
                                      const updated = [...portfoliosList];
                                      updated[pIdx] = { ...item, tag: e.target.value };
                                      setPortfoliosList(updated);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-1.5 py-1 text-xs focus:outline-none font-bold"
                                  >
                                    {["Branding", "Package", "Print", "AI Strategy"].map((tag) => (
                                      <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="md:col-span-1 flex items-end justify-end">
                                  <button
                                    onClick={() => {
                                      if (window.confirm("이 항목을 포트폴리오 리스트에서 영구 삭제 처리하시겠습니까?")) {
                                        const updated = portfoliosList.filter((x) => x.id !== item.id);
                                        setPortfoliosList(updated);
                                        localStorage.setItem("bigscale_portfolios", JSON.stringify(updated));
                                      }
                                    }}
                                    className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-[10px] font-bold w-full text-center transition-colors border border-red-100 cursor-pointer"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <button
                            onClick={() => {
                              localStorage.setItem("bigscale_portfolios", JSON.stringify(portfoliosList));
                              alert("포트폴리오 수정 사항 저장 처리가 성공했습니다!");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-md active:scale-95 flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>포트폴리오 전체 변경 적용</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab: live inquiries submissions details view */}
                    {adminTab === "inquiries" && (
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                          <div>
                            <h5 className="font-extrabold text-sm text-gray-900">상담 신청 실시간 인바운드 접수 대장 ({inquiriesList.length}건)</h5>
                            <p className="text-[11px] text-gray-400 mt-0.5">상담 가동 버튼을 눌러 소급 접수된 예비 의뢰 문의를 신속히 탐지하십시오.</p>
                          </div>

                          {inquiriesList.length > 0 && (
                            <button
                              onClick={() => {
                                if (window.confirm("상담 대장 내역을 전부 영구 초기화하시겠습니까? (복원 불가능)")) {
                                  setInquiriesList([]);
                                  localStorage.setItem("bigscale_inquiries", "[]");
                                }
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-100 rounded-xl transition-all"
                            >
                              대장 전체 삭제
                            </button>
                          )}
                        </div>

                        {inquiriesList.length === 0 ? (
                          <div className="py-16 text-center border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center">
                            <span className="text-3xl filter saturate-50">✉️</span>
                            <span className="text-sm font-bold text-gray-400 mt-3">아직 접수된 상담 예약 건이 없습니다.</span>
                            <span className="text-[11px] text-gray-300 mt-1">상담 폼을 기입해 송출하면 즉시 실시간 리스팅됩니다.</span>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {inquiriesList.map((inq: any, iIdx: number) => (
                              <div key={inq.id || iIdx} className="border border-gray-150 rounded-2xl p-5 bg-gray-50/50 hover:bg-gray-50 transition-all font-medium text-xs sm:text-sm text-gray-750 relative select-text">
                                <button
                                  onClick={() => {
                                    const updated = inquiriesList.filter((_, idx) => idx !== iIdx);
                                    setInquiriesList(updated);
                                    localStorage.setItem("bigscale_inquiries", JSON.stringify(updated));
                                  }}
                                  className="absolute top-4 right-4 px-2 py-1 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer text-xs font-bold"
                                >
                                  삭제
                                </button>
                                
                                <span className="text-[10px] font-mono text-gray-400 block mb-3 font-semibold">
                                  접수 번호 : inq-{inq.id || Date.now()} | {inq.date || "수신 시간 소급"}
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-gray-100 pb-3 mb-3 text-xs">
                                  <div>
                                    <span className="text-gray-400 text-[10px] font-bold block mb-0.5">회사 상호</span>
                                    <span className="text-gray-900 font-extrabold">{inq.companyName}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400 text-[10px] font-bold block mb-0.5">대표자 / 담당자</span>
                                    <span className="text-gray-900 font-bold">{inq.contactName}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400 text-[10px] font-bold block mb-0.5">통신 번호</span>
                                    <span className="text-blue-600 font-black font-mono select-all">{inq.phoneNumber}</span>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-gray-400 text-[10px] font-bold block mb-1">상세 문의 사유 / 요청 원안</span>
                                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-xs">
                                    {inq.message}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
