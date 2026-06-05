export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ComparisonItem {
  agency: string;
  bigscale: string;
}

export interface DesignProduct {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  imageUrl: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export const SERVICES: Service[] = [
  {
    id: "sc",
    title: "시각디자인",
    description: "브랜드의 가치를 높이는 고품격 2D 그래픽, 편집, 포스터, 온/오프라인 홍보물 디자인",
    iconName: "Layers"
  },
  {
    id: "ci",
    title: "CI · BI 디자인",
    description: "브랜드의 본질을 담은 로고, 시그니처 시스템, 전용 폰트, 정교한 아이덴티티 수립",
    iconName: "Compass"
  },
  {
    id: "bd",
    title: "브랜드 디자인",
    description: "패키지, 굿즈, 브랜드 가이드라인까지 브랜드 경험 전반을 완성도 있게 컨설팅 및 제작",
    iconName: "FolderHeart"
  },
  {
    id: "dm",
    title: "디자인 마케팅",
    description: "SNS 채널 운영, 카드뉴스, 광고 배너, 상세페이지 등 전환율과 매출을 극대화하는 성과 기반 디자인",
    iconName: "TrendingUp"
  },
  {
    id: "ai",
    title: "AI 디자인 컨설팅",
    description: "최신 Generative AI 기술을 접목하여 빠르고 효율적인 프로토타이핑 및 초고품질 이미지 자산 구축",
    iconName: "Sparkles"
  },
  {
    id: "sub",
    title: "월 디자인 구독",
    description: "매번 계약할 필요 없이, 커피 한 잔 가격처럼 합리적인 고정 비용으로 제한 없는 디자인 요청",
    iconName: "CalendarDays"
  }
];

export const COMPARISONS: ComparisonItem[] = [
  {
    agency: "건별 비용 (건당 수십-수백만 원 지출)",
    bigscale: "월 정액 (예상 가능한 투명하고 합리적인 비용)"
  },
  {
    agency: "반복적인 견적 및 복잡한 계약 프로세스",
    bigscale: "무제한 요청 (대기열에 디자인 과제를 제한 없이 추가)"
  },
  {
    agency: "추가 수정 시 마다 늘어나는 비용과 청구서",
    bigscale: "빠른 수정 및 무제한 피드백 반영"
  },
  {
    agency: "프로젝트 종료 후 파편화되는 유지관리",
    bigscale: "하나의 팀처럼 상시 소통 및 전담 디자이너 매칭으로 일관성 유지"
  }
];

export const DESIGN_PRODUCTS: DesignProduct[] = [
  {
    id: "p1",
    category: "마케팅",
    title: "SNS 콘텐츠 디자인",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p2",
    category: "마케팅",
    title: "카드뉴스 & 슬라이드",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p3",
    category: "마케팅",
    title: "배너 디자인",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p4",
    category: "커머스",
    title: "상세페이지 & 랜딩페이지",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p5",
    category: "브랜딩",
    title: "브랜드 아이덴티티 패키지",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p6",
    category: "브랜딩",
    title: "CI · BI 로고 리뉴얼",
    imageUrl: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p7",
    category: "프린트",
    title: "카탈로그 & 브로슈어",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p8",
    category: "프린트",
    title: "포스터 & 오프라인 홍보",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p9",
    category: "전시/이벤트",
    title: "옥외광고 및 대형 현수막",
    imageUrl: "https://images.unsplash.com/photo-1599305090598-6152579705c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p10",
    category: "브랜딩",
    title: "패키지 & 레이블 디자인",
    imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p11",
    category: "웹/앱",
    title: "반응형 홈페이지 디자인",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p12",
    category: "AI 혁신",
    title: "AI 활용 생성형 비주얼 콘텐츠",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800"
  }
];

export const PORTFOLIOS: PortfolioItem[] = [
  {
    id: "fol1",
    title: "Next-Gen Fintech App UI/UX & Identity",
    category: "UI/UX · 브랜딩",
    tag: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fol2",
    title: "Urban Minimalist Packaging Series",
    category: "패키지 디자인",
    tag: "Package",
    imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fol3",
    title: "Creative Tech Conference Brand Identity & Poster Layouts",
    category: "아이덴티티 · 포스터",
    tag: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fol4",
    title: "Cosmetic Brand Eco-Friendly Identity",
    category: "브랜드 아이덴티티",
    tag: "Package",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fol5",
    title: "Automated AI-Optimized E-commerce Campaign Graphics",
    category: "디자인 마케팅",
    tag: "AI Strategy",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fol6",
    title: "Corporate ESG Brochure & Annual Interactive Report Design",
    category: "시각디자인 · 프린트",
    tag: "Print",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "1:1 무료 맞춤 상담",
    description: "현재 비즈니스의 디자인 고민과 비전을 분석하고 알맞은 디자인 플랜 및 구독 모델을 제안해 드립니다."
  },
  {
    step: "02",
    title: "전략적 디자인 방향 수립",
    description: "단순 제작이 아닌, 브랜드 코어에 맞는 비주얼 가이드라인과 분기별 마케팅 비주얼 타임라인을 정립합니다."
  },
  {
    step: "03",
    title: "제한 없는 전용 디자인 제작",
    description: "빅스케일 슬랙 채널 또는 대시보드에 과제를 올리시면 담당 수석 디자이너가 영업일 1-3일 이내 초안을 송출합니다."
  },
  {
    step: "04",
    title: "지속적 모니터링 & 브랜드 관리",
    description: "제작 완료 후 성과 및 피드백을 기반으로 브랜드 가치를 제고하며 브랜드의 모든 채널을 일관되게 고도화합니다."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "김민재",
    company: "스마트파이낸스 비주얼 디렉터",
    rating: 5,
    comment: "매번 계약서 쓰고 견적 내는 시간이 확 줄었습니다. 수준 높은 디자이너를 내놓으라는 요구에 빅스케일 구독 서비스는 완벽 그 자체입니다. 대시보드에 등록만 하면 다다음날 결과물이 나오고 피드백도 빛의 속도입니다.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t2",
    name: "박서연",
    company: "누보 코스메틱 대표",
    rating: 5,
    comment: "신생 스타트업이라 풀타임 디자이너 채용이 망설여졌는데, 빅스케일 덕분에 시각디자인부터 SNS 마케팅 디자인까지 대기업 브랜드팀 부럽지 않게 일관된 이미지로 진행하고 있습니다. 완전 추천해요!",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t3",
    name: "윤태식",
    company: "딜리버리허브 마케팅 팀장",
    rating: 5,
    comment: "매월 60건이 넘는 SNS 카드뉴스와 이벤트 배너를 요청하는데, 퀄리티가 무너지지 않고 정해진 기한에 마감되어 정말 신기합니다. AI 컨설팅을 통해 생성형 리얼 이미지 기여도 역시 훌륭합니다.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t4",
    name: "Sarah Jenkins",
    company: "Global Edtech Marketing VP",
    rating: 5,
    comment: "The speed and high-level typography delivered by BIG SCALE was exactly what our brand needed when scaling up in South Korea. Truly global class subscription service.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
  }
];
