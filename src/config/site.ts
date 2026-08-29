/**
 * Site Configuration
 *
 * @description
 * Core site metadata and branding settings.
 */

import type { SocialLinks, LegalConfig } from '../lib/types';

/** 網站名稱：顯示在標題、頁尾和 SEO 標籤中 */
export const name = '行銷裡的路人甲 | 比利陳';

/** 網站描述：SEO 用，出現在搜尋結果 */
export const description = '比利陳，10 年整合行銷實戰，跑過 PM、品牌、廣告投放的整合性行銷。這裡寫的不是趨勢報告，是真正做過才知道的商業邏輯、AI 時代的判斷力，以及個人品牌的底層思維。';

/** 正式網址 */
export const url = 'https://blog.billy4select.com';

/** 作者名稱 */
export const author = '比利陳 Billy Chen';

/** Logo 路徑：已換成你的個人頭像 */
export const logo = '/avatar.webp';

/** Open Graph 預覽圖路徑 (建議之後也把這張圖換成你的頭像或品牌圖) */
export const ogImage = '/avatar.webp';

/** 社群連結 */
export const social: SocialLinks = {
  youtube: 'https://www.youtube.com/@billyselect4',
  instagram: 'https://www.instagram.com/billy4select',
  x: 'https://www.threads.net/@billy4select', 
  github: '',
  discord: '',
};

/** 法律資訊與更新日期 */
export const legal: LegalConfig = {
  privacyEmail: 'billy4select@gmail.com',
  legalEmail: 'billy4select@gmail.com',
  lastUpdated: '2026-04-09',
};