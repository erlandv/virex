/**
 * Contact Page Configuration
 *
 * @description
 * Contact information, methods, and FAQ data for the contact page.
 */

import type { ContactInfo, ContactMethod, ContactFAQ } from '../lib/types';

/** 聯絡資訊：用於聯絡頁面與法律聲明頁面 */
export const contact: ContactInfo = {
  email: 'billy4select@gmail.com',
  supportEmail: 'billy4select@gmail.com', // 統一使用你的 Email
  salesEmail: 'billy4select@gmail.com',
  address: {
    street: '行銷實戰與 AI 思維研究室', // 這會出現在法律條款的地址欄位
    city: '台北',
    state: '台灣',
    zip: '100',
    country: 'Taiwan',
  },
};

/** 聯絡頁面上顯示的聯絡方式 */
export const contactMethods: ContactMethod[] = [
  {
    icon: 'lucide:mail',
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: 'lucide:message-circle',
    label: 'Line 社群',
    value: '加入行銷討論群',
    href: 'https://line.me/ti/g2/RSL2m-6lcwDLR6RJ-XfMGMZnomMixnbD3jrBUw',
  },
  {
    icon: 'lucide:instagram',
    label: 'Instagram',
    value: '@billy4select',
    href: 'https://www.instagram.com/billy4select',
  },
];

/** 聯絡頁面上顯示的常見問題 (FAQ) */
export const contactFAQs: ContactFAQ[] = [
  {
    question: '請問比利通常多久會回覆？',
    answer: '我會在看到訊息後的 24 小時內盡快回覆。如果是電子郵件或 Line 社群討論，通常回覆速度會最快。',
  },
  {
    question: '有提供企業顧問或行銷諮詢服務嗎？',
    answer:
      '有的。關於 10 年整合行銷實戰經驗的企業內訓或個人品牌諮詢，請直接來信洽詢。',
  },
  {
    question: '如何獲取最新的 AI 時代判斷力與行銷邏輯？',
    answer: '除了訂閱我的電子報，也歡迎加入我的 Line 社群，我們會在裡面進行即時的產業動態討論。',
  },
];