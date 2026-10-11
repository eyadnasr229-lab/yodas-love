export interface LoveProfile {
  girlfriendName: string;
  boyfriendName: string;
  anniversaryDate: string; // YYYY-MM-DD
  nickname: string;
  heroHeadline: string;
  heroSubtitle: string;
  loveLetterBody: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  story: string;
  imageUrl: string;
  tag: string;
}

export interface LoveReason {
  id: string;
  text: string;
  category: 'تفاصيل صغيرة' | 'ضحك ومرح' | 'مغامراتنا' | 'عمق المشاعر' | 'يومياتنا';
}

export interface OpenWhenLetter {
  id: string;
  trigger: string;
  title: string;
  badge: string;
  content: string;
  cheerUpPrompt: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  category: string;
  redeemed: boolean;
  redeemedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
